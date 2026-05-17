"use client";

import { useState, useTransition } from "react";
import type { Post, PostType } from "@/lib/posts-db";
import type { Locale } from "@/i18n/config";
import { PostCard } from "./PostCard";

const FILTER_DEFS: Array<{ id: PostType | "all"; labelPt: string; labelEn: string }> = [
  { id: "all",       labelPt: "Todas",     labelEn: "All"       },
  { id: "youtube",   labelPt: "Vídeos",    labelEn: "Videos"    },
  { id: "spotify",   labelPt: "Podcasts",  labelEn: "Podcasts"  },
  { id: "linkedin",  labelPt: "LinkedIn",  labelEn: "LinkedIn"  },
  { id: "instagram", labelPt: "Instagram", labelEn: "Instagram" },
  { id: "pdw",       labelPt: "Imprensa",  labelEn: "Press"     },
  { id: "evento",    labelPt: "Eventos",   labelEn: "Events"    },
];

interface Props {
  initialPosts: Post[];
  counts: Record<string, number>;
  lang: Locale;
}

export function FeedMural({ initialPosts, counts, lang }: Props) {
  const [filter, setFilter] = useState<PostType | "all">("all");
  const [posts, setPosts] = useState(initialPosts);
  const [isPending, startTransition] = useTransition();
  const isPt = lang === "pt";

  function applyFilter(id: PostType | "all") {
    setFilter(id);
    startTransition(async () => {
      const url = id === "all" ? "/api/public/posts" : `/api/public/posts?type=${id}`;
      const res = await fetch(url);
      const data = await res.json();
      setPosts(data.posts);
    });
  }

  const visibleFilters = FILTER_DEFS.filter(
    (f) => f.id === "all" || (counts[f.id] ?? 0) > 0
  );

  return (
    <>
      <div className="atual-filter" role="tablist" aria-label={isPt ? "Filtrar por tipo" : "Filter by type"}>
        {visibleFilters.map((f) => {
          const active = f.id === filter;
          const count = counts[f.id] ?? (f.id === "all" ? initialPosts.length : 0);
          return (
            <button
              key={f.id}
              role="tab"
              aria-selected={active}
              onClick={() => applyFilter(f.id)}
              className={"atual-filter-tab" + (active ? " is-active" : "")}
            >
              {isPt ? f.labelPt : f.labelEn}
              <span className="atual-filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className={"atual-feed" + (isPending ? " is-loading" : "")} style={{ opacity: isPending ? 0.5 : 1 }}>
        {posts.length === 0 ? (
          <div className="atual-empty">
            {isPt ? "Ainda não há posts deste tipo." : "No posts of this type yet."}
          </div>
        ) : (
          posts.map((p) => <PostCard key={p.id} post={p} lang={lang} />)
        )}
      </div>
    </>
  );
}
