/**
 * pdw-site-v2/src/app/[lang]/solucao/page.tsx
 *
 * ATENÇÃO: este ficheiro SUBSTITUI o existente em
 *   pdw-site-v2/src/app/[lang]/solucao/page.tsx
 */
import { PageHero } from "@/components/sections/PageHero";
import { SolucaoContent } from "@/components/sections/SolucaoContent";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";
import type { Metadata } from "next";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isPt = lang === "pt";
  return {
    title: isPt
      ? "Como Funciona | Portuguese Digital Wallet"
      : "How It Works | Portuguese Digital Wallet",
    description: isPt
      ? "Descubra como a PDW emite, armazena e verifica credenciais digitais com privacidade total e conformidade europeia."
      : "Discover how PDW issues, stores and verifies digital credentials with total privacy and European compliance.",
  };
}

export default async function SolucaoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <AnimatedSection>
      <PageHero
        eyebrow={lang === "pt" ? "A solução" : "The solution"}
        titleGradient={
          lang === "pt" ? "Credenciais verificáveis," : "Verifiable credentials,"
        }
        title={
          lang === "pt"
            ? "sem fricção, com soberania."
            : "frictionless, with sovereignty."
        }
        lead={
          lang === "pt" ? (
            <>
              A PDW assenta no paradigma da <strong>Identidade Auto-Soberana</strong> e em
              credenciais verificáveis que cumprem os referenciais europeus{" "}
              <strong>W3C VC</strong>, <strong>EBSI</strong> e <strong>EUDI ARF</strong>.
            </>
          ) : (
            <>
              PDW is built on the <strong>Self-Sovereign Identity</strong> paradigm and on
              verifiable credentials compliant with <strong>W3C VC</strong>,{" "}
              <strong>EBSI</strong> and <strong>EUDI ARF</strong>.
            </>
          )
        }
      />
      <SolucaoContent dict={dict} />
    </AnimatedSection>
  );
}
