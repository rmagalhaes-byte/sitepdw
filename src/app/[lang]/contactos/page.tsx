import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";
import type { Metadata } from "next";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isPt = lang === "pt";
  return {
    title: isPt
      ? "Contactos e Parcerias | Portuguese Digital Wallet"
      : "Contacts and Partnerships | Portuguese Digital Wallet",
    description: isPt
      ? "Quer implementar a PDW na sua instituição? Contacte-nos para uma demonstração personalizada."
      : "Want to implement PDW in your institution? Contact us for a personalized demonstration.",
  };
}

export default async function ContactosPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ email?: string }>;
}) {
  const { lang } = await params;
  const { email: initialEmail } = await searchParams;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <AnimatedSection>
        <section className="section-card">
          <SectionHeading title={dict.contacts.heading.title} subtitle={dict.contacts.heading.subtitle} />
          <p style={{ lineHeight: 1.7, color: 'var(--color-muted)' }}>{dict.contacts.invite}</p>
          
          {dict.contacts.afterContact && (
            <div style={{
              marginTop: '16px',
              padding: '14px 18px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(0, 108, 75, 0.04) 0%, rgba(16, 185, 129, 0.03) 100%)',
              border: '1px solid rgba(0, 108, 75, 0.1)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              </span>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.5 }}>
                {dict.contacts.afterContact}
              </p>
            </div>
          )}

          <div style={{ marginTop: '20px', display: 'grid', gap: '8px' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <strong style={{ fontSize: '14px' }}>{dict.footer.address}</strong>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <a href={`mailto:${dict.footer.email}`} style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '14px' }}>
                {dict.footer.email}
              </a>
            </p>
          </div>
        </section>
      </AnimatedSection>
      <AnimatedSection delay={0.15}>
        <LeadFormSection dict={dict} initialEmail={initialEmail} />
      </AnimatedSection>
    </>
  );
}
