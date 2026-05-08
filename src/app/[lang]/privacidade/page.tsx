import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";

export default async function PrivacidadePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <section className="section-card">
      <SectionHeading title={dict.privacy.title} />
      <div style={{ lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>{dict.privacy.text}</p>
        <ul className="simple-list">
          <li><strong>{dict.privacy.dataCollected.split(':')[0]}:</strong> {dict.privacy.dataCollected.split(':')[1]}</li>
          <li><strong>{dict.privacy.purpose.split(':')[0]}:</strong> {dict.privacy.purpose.split(':')[1]}</li>
          <li><strong>{dict.privacy.legalBase.split(':')[0]}:</strong> {dict.privacy.legalBase.split(':')[1]}</li>
        </ul>
      </div>
    </section>
  );
}
