/**
 * pdw-site-v2/src/app/[lang]/termos/page.tsx
 *
 * ATENÇÃO: SUBSTITUI o existente.
 * Conteúdo está em i18n (`terms.doc`) — ver `i18n-additions.json`.
 */
import { LegalDocument, type LegalDoc } from "@/components/legal/LegalDocument";
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
  return {
    title:
      lang === "pt"
        ? "Termos de Utilização | Portuguese Digital Wallet"
        : "Terms of Use | Portuguese Digital Wallet",
  };
}

export default async function TermosPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const doc = dict.terms.doc as LegalDoc;

  return <LegalDocument doc={doc} />;
}
