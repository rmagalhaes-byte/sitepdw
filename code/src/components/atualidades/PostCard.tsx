// pdw-site-v2/src/components/atualidades/PostCard.tsx
"use client";

import { useState } from "react";
import type { Post } from "@/lib/posts-db";
import { EmbedRenderer } from "./EmbedRenderer";

const PROVIDER_META: Record<string, { label: string; color: string }> = {
  pdw:       { label: "PDW",       color: "#006c4b" },
  youtube:   { label: "YouTube",   color: "#FF0033" },
  spotify:   { label: "Spotify",   color: "#1DB954" },
  linkedin:  { label: "LinkedIn",  color: "#0A66C2" },
  instagram: { label: "Instagram", color: "#E1306C" },
  x:         { label: "X",         color: "#000000" },
  evento:    { label: "Evento",    color: "#1a3b5d" },
  imagem:    { label: "Imagem",    color: "#3d4a42" },
};

function timeAgo(iso: string | null): string {
  if (!iso) return "";
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "agora";
  if (diff < 3600) return `há ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `há ${Math.floor(diff / 3600)} h`;
  const d = Math.floor(diff / 86400);
  return d === 1 ? "ontem" : `há ${d} dias`;
}

export function PostCard({ post }: { post: Post }) {
  const meta = PROVIDER_META[post.type] ?? PROVIDER_META.pdw;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes_count);

  // Layout span based on type — wide for video, tall for events
  const wide = post.type === "youtube" || post.type === "x";
  const tall = post.type === "evento";

  async function onLike() {
    setLiked(!liked);
    setLikeCount((n) => (liked ? n - 1 : n + 1));
    try {
      const r = await fetch("/api/public/likes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ post_id: post.id }),
      });
      const data = await r.json();
      setLiked(data.liked);
      setLikeCount(data.total);
    } catch {
      // optimistic UI já fez o trabalho; ignorar
    }
  }

  return (
    <article
      className="pdw-post"
      style={{
        gridColumn: wide ? "span 2" : "span 1",
        gridRow: tall ? "span 2" : "span 1",
      }}
    >
      <header className="pdw-post__head">
        <span className="pdw-post__chip" style={{ background: `${meta.color}14`, color: meta.color }}>
          {meta.label}
        </span>
        {post.pinned && <span className="pdw-post__pinned">📌 Fixado</span>}
        <time className="pdw-post__time">{timeAgo(post.published_at ?? post.created_at)}</time>
      </header>

      <EmbedRenderer post={post} />

      <div className="pdw-post__body">
        <h3>{post.title}</h3>
        {post.excerpt && <p>{post.excerpt}</p>}
      </div>

      <footer className="pdw-post__foot">
        <button
          onClick={onLike}
          aria-pressed={liked}
          className={liked ? "is-liked" : ""}
        >
          {liked ? "♥" : "♡"} {likeCount}
        </button>
        {post.comments_enabled && (
          <button>💬 {post.comments_count}</button>
        )}
        <button style={{ marginLeft: "auto" }} aria-label="Partilhar">↗</button>
      </footer>
    </article>
  );
}
