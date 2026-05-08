import Link from "next/link";
import { Locale } from "@/i18n/config";

interface HeroProps {
  lang: Locale;
  dict: any;
}

export function HeroInstitutional({ lang, dict }: HeroProps) {
  return (
    <section className="hero">
      <h1>{dict.hero.title}</h1>
      <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '8px' }}>
        {dict.hero.subtitle}
      </p>
      <p>
        {dict.hero.description}
      </p>
      <div className="btn-row">
        <Link href={`/${lang}/casos-de-uso/diplomas-digitais`} className="cta">
          {dict.hero.ctaDemo}
        </Link>
        <Link href={`/${lang}/contactos`} className="btn-secondary">
          {dict.hero.ctaAccess}
        </Link>
      </div>
    </section>
  );
}
