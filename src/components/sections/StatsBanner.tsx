/**
 * pdw-site-v2/src/components/sections/StatsBanner.tsx
 *
 * NOVO · Server Component.
 * Banda clara full-bleed entre <ValuePillars /> e <DiplomaCaseSection />.
 * Quatro números do consórcio Blockchain.PT (validados em
 * .vide/01_BUSINESS_RULES.md + docs/Bussines.md).
 *
 * Styles: ver globals.append.pr3.css → .statsbanner-*
 */
import type { Locale } from "@/i18n/config";

interface StatItem {
  num: string;
  suffix?: string;
  label: string;
}

interface StatsBannerProps {
  dict: any;
  lang: Locale;
}

export function StatsBanner({ dict }: StatsBannerProps) {
  const t = dict?.home?.statsBanner;
  if (!t || !Array.isArray(t.stats)) return null;

  return (
    <section className="statsbanner-full" aria-labelledby="statsbanner-title">
      <header className="statsbanner-head">
        <span className="statsbanner-eyebrow">{t.eyebrow}</span>
        <h2 id="statsbanner-title" className="statsbanner-title">
          {t.title}
        </h2>
      </header>
      <dl className="statsbanner-grid">
        {(t.stats as StatItem[]).map((s, i) => (
          <div key={i} className="statsbanner-stat">
            <dt className="statsbanner-num">
              <span>{s.num}</span>
              {s.suffix ? <span className="statsbanner-num-sfx">{s.suffix}</span> : null}
            </dt>
            <dd className="statsbanner-lbl">{s.label}</dd>
          </div>
        ))}
      </dl>
      {t.footer ? <p className="statsbanner-foot">{t.footer}</p> : null}
    </section>
  );
}
