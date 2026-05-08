import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";

export default async function DiplomasPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <section className="section-card">
        <SectionHeading
          title={dict.diplomas.heading.title}
          subtitle={dict.diplomas.heading.subtitle}
        />
        <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginTop: '24px' }}>
          <article className="section-card" style={{ background: '#f0fff4', borderColor: '#c6f6d5' }}>
            <h4 style={{ color: '#22543d' }}>{dict.diplomas.problem.title}</h4>
            <p style={{ fontSize: '14px' }}>{dict.diplomas.problem.text}</p>
          </article>
          <article className="section-card" style={{ background: '#ebf8ff', borderColor: '#bee3f8' }}>
            <h4 style={{ color: '#2a4365' }}>{dict.diplomas.solution.title}</h4>
            <p style={{ fontSize: '14px' }}>{dict.diplomas.solution.text}</p>
          </article>
        </div>

        <div style={{ marginTop: '32px' }}>
          <h3>{dict.diplomas.benefits.title}</h3>
          <ul className="simple-list" style={{ marginTop: '16px' }}>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #edf2f7' }}>✅ {dict.diplomas.benefits.time}</li>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #edf2f7' }}>✅ {dict.diplomas.benefits.fraud}</li>
            <li style={{ padding: '8px 0' }}>✅ {dict.diplomas.benefits.cost}</li>
          </ul>
        </div>
      </section>
      
      <LeadFormSection dict={dict} />
    </div>
  );
}
