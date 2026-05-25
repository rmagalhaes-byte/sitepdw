// pdw-site-v2/src/app/[lang]/atualidades/page.tsx
// Página pública /pt/atualidades e /en/atualidades.
// Server Component — busca os posts iniciais e passa-os ao FeedMural cliente.
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

export const revalidate = 60; // ISR de 1 min — feed quase real-time

export default async function AtualidadesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const posts = listPosts({ status: "published", limit: 24 });
  const counts = countPostsByType("published");

  return (
    <main className="pdw-feed">
      <header className="pdw-feed__hero">
        <span className="pdw-feed__eyebrow">
          <span className="pdw-feed__live-dot" /> {dict.feed?.live ?? "Em directo"}
        </span>
        <h1>{dict.feed?.title ?? "Atualidades"}</h1>
        <p>
          {dict.feed?.subtitle ??
            "Tudo o que se passa na PDW, num só feed. Vídeos, podcasts, eventos e marcos — agregados das redes oficiais."}
        </p>
      </header>

      <FeedMural initialPosts={posts} counts={counts} />
    </main>
  );
}
