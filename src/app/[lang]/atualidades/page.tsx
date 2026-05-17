import type { Metadata } from "next";
import { listPosts, countPostsByType } from "@/lib/posts-db";
import { FeedMural } from "@/components/atualidades/FeedMural";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isPt = lang === "pt";
  return {
    title: isPt ? "Atualidades · PDW" : "News · PDW",
    description: isPt
      ? "Vídeos, podcasts, eventos e marcos da Portuguese Digital Wallet, num só feed."
      : "Videos, podcasts, events and milestones of the Portuguese Digital Wallet, in one feed.",
    alternates: {
      canonical: `/${lang}/atualidades`,
      languages: { pt: "/pt/atualidades", en: "/en/atualidades" },
    },
  };
}

export const revalidate = 60;

export default async function AtualidadesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const posts = listPosts({ status: "published", limit: 24 });
  const counts = countPostsByType("published");
  const isPt = lang === "pt";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <header className="page-hero">
        <span className="eyebrow">{isPt ? "Atualidades" : "News"}</span>
        <h1 className="page-hero-title">
          <span className="text-gradient">
            {isPt ? "A PDW em movimento." : "PDW in motion."}
          </span>
        </h1>
        <p className="page-hero-lead">
          {isPt
            ? "Cobertura institucional, vídeos, podcasts e publicações em redes sociais. Atualizado diretamente pela equipa de comunicação da TecMinho via painel de administração."
            : "Institutional coverage, videos, podcasts and social media posts. Updated directly by the TecMinho communications team via the administration panel."}
        </p>
      </header>

      <FeedMural initialPosts={posts} counts={counts} lang={lang as Locale} />
    </div>
  );
}
