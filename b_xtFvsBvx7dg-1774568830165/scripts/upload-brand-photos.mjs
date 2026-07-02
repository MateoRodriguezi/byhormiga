#!/usr/bin/env node
// Sube en bloque las fotos/videos locales de cada marca a Cloudinary y genera un manifest
// con las URLs resultantes, para pegar a mano en lib/brands.ts.
//
// Uso:
//   node scripts/upload-brand-photos.mjs ~/Desktop/byhormiga-fotos
//
// Requiere las credenciales de Cloudinary en el entorno (mismas que backend/.env o ../.env):
//   CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
//
// Estructura esperada:
//   byhormiga-fotos/
//     wonder/    foto1.jpg foto2.mp4 ...
//     mood/      ...
//     ...
//
// Cada carpeta se sube a Cloudinary bajo el folder "byhormiga/brands/<slug>/".
// El resultado se escribe en scripts/brand-photos-manifest.json:
//   { "wonder": [{ "url": "...", "type": "image", "filename": "foto1.jpg" }, ...], ... }

import { createHash } from 'node:crypto'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function loadEnvFile(filePath) {
  return readFile(filePath, 'utf-8')
    .then((content) => {
      for (const line of content.split('\n')) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue
        const eq = trimmed.indexOf('=')
        if (eq === -1) continue
        const key = trimmed.slice(0, eq).trim()
        const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
        if (!(key in process.env)) process.env[key] = value
      }
    })
    .catch(() => {})
}

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])
const VIDEO_EXT = new Set(['.mp4', '.mov', '.m4v'])

function sign(params, apiSecret) {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&')
  return createHash('sha1').update(toSign + apiSecret).digest('hex')
}

async function uploadFile(filePath, folder, cloudName, apiKey, apiSecret) {
  const ext = path.extname(filePath).toLowerCase()
  const resourceType = VIDEO_EXT.has(ext) ? 'video' : IMAGE_EXT.has(ext) ? 'image' : null
  if (!resourceType) return null

  const timestamp = Math.floor(Date.now() / 1000)
  const paramsToSign = { folder, timestamp }
  const signature = sign(paramsToSign, apiSecret)

  const buffer = await readFile(filePath)
  const form = new FormData()
  form.append('file', new Blob([buffer]), path.basename(filePath))
  form.append('api_key', apiKey)
  form.append('timestamp', String(timestamp))
  form.append('folder', folder)
  form.append('signature', signature)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
    method: 'POST',
    body: form,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Upload failed for ${filePath}: ${res.status} ${text}`)
  }

  const data = await res.json()
  return { url: data.secure_url, type: resourceType, filename: path.basename(filePath) }
}

async function main() {
  const root = process.argv[2]
  if (!root) {
    console.error('Uso: node scripts/upload-brand-photos.mjs <carpeta-con-fotos-por-marca>')
    process.exit(1)
  }

  await loadEnvFile(path.join(__dirname, '..', '..', '.env'))
  await loadEnvFile(path.join(__dirname, '..', '.env.local'))

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('Faltan credenciales de Cloudinary (CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET) en el entorno.')
    process.exit(1)
  }

  const rootPath = root.replace(/^~/, process.env.HOME ?? '~')
  const brandDirs = await readdir(rootPath, { withFileTypes: true })
  const manifest = {}

  for (const dirent of brandDirs) {
    if (!dirent.isDirectory()) continue
    const slug = dirent.name
    const brandPath = path.join(rootPath, slug)
    const files = (await readdir(brandPath, { withFileTypes: true })).filter((f) => f.isFile())

    if (files.length === 0) continue

    console.log(`\n${slug}: subiendo ${files.length} archivo(s)...`)
    manifest[slug] = []

    for (const file of files) {
      const filePath = path.join(brandPath, file.name)
      try {
        const result = await uploadFile(filePath, `byhormiga/brands/${slug}`, cloudName, apiKey, apiSecret)
        if (result) {
          manifest[slug].push(result)
          console.log(`  ✓ ${file.name} -> ${result.url}`)
        } else {
          console.log(`  - ${file.name} (extensión no soportada, omitido)`)
        }
      } catch (error) {
        console.error(`  ✗ ${file.name}: ${error.message}`)
      }
    }
  }

  const manifestPath = path.join(__dirname, 'brand-photos-manifest.json')
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2))
  console.log(`\nManifest escrito en ${manifestPath}`)
}

main()
