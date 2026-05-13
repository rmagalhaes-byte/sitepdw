"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n/config";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useState } from "react";
import { ChangelogModal } from "@/components/ui/ChangelogModal";

interface PdwHeaderProps {
  lang: Locale;
  dict: any;
}

export function PdwHeader({ lang, dict }: PdwHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);
  const pathname = usePathname();

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
          <div className="brand-logo-wrapper">
            <Image src="/pdw_logo.png" alt="PDW Logo" width={32} height={32} className="brand-logo" />
            <span>Portuguese Digital Wallet</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="nav" aria-label="Navegacao principal">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== `/${lang}` && pathname?.startsWith(item.href));
            return (
              <Link 
                key={item.href} 
                href={item.href}
                style={{ 
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                  fontWeight: isActive ? 700 : 500,
                  borderBottom: isActive ? '2px solid var(--color-primary)' : 'none',
                  paddingBottom: isActive ? '4px' : '6px'
                }}
              >
                {item.label}
              </Link>
            );
          })}
          {/* Version Badge - Remove this block to hide versioning */}
          <button onClick={() => setIsChangelogOpen(true)} title="Ver atualizações" style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 8px',
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            color: '#38bdf8',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 600,
            marginLeft: '8px',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.1)';
          }}>
            v1.7.0
          </button>
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ThemeToggle />
          <div className="lang-switcher" style={{ fontSize: '12px', fontWeight: 600 }}>
            {(() => {
              const currentPathWithoutLang = pathname?.replace(`/${lang}`, '') || '';
              const toggleLangUrl = `/${lang === 'pt' ? 'en' : 'pt'}${currentPathWithoutLang}`;
              return (
                <Link href={toggleLangUrl} style={{ color: 'var(--color-muted)' }}>
                  {lang === 'pt' ? 'EN' : 'PT'}
                </Link>
              );
            })()}
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=pt.tecminho.pdw&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
            className="cta"
          >
            {dict.nav.cta}
          </a>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: 'var(--color-text)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== `/${lang}` && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="mobile-nav-link"
                  style={{
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                    fontWeight: isActive ? 700 : 500,
                    borderLeftColor: isActive ? 'var(--color-primary)' : 'transparent',
                    backgroundColor: isActive ? 'rgba(0, 108, 75, 0.04)' : 'transparent'
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            {/* Mobile Version Badge */}
            <button
              onClick={() => {
                setMenuOpen(false);
                setIsChangelogOpen(true);
              }}
              className="mobile-nav-link"
              style={{ color: '#38bdf8', fontWeight: 600, background: 'none', border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer' }}
            >
              Changelog (v1.7.0)
            </button>
          </nav>
        </div>
      )}

      <ChangelogModal 
        isOpen={isChangelogOpen} 
        onClose={() => setIsChangelogOpen(false)} 
        lang={lang} 
      />
    </header>
  );
}
