/**
 * pdw-site-v2/src/app/[lang]/admin/page.tsx
 *
 * Dashboard do /admin. Mostra:
 *   - versão atual (puxar de package.json em runtime, ou env var)
 *   - changelog completo
 *   - links para áreas administrativas futuras (leads, métricas, etc.)
 *
 * Server Component. O changelog é estático aqui, mas pode passar a
 * vir de um JSON dedicado em `src/data/changelog.json` quando crescer.
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administração | PDW",
  robots: { index: false, follow: false }, // não indexar
};

interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

const CHANGELOG: ChangelogEntry[] = [
  {
    version: "v1.7.3",
    date: "15/05/2026",
    changes: [
      "Refactor da página Sobre, Solução, Privacidade e Termos",
      "Widget de acessibilidade consolidada (tema + contraste + tamanho de texto)",
      "Badge de versão movido do header público para /admin",
      "Voz pt-PT formal aplicada em todo o conteúdo",
    ],
  },
  // Adicionar entradas anteriores quando se confirmar o histórico.
];

const CURRENT_VERSION = CHANGELOG[0]?.version ?? "v1.7.3";

export default function AdminDashboard() {
  return (
    <>
      <header className="page-hero">
        <span className="page-hero-eyebrow">Painel interno</span>
        <h1 className="page-hero-title">Administração · PDW</h1>
        <p className="page-hero-lead">
          Visão única do estado de produção do site institucional. Esta área é restrita à
          equipa da TecMinho e parceiros do consórcio.
        </p>
      </header>

      <section className="admin-grid">
        <article className="section-card">
          <span className="page-hero-eyebrow">Versão atual</span>
          <div className="admin-version">{CURRENT_VERSION}</div>
          <p>Em produção. Para registar uma nova versão, atualizar este ficheiro e fazer deploy.</p>
        </article>

        <article className="section-card">
          <span className="page-hero-eyebrow">Atalhos</span>
          <ul className="link-list">
            <li>
              <a href="https://github.com/rshermans/pdw-site-v2" target="_blank" rel="noopener noreferrer">
                Repositório no GitHub →
              </a>
            </li>
            <li>
              <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">
                Deploys (Vercel) →
              </a>
            </li>
            <li>
              <a href="https://resend.com/" target="_blank" rel="noopener noreferrer">
                Resend · entregas de email →
              </a>
            </li>
          </ul>
        </article>
      </section>

      <section className="section-card">
        <header className="section-header">
          <span className="page-hero-eyebrow">Changelog</span>
          <h3 className="section-title">Histórico de versões</h3>
        </header>
        <ol className="changelog">
          {CHANGELOG.map((entry) => (
            <li key={entry.version} className="changelog-entry">
              <div className="changelog-meta">
                <div className="changelog-version">{entry.version}</div>
                <div className="changelog-date">{entry.date}</div>
              </div>
              <ul>
                {entry.changes.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
