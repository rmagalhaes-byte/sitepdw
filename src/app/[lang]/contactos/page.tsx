import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";

export default async function ContactosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <section className="section-card">
        <SectionHeading title={dict.nav.contacts} subtitle={dict.contacts.heading.subtitle} />
        <p style={{ lineHeight: 1.6 }}>{dict.contacts.invite}</p>
        <div style={{ marginTop: '24px', display: 'grid', gap: '8px' }}>
          <p><strong>📍 {dict.footer.address}</strong></p>
          <p><strong>✉️ {dict.footer.email}</strong></p>
        </div>
      </section>
      <LeadFormSection dict={dict} />
    </>
  );
}
