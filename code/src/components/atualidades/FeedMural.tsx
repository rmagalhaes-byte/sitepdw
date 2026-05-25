// pdw-site-v2/src/components/atualidades/FeedMural.tsx
// Client component principal do feed público.
// Recebe os posts iniciais do server e gere filtro/pagination no cliente.
"use client";

import { useState, useTransition } from "react";
import type { Post, PostType } from "@/lib/posts-db";
import { PostCard } from "./PostCard";

const FILTERS: Array<{ id: PostType | "all"; label: string }> = [
  { id: "all",       label: "Todos" },
  { id: "pdw",       label: "PDW" },
  { id: "evento",    label: "Eventos" },
  { id: "youtube",   label: "YouTube" },
  { id: "spotify",   label: "Spotify" },
  { id: "linkedin",  label: "LinkedIn" },
  { id: "instagram", label: "Instagram" },
  { id: "x",         label: "X" },
];

interface Props {
  initialPosts: Post[];
  counts: Record<string, number>;
}

export function FeedMural({ initialPosts, counts }: Props) {
  const [filter, setFilter] = useState<PostType | "all">("all");
  const [posts, setPosts] = useState(initialPosts);
  const [isPending, startTransition] = useTransition();

  function applyFilter(id: PostType | "all") {
    setFilter(id);
    startTransition(async () => {
      const url = id === "all" ? "/api/public/posts" : `/api/public/posts?type=${id}`;
      const res = await fetch(url);
      const data = await res.json();
      setPosts(data.posts);
    });
  }

  return (
    <>
      <div className="pdw-feed-filters" role="tablist" aria-label="Filtrar atualidades">
        {FILTERS.map(f => {
          const active = f.id === filter;
          const count  = counts[f.id] ?? 0;
          if (f.id !== "all" && count === 0) return null;
          return (
            <button
              key={f.id}
              role="tab"
              aria-selected={active}
              onClick={() => applyFilter(f.id)}
              className={"pdw-pill" + (active ? " is-active" : "")}
            >
              {f.label}
              <span className="pdw-pill__count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className={"pdw-feed-grid" + (isPending ? " is-loading" : "")}>
        {posts.length === 0 ? (
          <div className="pdw-feed-empty">Ainda não há posts deste tipo.</div>
        ) : (
          posts.map(p => <PostCard key={p.id} post={p} />)
        )}
      </div>
    </>
  );
}
