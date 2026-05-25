/**
 * pdw-site-v2/src/components/sections/PullQuote.tsx
 *
 * NOVO · Server Component.
 * Banda escura full-bleed entre <TrustBar /> e <ValuePillars />.
 * Cita a projeção do Fórum Económico Mundial (10% do PIB global em
 * blockchain até 2027) e enquadra a PDW como vantagem soberana.
 *
 * Styles: ver globals.append.pr3.css → .pullquote-*
 */
import type { Locale } from "@/i18n/config";

interface PullQuoteProps {
  dict: any;
  lang: Locale;
}

export function PullQuote({ dict }: PullQuoteProps) {
  const t = dict?.home?.pullquote;
  if (!t) return null;

  return (
    <section className="pullquote-full" aria-label={`Citação: ${t.source}`}>
      <div className="pullquote-inner">
        <div className="pullquote-figure">
          <div className="pullquote-figure-num">{t.figureNumber}</div>
          <div className="pullquote-figure-lbl">{t.figureLabel}</div>
          {t.sourceCitation ? (
            <div className="pullquote-figure-cite">{t.sourceCitation}</div>
          ) : null}
        </div>
        <div className="pullquote-body">
          <svg
            className="pullquote-mark"
            width="56"
            height="42"
            viewBox="0 0 80 60"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 60V36C0 16 12 4 32 0L36 12C24 16 18 22 18 36H32V60H0ZM44 60V36C44 16 56 4 76 0L80 12C68 16 62 22 62 36H76V60H44Z"
              fill="currentColor"
              opacity="0.85"
            />
          </svg>
          <blockquote
            // Permite o <strong> embutido na string (vantagem soberana).
            // O conteúdo vem do i18n controlado pela equipa — não é input do utilizador.
            dangerouslySetInnerHTML={{ __html: t.quote }}
          />
          <footer>
            <div className="pullquote-source">{t.source}</div>
            <div className="pullquote-source-role">{t.sourceRole}</div>
          </footer>
        </div>
      </div>
    </section>
  );
}
