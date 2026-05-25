/**
 * pdw-site-v2/src/app/[lang]/privacidade/page.tsx
 *
 * ATENÇÃO: SUBSTITUI o existente.
 * Conteúdo está em i18n (`privacy.sections[]`) — para alterar texto,
 * editar `src/i18n/locales/pt.json` e `en.json`, não este ficheiro.
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
        ? "Política de Privacidade | Portuguese Digital Wallet"
        : "Privacy Policy | Portuguese Digital Wallet",
  };
}

export default async function PrivacidadePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  // O dicionário precisa de uma estrutura nova `privacy.doc` que devolva
  // já um LegalDoc completo. Vê `i18n-additions.json` para a forma exacta.
  const doc = dict.privacy.doc as LegalDoc;

  return <LegalDocument doc={doc} />;
}
