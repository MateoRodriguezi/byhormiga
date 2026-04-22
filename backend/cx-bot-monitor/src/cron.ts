import Anthropic from "@anthropic-ai/sdk";
import * as cron from "node-cron";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

const CHANNEL_ID      = "C07H9AY29B9";
const MY_SLACK_ID     = "U01E3Q1D9L5";
const ALERT_THRESHOLD = parseInt(process.env.ALERT_THRESHOLD_MINS || "30") * 60;
const CRON_SCHEDULE   = process.env.CRON_SCHEDULE || "*/5 * * * *";
const STATE_FILE      = "./alerted.json";
const LOOKBACK_HOURS  = 24;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function loadAlerted(): Set<string> {
  try {
    const data = JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
    return new Set(data);
  } catch {
    return new Set();
  }
}

function saveAlerted(set: Set<string>) {
  fs.writeFileSync(STATE_FILE, JSON.stringify([...set]));
}

function parseTicket(text: string): string | null {
  const m = text.match(/(?:tk|tkk|ticket)[:\s]*([A-Z]+-\d+)/i)
           || text.match(/browse\/([A-Z]+-\d+)/i);
  return m ? m[1] : null;
}

function parseEmail(text: string): string | null {
  const m = text.match(/[\w.+-]+@[\w-]+\.\w+/);
  return m ? m[0] : null;
}

function parseHash(text: string): string | null {
  const m = text.match(/0x[a-fA-F0-9]{40,}/);
  return m ? m[0].slice(0, 20) + "…" : null;
}

async function fetchChannelMessages() {
  const oldestTs = String(Math.floor(Date.now() / 1000) - LOOKBACK_HOURS * 3600);
  const response = await (anthropic.messages.create as any)({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    mcp_servers: [{ type: "url", url: "https://mcp.slack.com/mcp", name: "slack" }],
    system: `Eres un extractor de datos. Devuelve SOLO un JSON array con este schema exacto, sin texto extra:
[{ "ts": "...", "user": "...", "text": "...", "reply_count": 0 }]`,
    messages: [{
      role: "user",
      content: `Usa slack_read_channel con channel_id="${CHANNEL_ID}", oldest="${oldestTs}", limit=50.
Devuelve el array JSON con: ts, user, text, reply_count. Solo mensajes raíz. Sin explicaciones.`
    }]
  });

  const raw = response.content
    .filter((b: any) => b.type === "text")
    .map((b: any) => b.text)
    .join("");

  const match = raw.match(/\[[\s\S]*\]/);
  if (!match) { console.error("No se pudo parsear:", raw.slice(0, 200)); return []; }
  return JSON.parse(match[0]);
}

async function sendAlert(c: any) {
  const waitMin = Math.floor(c.waitingSecs / 60);
  const waitStr = waitMin >= 60 ? `${Math.floor(waitMin/60)}h ${waitMin%60}m` : `${waitMin} min`;
  const ticketLine = c.ticket ? `\n• *Ticket:* \`${c.ticket}\`` : "";
  const emailLine  = c.email  ? `\n• *Email:* ${c.email}` : "";
  const hashLine   = c.hash   ? `\n• *Hash:* \`${c.hash}\`` : "";

  const msg = `⚠️ *Caso sin respuesta — <@${MY_SLACK_ID}>*\n\nEste mensaje lleva *${waitStr}* sin atención.\n• *De:* ${c.user}${ticketLine}${emailLine}${hashLine}\n\n_Revisalo cuando puedas_ 🙏`;

  await (anthropic.messages.create as any)({
    model: "claude-sonnet-4-20250514",
    max_tokens: 512,
    mcp_servers: [{ type: "url", url: "https://mcp.slack.com/mcp", name: "slack" }],
    system: "Ejecuta la herramienta de Slack exactamente como se pide, sin comentarios.",
    messages: [{
      role: "user",
      content: `Usa slack_send_message con channel_id="${CHANNEL_ID}", thread_ts="${c.ts}", message=${JSON.stringify(msg)}. No modifiques el mensaje.`
    }]
  });
  console.log(`  ✅ Alerta enviada → ${c.ticket || c.email || c.ts}`);
}

async function runCheck() {
  const now = Math.floor(Date.now() / 1000);
  console.log(`\n[${new Date().toLocaleTimeString("es-AR")}] Chequeando #b2b-cx…`);
  const alerted = loadAlerted();

  let messages: any[];
  try { messages = await fetchChannelMessages(); }
  catch (e) { console.error("  ❌ Error leyendo canal:", e); return; }

  console.log(`  📨 ${messages.length} mensajes en las últimas ${LOOKBACK_HOURS}h`);

  const pending = messages.filter((m: any) => {
    const age = now - parseFloat(m.ts);
    return (m.reply_count ?? 0) === 0 && age >= ALERT_THRESHOLD && !alerted.has(m.ts);
  }).map((m: any) => ({
    ts: m.ts, user: m.user, text: m.text,
    waitingSecs: now - parseFloat(m.ts),
    ticket: parseTicket(m.text),
    email:  parseEmail(m.text),
    hash:   parseHash(m.text),
  }));

  if (pending.length === 0) {
    console.log("  ✓ Sin casos nuevos para alertar.");
    return;
  }

  console.log(`  🚨 ${pending.length} caso(s) para alertar:`);
  for (const c of pending) {
    console.log(`     • ${c.ticket || c.email || c.ts} — ${Math.floor(c.waitingSecs/60)} min`);
    try {
      await sendAlert(c);
      alerted.add(c.ts);
      await new Promise(r => setTimeout(r, 1500));
    } catch (e) { console.error(`     ❌ Error:`, e); }
  }
  saveAlerted(alerted);
}

console.log(`🤖 CX Bot Monitor arrancando…`);
console.log(`   Canal:    #b2b-cx (${CHANNEL_ID})`);
console.log(`   Alerta a: @Mate (${MY_SLACK_ID})`);
console.log(`   Umbral:   ${ALERT_THRESHOLD/60} min sin respuesta`);
console.log(`   Schedule: ${CRON_SCHEDULE}\n`);

runCheck();
cron.schedule(CRON_SCHEDULE, runCheck);
