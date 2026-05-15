/**
 * pdw-site-v2/src/components/legal/LegalDocument.tsx
 *
 * Server Component. Renderiza um documento legal (Privacidade ou
 * Termos) a partir de um objeto estruturado vindo do i18n.
 * Estilos via classes em `globals.css` (.legal-page, .legal-section, etc.).
 *
 * O conteúdo é tratado como dados — para mudar texto NÃO mexer aqui,
 * mexer em `src/i18n/locales/pt.json` → `privacy` / `terms`.
 */

export interface LegalSection {
  id: string;
  title: string;
  body: string[];
}

export interface LegalDoc {
  title: string;
  lastUpdated: string;
  preamble: string;
  sections: LegalSection[];
  contact: string;
}

interface LegalDocumentProps {
  doc: LegalDoc;
}

export function LegalDocument({ doc }: LegalDocumentProps) {
  return (
    <article className="legal-page legal-A">
      <header className="legal-header">
        <span className="page-hero-eyebrow">Documento legal</span>
        <h1 className="legal-title">{doc.title}</h1>
        <div className="legal-meta">
          <span>Portuguese Digital Wallet</span>
          <span aria-hidden="true">·</span>
          <span>
            Última atualização: <strong>{doc.lastUpdated}</strong>
          </span>
        </div>
      </header>

      <p className="legal-preamble">{doc.preamble}</p>

      {doc.sections.map((s) => (
        <section key={s.id} id={s.id} className="legal-section">
          <h2 className="legal-section-title">{s.title}</h2>
          {s.body.map((p, i) => (
            <p key={i} className="legal-p">
              {p}
            </p>
          ))}
        </section>
      ))}

      <footer className="legal-footer">
        <p>{doc.contact}</p>
        <p className="legal-sig">
          TecMinho · Campus de Azurém, Guimarães, Portugal · {new Date().getFullYear()}
        </p>
      </footer>
    </article>
  );
}
