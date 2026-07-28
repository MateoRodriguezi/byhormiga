(function () {
  const STYLE_ID = "rich-text-editor-preview-style";

  function wrapSelection(textarea, before, after) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.slice(start, end);
    const replacement = before + selected + after;
    textarea.setRangeText(replacement, start, end, "end");
    textarea.focus();
  }

  function insertAtCursor(textarea, content) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    textarea.setRangeText(content, start, end, "end");
    textarea.focus();
  }

  function buildButton(label, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.className = "rich-text-editor-button";
    button.addEventListener("click", onClick);
    return button;
  }

  function buildToolbar(textarea, uploadInput) {
    const toolbar = document.createElement("div");
    toolbar.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;margin:0 0 8px 0;";

    toolbar.appendChild(buildButton("B", function () { wrapSelection(textarea, "<strong>", "</strong>"); }));
    toolbar.appendChild(buildButton("I", function () { wrapSelection(textarea, "<em>", "</em>"); }));
    toolbar.appendChild(buildButton("H1", function () { wrapSelection(textarea, "<h1>", "</h1>"); }));
    toolbar.appendChild(buildButton("H2", function () { wrapSelection(textarea, "<h2>", "</h2>"); }));
    toolbar.appendChild(buildButton("H3", function () { wrapSelection(textarea, "<h3>", "</h3>"); }));
    toolbar.appendChild(buildButton("P", function () { wrapSelection(textarea, "<p>", "</p>"); }));
    toolbar.appendChild(buildButton("UL", function () { insertAtCursor(textarea, "<ul>\n  <li>Item</li>\n</ul>\n"); }));
    toolbar.appendChild(buildButton("Link", function () {
      const url = window.prompt("URL del link:", "https://");
      if (!url) return;
      const text = window.prompt("Texto visible:", "Ver mas") || "Ver mas";
      insertAtCursor(textarea, '<a href="' + url + '" target="_blank" rel="noopener">' + text + "</a>");
    }));
    toolbar.appendChild(buildButton("Imagen", function () { uploadInput.click(); }));

    return toolbar;
  }

  function buildPreviewBox() {
    const box = document.createElement("div");
    box.className = "rich-text-editor-preview";

    const title = document.createElement("div");
    title.textContent = "Preview en vivo";
    title.className = "rich-text-editor-preview-title";

    const body = document.createElement("div");
    body.className = "rich-text-editor-preview-body";

    box.appendChild(title);
    box.appendChild(body);
    return { box: box, body: body };
  }

  function ensureStyles(textarea) {
    if (document.getElementById(STYLE_ID)) return;

    const textareaStyles = window.getComputedStyle(textarea);
    const bg = textareaStyles.backgroundColor || "transparent";
    const fg = textareaStyles.color || "inherit";
    const border = textareaStyles.borderColor || "rgba(148, 163, 184, 0.4)";
    const radius = textareaStyles.borderRadius || "8px";
    const muted = "color-mix(in srgb, " + fg + " 70%, transparent)";

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = ""
      + ".rich-text-editor-toolbar{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 10px 0;}"
      + ".rich-text-editor-button{padding:6px 10px;border:1px solid " + border + ";border-radius:6px;background:" + bg + ";color:" + fg + ";cursor:pointer;font-size:12px;line-height:1;}"
      + ".rich-text-editor-button:hover{filter:brightness(1.08);}"
      + ".rich-text-editor-preview{margin-top:12px;border:1px solid " + border + ";border-radius:" + radius + ";background:" + bg + ";overflow:hidden;}"
      + ".rich-text-editor-preview-title{padding:10px 12px;border-bottom:1px solid " + border + ";font-weight:600;font-size:12px;color:" + muted + ";}"
      + ".rich-text-editor-preview-body{padding:14px;min-height:180px;max-height:420px;overflow:auto;color:" + fg + ";}"
      + ".rich-text-editor-preview-body p{margin:0 0 0.9em 0;line-height:1.65;}"
      + ".rich-text-editor-preview-body h1,.rich-text-editor-preview-body h2,.rich-text-editor-preview-body h3{margin:0.9em 0 0.55em 0;line-height:1.25;font-weight:700;}"
      + ".rich-text-editor-preview-body h1{font-size:2rem;}"
      + ".rich-text-editor-preview-body h2{font-size:1.6rem;}"
      + ".rich-text-editor-preview-body h3{font-size:1.3rem;}"
      + ".rich-text-editor-preview-body ul,.rich-text-editor-preview-body ol{margin:0 0 1em 1.4em;padding:0;}"
      + ".rich-text-editor-preview-body li{margin:0.3em 0;}"
      + ".rich-text-editor-preview-body a{text-decoration:underline;word-break:break-word;}"
      + ".rich-text-editor-preview-body img{display:block;max-width:100%;height:auto;margin:0.9em 0;border-radius:6px;}"
      + ".rich-text-editor-empty{opacity:.75;}";
    document.head.appendChild(style);
  }

  function getCsrfToken() {
    const name = "csrftoken=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = cookies[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  }

  function setupEditor(textarea) {
    const uploadUrl = textarea.dataset.uploadUrl;
    if (!uploadUrl) return;

    const uploadInput = document.createElement("input");
    uploadInput.type = "file";
    uploadInput.accept = "image/*";
    uploadInput.style.display = "none";

    const toolbar = buildToolbar(textarea, uploadInput);
    toolbar.className = "rich-text-editor-toolbar";
    ensureStyles(textarea);
    textarea.parentNode.insertBefore(toolbar, textarea);
    textarea.parentNode.appendChild(uploadInput);

    const preview = buildPreviewBox();
    textarea.parentNode.appendChild(preview.box);

    function syncPreview() {
      if (!textarea.value.trim()) {
        preview.body.innerHTML = "<p class='rich-text-editor-empty'>Sin contenido</p>";
        return;
      }
      preview.body.innerHTML = textarea.value;
    }

    uploadInput.addEventListener("change", function () {
      if (!uploadInput.files || !uploadInput.files[0]) return;

      const formData = new FormData();
      formData.append("image", uploadInput.files[0]);

      fetch(uploadUrl, {
        method: "POST",
        headers: {
          "X-CSRFToken": getCsrfToken()
        },
        body: formData
      })
        .then(function (response) { return response.json(); })
        .then(function (data) {
          if (!data.url) return;
          insertAtCursor(textarea, '<img src="' + data.url + '" alt="" />');
          syncPreview();
          uploadInput.value = "";
        });
    });

    textarea.addEventListener("input", syncPreview);
    syncPreview();
  }

  function setupRichTextEditors() {
    const textareas = document.querySelectorAll("textarea[data-rich-text-editor]");
    for (let i = 0; i < textareas.length; i += 1) {
      setupEditor(textareas[i]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupRichTextEditors);
  } else {
    setupRichTextEditors();
  }
})();
