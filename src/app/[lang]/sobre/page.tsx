import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";

export default async function SobrePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <section className="section-card">
        <SectionHeading
          title={dict.about.heading.title}
          subtitle={dict.about.heading.subtitle}
        />
        <p style={{ lineHeight: 1.6 }}>{dict.about.strategicContext.text}</p>
      </section>

      <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <article className="section-card">
          <h3 style={{ color: 'var(--color-primary)' }}>{dict.about.mission.title}</h3>
          <p>{dict.about.mission.text}</p>
        </article>
        <article className="section-card">
          <h3 style={{ color: 'var(--color-primary)' }}>{dict.about.vision.title}</h3>
          <p>{dict.about.vision.text}</p>
        </article>
      </div>

      <section className="section-card">
        <h3>{dict.about.standards.title}</h3>
        <ul className="simple-list" style={{ marginTop: '16px' }}>
          <li><strong>{dict.about.standards.eidas.split(':')[0]}:</strong>{dict.about.standards.eidas.split(':')[1]}</li>
          <li><strong>{dict.about.standards.ebsi.split(':')[0]}:</strong>{dict.about.standards.ebsi.split(':')[1]}</li>
          <li><strong>{dict.about.standards.eudi.split(':')[0]}:</strong>{dict.about.standards.eudi.split(':')[1]}</li>
        </ul>
      </section>

      <div className="grid-3" style={{ gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        <section className="section-card">
          <h3>{dict.about.team.title}</h3>
          <ul className="simple-list" style={{ marginTop: '16px' }}>
            {dict.about.team.members.map((member: string) => (
              <li key={member} style={{ fontWeight: 600 }}>{member}</li>
            ))}
          </ul>
        </section>
        <section className="section-card">
          <h3>{dict.about.governance.title}</h3>
          <p style={{ marginTop: '16px', lineHeight: 1.6 }}>{dict.about.governance.text}</p>
        </section>
      </div>
    </div>
  );
}
