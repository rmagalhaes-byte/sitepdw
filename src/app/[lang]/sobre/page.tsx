import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";
import type { Metadata } from "next";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isPt = lang === "pt";
  return {
    title: isPt
      ? "Sobre o Projeto | Portuguese Digital Wallet"
      : "About the Project | Portuguese Digital Wallet",
    description: isPt
      ? "Conheça a missão, equipa e parceiros da PDW. Infraestrutura nacional de identidade digital apoiada pela Agenda Blockchain.PT e PRR."
      : "Learn about PDW's mission, team and partners. National digital identity infrastructure supported by the Blockchain.PT Agenda and PRR.",
  };
}

export default async function SobrePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header + What is PDW */}
      <AnimatedSection>
        <section className="section-card">
          <SectionHeading
            title={dict.about.heading.title}
            subtitle={dict.about.heading.subtitle}
          />
          {dict.about.whatIsPdw && (
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ color: 'var(--color-primary)', marginBottom: '10px' }}>{dict.about.whatIsPdw.title}</h3>
              <p style={{ lineHeight: 1.7, color: 'var(--color-muted)' }}>{dict.about.whatIsPdw.text}</p>
            </div>
          )}
        </section>
      </AnimatedSection>

      {/* Strategic Context */}
      <AnimatedSection delay={0.1}>
        <section className="section-card">
          <h3 style={{ color: 'var(--color-primary)', marginBottom: '10px' }}>{dict.about.strategicContext.title}</h3>
          <p style={{ lineHeight: 1.7, color: 'var(--color-muted)' }}>{dict.about.strategicContext.text}</p>
        </section>
      </AnimatedSection>

      {/* Mission & Vision */}
      <AnimatedSection delay={0.15}>
        <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <article className="section-card">
            <h3 style={{ color: 'var(--color-primary)' }}>{dict.about.mission.title}</h3>
            <p style={{ lineHeight: 1.6, color: 'var(--color-muted)' }}>{dict.about.mission.text}</p>
          </article>
          <article className="section-card">
            <h3 style={{ color: 'var(--color-primary)' }}>{dict.about.vision.title}</h3>
            <p style={{ lineHeight: 1.6, color: 'var(--color-muted)' }}>{dict.about.vision.text}</p>
          </article>
        </div>
      </AnimatedSection>

      {/* Standards */}
      <AnimatedSection delay={0.2}>
        <section className="section-card">
          <h3>{dict.about.standards.title}</h3>
          <ul className="simple-list" style={{ marginTop: '16px' }}>
            <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(0,108,75,0.08)' }}>
              <strong style={{ color: 'var(--color-primary)' }}>{dict.about.standards.eidas.split(':')[0]}:</strong>
              {dict.about.standards.eidas.split(':').slice(1).join(':')}
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(0,108,75,0.08)' }}>
              <strong style={{ color: 'var(--color-primary)' }}>{dict.about.standards.ebsi.split(':')[0]}:</strong>
              {dict.about.standards.ebsi.split(':').slice(1).join(':')}
            </li>
            <li style={{ padding: '10px 0' }}>
              <strong style={{ color: 'var(--color-primary)' }}>{dict.about.standards.eudi.split(':')[0]}:</strong>
              {dict.about.standards.eudi.split(':').slice(1).join(':')}
            </li>
          </ul>
        </section>
      </AnimatedSection>

      {/* Team & Governance */}
      <AnimatedSection delay={0.25}>
        <div className="grid-3" style={{ gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
          <section className="section-card">
            <h3>{dict.about.team.title}</h3>
            {dict.about.team.subtitle && (
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', margin: '4px 0 12px' }}>{dict.about.team.subtitle}</p>
            )}
            <div style={{ display: 'grid', gap: '8px', marginTop: '8px' }}>
              {(Array.isArray(dict.about.team.members) ? dict.about.team.members : []).map((member: any, i: number) => (
                <div key={i} style={{
                  padding: '10px 12px',
                  background: 'rgba(0, 108, 75, 0.03)',
                  borderRadius: '8px',
                  borderLeft: '3px solid var(--color-primary)',
                }}>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>
                    {typeof member === 'string' ? member : member.name}
                  </div>
                  {typeof member !== 'string' && member.role && (
                    <div style={{ fontSize: '12px', color: 'var(--color-muted)', marginTop: '2px' }}>{member.role}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
          <section className="section-card">
            <h3>{dict.about.governance.title}</h3>
            <p style={{ marginTop: '16px', lineHeight: 1.7, color: 'var(--color-muted)' }}>{dict.about.governance.text}</p>
          </section>
        </div>
      </AnimatedSection>

      {/* Strategic Partners */}
      {dict.about.partners && (
        <AnimatedSection delay={0.3}>
          <section className="section-card">
            <h3>{dict.about.partners.title}</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '12px',
              marginTop: '16px',
            }}>
              {dict.about.partners.list.map((partner: any, i: number) => (
                <div key={i} className="partner-ecosystem-card" style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  background: i === 0 ? 'linear-gradient(135deg, rgba(0, 108, 75, 0.06) 0%, rgba(26, 59, 93, 0.04) 100%)' : undefined,
                  border: '1px solid rgba(0, 108, 75, 0.08)',
                  transition: 'all 0.3s ease',
                }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-primary)' }}>{partner.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-muted)', marginTop: '3px', fontWeight: 600 }}>{partner.role}</div>
                  {partner.description && (
                    <p style={{ fontSize: '12px', color: 'var(--color-muted)', marginTop: '6px', lineHeight: 1.5, opacity: 0.8 }}>{partner.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>
      )}
    </div>
  );
}
