/**
 * pdw-site-v2/src/app/[lang]/page.tsx
 *
 * SUBSTITUI o existente.
 *
 * Mudanças vs. versão actual:
 *   1. <HeroInstitutional /> → <HomeHero /> (wrapper Client com VideoModal).
 *   2. NOVO: <PullQuote /> entre <TrustBar /> e <ValuePillars />.
 *   3. NOVO: <StatsBanner /> entre <ValuePillars /> e <DiplomaCaseSection />.
 *
 * Mantém-se Server Component para generateMetadata + SEO + JSON-LD.
 */
import { HomeHero } from "@/components/sections/HomeHero";
import { TrustBar } from "@/components/sections/TrustBar";
import { PullQuote } from "@/components/sections/PullQuote";
import { ValuePillars } from "@/components/sections/ValuePillars";
import { DiplomaCaseSection } from "@/components/sections/DiplomaCaseSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { getMediaBySlot } from "@/lib/posts-db";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isPt = lang === "pt";
  return {
    metadataBase: new URL("https://www.digitalwallet.pt"),
    title: isPt
      ? "Portuguese Digital Wallet — Acesso Digital Sem Fricção"
      : "Portuguese Digital Wallet — Frictionless Digital Access",
    description: isPt
      ? "A PDW é a carteira digital soberana de Portugal. Credenciais verificáveis, conformidade EBSI. Simples, seguro e seu."
      : "PDW is Portugal's sovereign digital wallet. Verifiable credentials, EBSI compliance. Simple, secure, and yours.",
    openGraph: {
      title: "Portuguese Digital Wallet",
      description: isPt
        ? "Acesso a serviços digitais sem fricção."
        : "Frictionless access to digital services.",
      images: ["/og-image.png"],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  let videoSrc = "/concept_video.mp4";
  try {
    const demoMedia = getMediaBySlot("homepage-demo");
    if (demoMedia?.public_path) videoSrc = demoMedia.public_path;
  } catch { /* DB ainda não inicializada */ }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Portuguese Digital Wallet",
            url: "https://www.digitalwallet.pt",
            logo: "https://www.digitalwallet.pt/pdw_logo.png",
            description: dict.hero.description,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Guimarães",
              addressCountry: "PT",
            },
            parentOrganization: {
              "@type": "Organization",
              name: "TecMinho",
            },
          }),
        }}
      />
      <HomeHero lang={lang as Locale} dict={dict} videoSrc={videoSrc} />
      <TrustBar dict={dict} />
      <PullQuote lang={lang as Locale} dict={dict} />
      <ValuePillars lang={lang as Locale} />
      <DiplomaCaseSection lang={lang as Locale} dict={dict} />
      <ContactCTA lang={lang as Locale} dict={dict} />
    </>
  );
}
