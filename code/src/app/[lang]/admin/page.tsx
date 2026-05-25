// pdw-site-v2/src/app/[lang]/admin/page.tsx
// SUBSTITUI o ficheiro existente. Dashboard com tabs:
//   · Feed (atualidades)
//   · Vídeos
//   · Logos
// O changelog antigo passa para um card colapsado.

import type { Metadata } from "next";
import { listPosts } from "@/lib/posts-db";
import { PostsManager } from "@/components/admin/PostsManager";
import { MediaLibrary } from "@/components/admin/MediaLibrary";
import { AdminTabs } from "@/components/admin/AdminTabs";

export const metadata: Metadata = {
  title: "Administração | PDW",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab = "feed" } = await searchParams;
  const initialPosts = listPosts({ status: "all", limit: 50 });

  return (
    <>
      <header className="page-hero">
        <span className="page-hero-eyebrow">Painel interno</span>
        <h1 className="page-hero-title">Administração · Conteúdo</h1>
        <p className="page-hero-lead">
          Gere o feed de atualidades, vídeos e logos do site. Mudanças aplicadas em
          produção sem deploy.
        </p>
      </header>

      <AdminTabs active={tab} />

      {tab === "feed"   && <PostsManager initialPosts={initialPosts} />}
      {tab === "videos" && <MediaLibrary kind="video" title="Biblioteca de vídeos" />}
      {tab === "logos"  && (
        <MediaLibrary
          kind="logo"
          title="Logos de parceiros e financiadores"
          slotOptions={["header", "footer-partners", "trustbar", "funders"]}
        />
      )}
    </>
  );
}
