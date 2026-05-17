"use client";

import { useState } from "react";
import Image from "next/image";
import type { Post } from "@/lib/posts-db";
import type { Locale } from "@/i18n/config";

type CssType = "youtube" | "podcast" | "linkedin" | "instagram" | "press";

interface TypeMeta {
  label: string;
  cssType: CssType;
  icon: React.ReactNode;
}

const YT_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.5V8.5l6.3 3.5-6.3 3.5z"/>
  </svg>
);
const LI_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 1 1 8.25 6.5 1.78 1.78 0 0 1 6.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
  </svg>
);
const IG_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);
const POD_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <path d="M12 19v4"/><path d="M8 23h8"/>
  </svg>
);
const PRESS_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h12a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2V4z"/>
    <path d="M18 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2"/>
    <path d="M8 8h6M8 12h6M8 16h4"/>
  </svg>
);

const TYPE_META: Record<string, TypeMeta> = {
  youtube:   { label: "Vídeo",     cssType: "youtube",   icon: YT_ICON    },
  spotify:   { label: "Podcast",   cssType: "podcast",   icon: POD_ICON   },
  linkedin:  { label: "LinkedIn",  cssType: "linkedin",  icon: LI_ICON    },
  instagram: { label: "Instagram", cssType: "instagram", icon: IG_ICON    },
  x:         { label: "X",         cssType: "press",     icon: PRESS_ICON },
  pdw:       { label: "PDW",       cssType: "press",     icon: PRESS_ICON },
  evento:    { label: "Evento",    cssType: "press",     icon: PRESS_ICON },
  imagem:    { label: "Imagem",    cssType: "press",     icon: PRESS_ICON },
};

function fmtDate(iso: string | null, lang: Locale): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(lang === "pt" ? "pt-PT" : "en-GB", {
    day: "2-digit", month: "long", year: "numeric",
  });
}

interface AtualMetaProps {
  post: Post;
  cssType: CssType;
  typeLabel: string;
  typeIcon: React.ReactNode;
  lang: Locale;
  hideDescription?: boolean;
}

function AtualMeta({ post, cssType, typeLabel, typeIcon, lang, hideDescription }: AtualMetaProps) {
  const date = fmtDate(post.published_at ?? post.created_at, lang);
  return (
    <div className="atual-meta">
      <div className="atual-meta-head">
        <span className={`atual-tag atual-tag-${cssType}`}>
          {typeIcon} {typeLabel}
        </span>
        <time className="atual-date">{date}</time>
      </div>
      <h3 className="atual-title">{post.title}</h3>
      {!hideDescription && post.excerpt && (
        <p className="atual-desc">{post.excerpt}</p>
      )}
      {post.source_url && (
        <div className="atual-source">
          {new URL(post.source_url).hostname.replace("www.", "")}
        </div>
      )}
    </div>
  );
}

export function PostCard({ post, lang }: { post: Post; lang: Locale }) {
  const meta = TYPE_META[post.type] ?? TYPE_META.pdw;
  const e = post.embed ?? {} as Record<string, string>;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes_count);

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
      /* optimistic UI already applied */
    }
  }

  // ── YouTube ──────────────────────────────────────────────────────────────
  if (post.type === "youtube") {
    return (
      <article className="atual-card atual-card-youtube">
        <div className="atual-embed">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${e.videoId}`}
            title={post.title}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <AtualMeta post={post} cssType="youtube" typeLabel="Vídeo" typeIcon={YT_ICON} lang={lang} />
        <LikeBar liked={liked} likeCount={likeCount} onLike={onLike} lang={lang} />
      </article>
    );
  }

  // ── Spotify / Podcast ─────────────────────────────────────────────────────
  if (post.type === "spotify") {
    const kind = e.kind ?? "episode";
    return (
      <article className="atual-card atual-card-podcast">
        <div className="atual-podcast-player">
          <div className="atual-podcast-art" aria-hidden="true">{POD_ICON}</div>
          <div className="atual-podcast-info">
            <div className="atual-podcast-source">{post.excerpt?.slice(0, 40) ?? "Podcast"}</div>
            <div className="atual-podcast-title">{post.title}</div>
          </div>
          <a
            href={post.source_url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="atual-podcast-play"
            aria-label="Abrir podcast"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </a>
        </div>
        <AtualMeta post={post} cssType="podcast" typeLabel="Podcast" typeIcon={POD_ICON} lang={lang} />
        <LikeBar liked={liked} likeCount={likeCount} onLike={onLike} lang={lang} />
      </article>
    );
  }

  // ── LinkedIn ──────────────────────────────────────────────────────────────
  if (post.type === "linkedin") {
    return (
      <article className="atual-card atual-card-linkedin">
        <a className="atual-social-link" href={post.source_url ?? "#"} target="_blank" rel="noopener noreferrer">
          <div className="atual-social-header">
            <span className="atual-social-platform">{LI_ICON} LinkedIn</span>
            <span className="atual-social-handle">{e.author ?? "TecMinho"}</span>
          </div>
          <div className="atual-social-body">
            {post.excerpt && <p>{post.excerpt}</p>}
            <span className="atual-social-cta">
              {lang === "pt" ? "Ler publicação no LinkedIn →" : "Read post on LinkedIn →"}
            </span>
          </div>
        </a>
        <AtualMeta post={post} cssType="linkedin" typeLabel="LinkedIn" typeIcon={LI_ICON} lang={lang} hideDescription />
        <LikeBar liked={liked} likeCount={likeCount} onLike={onLike} lang={lang} />
      </article>
    );
  }

  // ── Instagram ─────────────────────────────────────────────────────────────
  if (post.type === "instagram") {
    return (
      <article className="atual-card atual-card-instagram">
        <a className="atual-social-link" href={post.source_url ?? "#"} target="_blank" rel="noopener noreferrer">
          <div className="atual-social-header">
            <span className="atual-social-platform">{IG_ICON} Instagram</span>
            <span className="atual-social-handle">{e.author ? `@${e.author}` : "@tecminho"}</span>
          </div>
          <div className="atual-social-body">
            {post.excerpt && <p>{post.excerpt}</p>}
            <span className="atual-social-cta">
              {lang === "pt" ? "Ver no Instagram →" : "View on Instagram →"}
            </span>
          </div>
        </a>
        <AtualMeta post={post} cssType="instagram" typeLabel="Instagram" typeIcon={IG_ICON} lang={lang} hideDescription />
        <LikeBar liked={liked} likeCount={likeCount} onLike={onLike} lang={lang} />
      </article>
    );
  }

  // ── Imagem ────────────────────────────────────────────────────────────────
  if (post.type === "imagem" && e.src) {
    return (
      <article className="atual-card atual-card-press">
        <div className="atual-press-image">
          <Image src={e.src} alt={e.alt ?? post.title} width={800} height={450} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <AtualMeta post={post} cssType="press" typeLabel="Imagem" typeIcon={PRESS_ICON} lang={lang} />
        <LikeBar liked={liked} likeCount={likeCount} onLike={onLike} lang={lang} />
      </article>
    );
  }

  // ── Press / PDW / Evento / fallback ──────────────────────────────────────
  return (
    <article className="atual-card atual-card-press">
      {post.source_url ? (
        <a className="atual-press-link" href={post.source_url} target="_blank" rel="noopener noreferrer">
          {e.image && (
            <div className="atual-press-image">
              <img src={e.image} alt="" />
            </div>
          )}
        </a>
      ) : null}
      <AtualMeta
        post={post}
        cssType="press"
        typeLabel={meta.label}
        typeIcon={meta.icon}
        lang={lang}
      />
      <LikeBar liked={liked} likeCount={likeCount} onLike={onLike} lang={lang} />
    </article>
  );
}

function LikeBar({ liked, likeCount, onLike, lang }: { liked: boolean; likeCount: number; onLike: () => void; lang: Locale }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 18px 14px", borderTop: "1px solid var(--color-border)" }}>
      <button
        onClick={onLike}
        aria-pressed={liked}
        style={{
          background: "none", border: "none", cursor: "pointer",
          font: "inherit", fontSize: "13px", fontWeight: 600,
          color: liked ? "#e11d48" : "var(--color-muted)",
          display: "inline-flex", alignItems: "center", gap: "4px",
          transition: "color 0.2s ease",
        }}
      >
        {liked ? "♥" : "♡"} {likeCount}
      </button>
      <button
        style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", fontSize: "13px" }}
        aria-label={lang === "pt" ? "Partilhar" : "Share"}
      >
        ↗
      </button>
    </div>
  );
}
