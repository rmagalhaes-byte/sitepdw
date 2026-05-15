/**
 * pdw-site-v2/src/app/[lang]/sobre/page.tsx
 *
 * ATENÇÃO: este ficheiro SUBSTITUI o existente em
 *   pdw-site-v2/src/app/[lang]/sobre/page.tsx
 *
 * Server Component. O metadata original é preservado.
 */

import { PageHero } from "@/components/sections/PageHero";
import { SobreContent } from "@/components/sections/SobreContent";
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
      ? "Sobre o Projeto | Portuguese Digital Wallet"
      : "About the Project | Portuguese Digital Wallet",
    description: isPt
      ? "Conheça a missão, equipa e parceiros da PDW. Infraestrutura nacional de identidade digital apoiada pela Agenda Blockchain.PT e PRR."
      : "Learn about PDW's mission, team and partners. National digital identity infrastructure supported by the Blockchain.PT Agenda and PRR.",
  };
}

export default async function SobrePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <AnimatedSection>
      <PageHero
        eyebrow={lang === "pt" ? "Sobre o projeto" : "About the project"}
        titleGradient={
          lang === "pt"
            ? "Infraestrutura nacional de identidade digital,"
            : "National digital identity infrastructure,"
        }
        title={
          lang === "pt"
            ? "construída em Portugal para a Europa."
            : "built in Portugal for Europe."
        }
        lead={
          lang === "pt" ? (
            <>
              A <strong>Portuguese Digital Wallet (PDW)</strong> é a camada de execução de
              credenciais verificáveis do Estado português. Coordenada pela{" "}
              <strong>TecMinho</strong> e integrada na Agenda Mobilizadora{" "}
              <em>«Descentralizar Portugal com Blockchain»</em>, posiciona o país como
              referência regulatória e tecnológica na identidade digital descentralizada
              europeia.
            </>
          ) : (
            <>
              The <strong>Portuguese Digital Wallet (PDW)</strong> is the verifiable credential
              execution layer of the Portuguese State. Coordinated by{" "}
              <strong>TecMinho</strong> and part of the Mobilising Agenda{" "}
              <em>«Decentralising Portugal with Blockchain»</em>.
            </>
          )
        }
      />
      <SobreContent dict={dict} />
    </AnimatedSection>
  );
}
