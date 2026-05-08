import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";

export default async function TermosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <section className="section-card">
      <SectionHeading title={dict.terms.title} />
      <div style={{ lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>{dict.terms.text}</p>
        <ul className="simple-list">
          <li><strong>{dict.terms.liability.split(':')[0]}:</strong> {dict.terms.liability.split(':')[1]}</li>
          <li><strong>{dict.terms.copyright.split(':')[0]}:</strong> {dict.terms.copyright.split(':')[1]}</li>
        </ul>
      </div>
    </section>
  );
}
