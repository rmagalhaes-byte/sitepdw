import Link from "next/link";
import { Locale } from "@/i18n/config";

interface PdwHeaderProps {
  lang: Locale;
  dict: any;
}

export function PdwHeader({ lang, dict }: PdwHeaderProps) {
  const navItems = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/sobre`, label: dict.nav.about },
    { href: `/${lang}/solucao`, label: dict.nav.solution },
    { href: `/${lang}/casos-de-uso`, label: dict.nav.useCases },
    { href: `/${lang}/contactos`, label: dict.nav.contacts }
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href={`/${lang}`}>
          Portuguese Digital Wallet
        </Link>
        <nav className="nav" aria-label="Navegacao principal">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="lang-switcher" style={{ fontSize: '12px', fontWeight: 600 }}>
            <Link href={lang === 'pt' ? '/en' : '/pt'} style={{ color: 'var(--color-muted)' }}>
              {lang === 'pt' ? 'EN' : 'PT'}
            </Link>
          </div>
          <Link href={`/${lang}/contactos`} className="cta">
            {dict.nav.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
