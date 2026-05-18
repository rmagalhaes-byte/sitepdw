"use client";

import { useState, useEffect } from "react";

interface SiteSection {
  key: string;
  enabled: boolean;
  content: Record<string, any> | null;
  updated_at: string;
}

const SECTION_META: Record<string, { label: string; description: string; fields?: Array<{ key: string; label: string; type?: string }> }> = {
  github: {
    label: "GitHub / Open Source",
    description: "Secção da página Solução com repositório público e destaques técnicos.",
    fields: [
      { key: "repo_url",    label: "URL do repositório",   type: "url"  },
      { key: "repo_name",   label: "Nome (ex: org/repo)",  type: "text" },
      { key: "description", label: "Descrição curta",      type: "textarea" },
    ],
  },
  "contact-form": {
    label: "Formulário de Contacto",
    description: "Activa ou desactiva o formulário de contacto nas páginas relevantes.",
  },
};

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="section-toggle" onClick={(e) => e.stopPropagation()}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="section-toggle-track" />
      <span className="section-toggle-thumb" />
    </label>
  );
}

function SectionItem({ section, onUpdate }: { section: SiteSection; onUpdate: (s: SiteSection) => void }) {
  const meta = SECTION_META[section.key] ?? { label: section.key, description: "" };
  const [enabled, setEnabled] = useState(section.enabled);
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<Record<string, string>>(
    Object.fromEntries(
      (meta.fields ?? []).map((f) => [f.key, (section.content?.[f.key] ?? "") as string])
    )
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function patchSection(patch: { enabled?: boolean; content?: Record<string, any> | null }) {
    setSaving(true);
    try {
      const r = await fetch(`/api/admin/sections/${section.key}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (r.ok) {
        const data = await r.json();
        onUpdate(data.section);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally { setSaving(false); }
  }

  async function handleToggle(val: boolean) {
    setEnabled(val);
    await patchSection({ enabled: val });
  }

  async function handleSaveContent() {
    const content = Object.fromEntries(
      Object.entries(fields).filter(([, v]) => v.trim() !== "")
    );
    await patchSection({ content: Object.keys(content).length > 0 ? content : null });
  }

  const hasFields = (meta.fields ?? []).length > 0;

  return (
    <div className={`section-item${enabled ? " is-enabled" : ""}`}>
      <div
        className="section-item__header"
        onClick={() => hasFields && setOpen(!open)}
        style={{ cursor: hasFields ? "pointer" : "default" }}
      >
        <div className="section-item__info">
          <p className="section-item__label">{meta.label}</p>
          <span className="section-item__key">{section.key}</span>
          {meta.description && (
            <p style={{ margin: "4px 0 0", fontSize: 12.5, color: "var(--color-muted)", lineHeight: 1.4 }}>
              {meta.description}
            </p>
          )}
        </div>
        <Toggle checked={enabled} onChange={handleToggle} />
        {hasFields && (
          <span className={`section-item__expand${open ? " is-open" : ""}`}>›</span>
        )}
      </div>

      {hasFields && open && (
        <div className="section-item__form" style={{ paddingTop: 16 }}>
          {(meta.fields ?? []).map((f) => (
            <div key={f.key} className="section-field">
              <label>{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  rows={3}
                  value={fields[f.key] ?? ""}
                  onChange={(e) => setFields({ ...fields, [f.key]: e.target.value })}
                />
              ) : (
                <input
                  type={f.type ?? "text"}
                  value={fields[f.key] ?? ""}
                  onChange={(e) => setFields({ ...fields, [f.key]: e.target.value })}
                />
              )}
            </div>
          ))}
          <div className="section-item__save">
            <button
              className="admin-btn admin-btn--primary"
              onClick={handleSaveContent}
              disabled={saving}
            >
              {saving ? "A guardar…" : saved ? "✓ Guardado" : "Guardar conteúdo"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function SectionsManager() {
  const [sections, setSections] = useState<SiteSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/sections")
      .then((r) => r.json())
      .then((d) => setSections(d.sections ?? []))
      .finally(() => setLoading(false));
  }, []);

  function handleUpdate(updated: SiteSection) {
    setSections((prev) => prev.map((s) => (s.key === updated.key ? updated : s)));
  }

  return (
    <div className="admin-card">
      <header className="admin-card__head">
        <h2>Secções do site</h2>
        <p style={{ margin: 0, fontSize: 13, color: "var(--color-muted)" }}>
          Activa ou desactiva secções sem necessidade de deploy. As alterações são aplicadas em até 60 segundos.
        </p>
      </header>

      {loading ? (
        <p style={{ padding: 24, color: "var(--color-muted)", fontSize: 14 }}>A carregar…</p>
      ) : sections.length === 0 ? (
        <p style={{ padding: 24, color: "var(--color-muted)", fontSize: 14 }}>Nenhuma secção configurada.</p>
      ) : (
        <div className="sections-list">
          {sections.map((s) => (
            <SectionItem key={s.key} section={s} onUpdate={handleUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}
