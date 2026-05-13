import { HeroInstitutional } from "@/components/sections/HeroInstitutional";
import { TrustBar } from "@/components/sections/TrustBar";
import { ValuePillars } from "@/components/sections/ValuePillars";
import { UseCasesGrid } from "@/components/sections/UseCasesGrid";
import { DiplomaCaseSection } from "@/components/sections/DiplomaCaseSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isPt = lang === "pt";
  return {
    metadataBase: new URL('https://pdw.tecminho.uminho.pt'),
    title: isPt
      ? "Portuguese Digital Wallet — Acesso Digital Sem Fricção"
      : "Portuguese Digital Wallet — Frictionless Digital Access",
    description: isPt
      ? "A PDW é a carteira digital soberana de Portugal. Credenciais verificáveis, eIDAS 2.0, EBSI. Simples, seguro e seu."
      : "PDW is Portugal's sovereign digital wallet. Verifiable credentials, eIDAS 2.0, EBSI. Simple, secure, and yours.",
    openGraph: {
      title: "Portuguese Digital Wallet",
      description: isPt
        ? "Acesso a serviços digitais sem fricção."
        : "Frictionless access to digital services.",
      images: ["/og-image.png"],
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Portuguese Digital Wallet",
            "url": "https://pdw.tecminho.uminho.pt",
            "logo": "https://pdw.tecminho.uminho.pt/pdw_logo.png",
            "description": dict.hero.description,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Guimarães",
              "addressCountry": "PT"
            },
            "parentOrganization": {
              "@type": "Organization",
              "name": "TecMinho"
            }
          })
        }}
      />
      <HeroInstitutional lang={lang as Locale} dict={dict} />
      <TrustBar dict={dict} />
      <ValuePillars dict={dict} />
      <DiplomaCaseSection lang={lang as Locale} dict={dict} />

    </>
  );
}
