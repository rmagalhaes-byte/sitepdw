import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";

export default async function SolucaoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <section className="section-card">
        <SectionHeading
          title={dict.solution.heading.title}
          subtitle={dict.solution.heading.subtitle}
        />
        <div className="grid-3" style={{ marginTop: '24px' }}>
          <article>
            <h4 style={{ color: 'var(--color-primary)' }}>{dict.solution.whatIsWallet.title}</h4>
            <p style={{ fontSize: '14px' }}>{dict.solution.whatIsWallet.text}</p>
          </article>
          <article>
            <h4 style={{ color: 'var(--color-primary)' }}>{dict.solution.whatAreVCs.title}</h4>
            <p style={{ fontSize: '14px' }}>{dict.solution.whatAreVCs.text}</p>
          </article>
        </div>
      </section>

      <section className="section-card">
        <h3>{dict.solution.flow.title}</h3>
        <div className="simple-list" style={{ marginTop: '16px', display: 'grid', gap: '12px' }}>
          <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)' }}>
            {dict.solution.flow.step1}
          </div>
          <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)' }}>
            {dict.solution.flow.step2}
          </div>
          <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)' }}>
            {dict.solution.flow.step3}
          </div>
          <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)' }}>
            {dict.solution.flow.step4}
          </div>
        </div>
      </section>

      <section className="section-card">
        <h3>{dict.solution.features.title}</h3>
        <ul className="simple-list" style={{ marginTop: '16px' }}>
          <li><strong>{dict.solution.features.interoperability.split(':')[0]}:</strong> {dict.solution.features.interoperability.split(':')[1]}</li>
          <li><strong>{dict.solution.features.security.split(':')[0]}:</strong> {dict.solution.features.security.split(':')[1]}</li>
          <li><strong>{dict.solution.features.privacy.split(':')[0]}:</strong> {dict.solution.features.privacy.split(':')[1]}</li>
        </ul>
      </section>
    </div>
  );
}
