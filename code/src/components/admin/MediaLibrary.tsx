// pdw-site-v2/src/components/admin/MediaLibrary.tsx
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
}

interface Props {
  kind: 'video' | 'logo' | 'image';
  slotOptions?: string[];
  title: string;
}

export function MediaLibrary({ kind, slotOptions = [], title }: Props) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    const r = await fetch(`/api/admin/media?kind=${kind}`);
    if (r.ok) {
      const data = await r.json();
      setItems(data.items);
    }
  }
  useEffect(() => { load(); }, [kind]); // eslint-disable-line

  async function upload(file: File, slot?: string) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.set("kind", kind);
      fd.set("file", file);
      if (slot) fd.set("slot", slot);
      const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (r.ok) load();
    } finally { setUploading(false); }
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
        <button className="admin-btn admin-btn--primary" onClick={() => fileRef.current?.click()} disabled={uploading}>
          {uploading ? "A carregar…" : "Carregar"}
        </button>
        <input ref={fileRef} type="file" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
      </header>

      <div
        className="admin-dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        Arrasta aqui um ficheiro · {kind === "video" ? "MP4/MOV/WebM, máx 200 MB" : "PNG/SVG/JPG"}
      </div>

      <div className="admin-media-grid">
        {items.map((m) => (
          <div key={m.id} className="admin-media-tile">
            {kind === "video" ? (
              <video src={m.public_path} muted preload="metadata" style={{ width: "100%", borderRadius: 8 }} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.public_path} alt="" style={{ width: "100%", borderRadius: 8, background: "#f7fafc" }} />
            )}
            <code>{m.filename}</code>
            {m.slot && <small>Slot: {m.slot}</small>}
            <small>{m.uses > 0 && <span className="admin-pill admin-pill--accent">EM USO</span>}</small>
          </div>
        ))}
        {items.length === 0 && <p className="admin-empty">Nenhum ficheiro carregado.</p>}
      </div>
    </div>
  );
}
