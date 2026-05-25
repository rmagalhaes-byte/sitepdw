"use client";

import { useState, useEffect, useRef } from "react";

interface MediaItem {
  id: number;
  kind: 'video' | 'logo' | 'image';
  filename: string;
  public_path: string;
  size_bytes: number | null;
  slot: string | null;
  uses: number;
  created_at: string;
  mime: string | null;
}

interface Props {
  kind: 'video' | 'logo' | 'image';
  slotOptions?: string[];
  title: string;
}

const SLOT_LABELS: Record<string, string> = {
  "homepage-demo": "Vídeo Demo (homepage)",
  "header": "Header",
  "footer-partners": "Parceiros (rodapé)",
  "trustbar": "Trust Bar",
  "funders": "Financiadores",
};

function youtubeThumb(filename: string) {
  const id = filename.replace('youtube-', '');
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function isExternalVideo(mime: string | null) {
  return mime === 'video/youtube' || mime === 'video/vimeo';
}

function providerLabel(mime: string | null) {
  if (mime === 'video/youtube') return 'YouTube';
  if (mime === 'video/vimeo') return 'Vimeo';
  return null;
}

export function MediaLibrary({ kind, slotOptions = [], title }: Props) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string>(slotOptions[0] ?? "");
  const [urlInput, setUrlInput] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    const r = await fetch(`/api/admin/media?kind=${kind}`);
    if (r.ok) {
      const data = await r.json();
      setItems(data.items);
    }
  }

  useEffect(() => { load(); }, [kind]); // eslint-disable-line

  async function upload(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.set("kind", kind);
      fd.set("file", file);
      if (selectedSlot) fd.set("slot", selectedSlot);
      const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (r.ok) load();
    } finally { setUploading(false); }
  }

  async function addVideoLink() {
    if (!urlInput.trim()) return;
    setUrlError(null);
    setUploading(true);
    try {
      const r = await fetch("/api/admin/media/link", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: urlInput.trim(), slot: selectedSlot || null }),
      });
      if (r.ok) {
        setUrlInput("");
        load();
      } else {
        const data = await r.json().catch(() => ({}));
        setUrlError(data.hint ?? "Link inválido. Cole um URL do YouTube ou Vimeo.");
      }
    } finally { setUploading(false); }
  }

  async function setSlot(id: number, slot: string | null) {
    const r = await fetch(`/api/admin/media/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slot }),
    });
    if (r.ok) load();
  }

  async function remove(id: number) {
    if (!confirm("Eliminar este item?")) return;
    const r = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    if (r.ok) setItems(items.filter(m => m.id !== id));
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  }

  return (
    <div className="admin-card">
      <header className="admin-card__head">
        <h2>{title}</h2>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {slotOptions.length > 1 && (
            <select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              style={{ fontSize: 13, padding: "4px 8px", borderRadius: 6, border: "1px solid var(--color-border)" }}
            >
              <option value="">Sem slot</option>
              {slotOptions.map(s => (
                <option key={s} value={s}>{SLOT_LABELS[s] ?? s}</option>
              ))}
            </select>
          )}
          {kind !== 'video' && (
            <>
              <button className="admin-btn admin-btn--primary" onClick={() => fileRef.current?.click()} disabled={uploading}>
                {uploading ? "A carregar…" : "Carregar"}
              </button>
              <input ref={fileRef} type="file" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
            </>
          )}
        </div>
      </header>

      {kind === 'video' ? (
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)" }}>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--color-muted)" }}>
            Cole o link do YouTube ou Vimeo para adicionar um vídeo.
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => { setUrlInput(e.target.value); setUrlError(null); }}
              onKeyDown={(e) => e.key === 'Enter' && addVideoLink()}
              placeholder="https://www.youtube.com/watch?v=..."
              style={{
                flex: 1, fontSize: 14, padding: "9px 12px",
                borderRadius: 8, border: "1px solid var(--color-border)",
                background: "var(--color-bg)", color: "var(--color-text)",
                fontFamily: "inherit",
              }}
            />
            <button
              className="admin-btn admin-btn--primary"
              onClick={addVideoLink}
              disabled={uploading || !urlInput.trim()}
            >
              {uploading ? "A adicionar…" : "Adicionar"}
            </button>
          </div>
          {urlError && (
            <p style={{ margin: "6px 0 0", fontSize: 12, color: "#dc2626" }}>{urlError}</p>
          )}
        </div>
      ) : (
        <div
          className="admin-dropzone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          Arrasta aqui um ficheiro · {kind === "image" ? "PNG/SVG/JPG/WebP" : "PNG/SVG/JPG"}
        </div>
      )}

      <div className="admin-media-grid">
        {items.map((m) => {
          const isDemo = slotOptions.includes(m.slot ?? "");
          const slotLabel = m.slot ? (SLOT_LABELS[m.slot] ?? m.slot) : null;
          const external = isExternalVideo(m.mime ?? null);
          const provider = providerLabel(m.mime ?? null);

          return (
            <div key={m.id} className="admin-media-tile" style={{ position: "relative" }}>
              {external ? (
                <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", background: "#000", aspectRatio: "16/9" }}>
                  {m.mime === 'video/youtube' ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={youtubeThumb(m.filename)}
                      alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a1a2e", minHeight: 90 }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><path d="M14.752 11.168l-5.197-2.999A1 1 0 0 0 8 9.056v5.888a1 1 0 0 0 1.555.832l5.197-2.999a1 1 0 0 0 0-1.609z"/><circle cx="12" cy="12" r="10"/></svg>
                    </div>
                  )}
                  {provider && (
                    <span style={{
                      position: "absolute", bottom: 6, right: 6,
                      background: "rgba(0,0,0,0.7)", color: "#fff",
                      fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 8,
                    }}>{provider}</span>
                  )}
                </div>
              ) : kind === "video" ? (
                <video src={m.public_path} muted preload="metadata" style={{ width: "100%", borderRadius: 8 }} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.public_path} alt="" style={{ width: "100%", borderRadius: 8, background: "#f7fafc" }} />
              )}

              {slotLabel && (
                <span style={{
                  position: "absolute", top: 6, left: 6,
                  background: "var(--color-primary)", color: "#fff",
                  fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 12,
                }}>
                  {slotLabel}
                </span>
              )}

              <code style={{ fontSize: 11, wordBreak: "break-all" }}>{m.filename}</code>

              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
                {slotOptions.length > 0 && !isDemo && (
                  <button
                    className="admin-btn"
                    style={{ fontSize: 11, padding: "3px 8px" }}
                    onClick={() => setSlot(m.id, slotOptions[0])}
                  >
                    ★ {SLOT_LABELS[slotOptions[0]] ?? slotOptions[0]}
                  </button>
                )}
                {isDemo && (
                  <button
                    className="admin-btn"
                    style={{ fontSize: 11, padding: "3px 8px", opacity: 0.6 }}
                    onClick={() => setSlot(m.id, null)}
                  >
                    Remover slot
                  </button>
                )}
                <button
                  className="admin-btn"
                  style={{ fontSize: 11, padding: "3px 8px", color: "#dc2626", marginLeft: "auto" }}
                  onClick={() => remove(m.id)}
                  aria-label="Eliminar"
                >
                  🗑 Eliminar
                </button>
              </div>
            </div>
          );
        })}
        {items.length === 0 && (
          <p className="admin-empty">
            {kind === 'video' ? "Nenhum vídeo adicionado. Cole um link YouTube ou Vimeo acima." : "Nenhum ficheiro carregado."}
          </p>
        )}
      </div>
    </div>
  );
}
