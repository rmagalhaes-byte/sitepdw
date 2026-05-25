"use client";

import { useState, useTransition } from "react";
import type { Post, PostType } from "@/lib/posts-db";
import type { Locale } from "@/i18n/config";
import { PostCard } from "./PostCard";

const PROVIDER_META: Record<string, { label: string; color: string; icon: string }> = {
  pdw:       { label: "PDW",       color: "#006c4b", icon: "★" },
  youtube:   { label: "YouTube",   color: "#FF0033", icon: "▶" },
  spotify:   { label: "Spotify",   color: "#1DB954", icon: "♫" },
  linkedin:  { label: "LinkedIn",  color: "#0A66C2", icon: "in" },
  instagram: { label: "Instagram", color: "#E1306C", icon: "◎" },
  x:         { label: "X",         color: "#000000", icon: "✕" },
  evento:    { label: "Evento",    color: "#1a3b5d", icon: "▣" },
  imagem:    { label: "Imagem",    color: "#3d4a42", icon: "◈" },
};

const FILTER_DEFS: Array<{ id: PostType | "all"; labelPt: string; labelEn: string }> = [
  { id: "all",       labelPt: "Todos",     labelEn: "All"       },
  { id: "pdw",       labelPt: "PDW",       labelEn: "PDW"       },
  { id: "evento",    labelPt: "Eventos",   labelEn: "Events"    },
  { id: "youtube",   labelPt: "YouTube",   labelEn: "YouTube"   },
  { id: "spotify",   labelPt: "Spotify",   labelEn: "Spotify"   },
  { id: "linkedin",  labelPt: "LinkedIn",  labelEn: "LinkedIn"  },
  { id: "instagram", labelPt: "Instagram", labelEn: "Instagram" },
  { id: "x",         labelPt: "X",         labelEn: "X"         },
];

const STORY_ORDER: PostType[] = ["youtube", "evento", "spotify", "linkedin", "imagem", "instagram", "x", "pdw"];

const STORY_LABELS: Record<PostType, { pt: string; en: string }> = {
  youtube:   { pt: "YouTube",   en: "YouTube"   },
  evento:    { pt: "Eventos",   en: "Events"    },
  spotify:   { pt: "Spotify",   en: "Spotify"   },
  linkedin:  { pt: "LinkedIn",  en: "LinkedIn"  },
  imagem:    { pt: "Imagens",   en: "Photos"    },
  instagram: { pt: "Instagram", en: "Instagram" },
  x:         { pt: "X",         en: "X"         },
  pdw:       { pt: "PDW",       en: "PDW"       },
};

interface Props {
  initialPosts: Post[];
  counts: Record<string, number>;
  lang: Locale;
}

function SearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none"/>
      <circle cx="4" cy="12" r="1" fill="currentColor" stroke="none"/>
      <circle cx="4" cy="18" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
    </svg>
  );
}

function StoryRail({ counts, lang }: { counts: Record<string, number>; lang: Locale }) {
  const isPt = lang === "pt";
  const availableTypes = STORY_ORDER.filter(t => (counts[t] ?? 0) > 0);
  if (availableTypes.length === 0) return null;

  return (
    <section className="atual-stories-section">
      <div className="atual-stories-header">
        <h2 className="atual-stories-title">{isPt ? "Destaques recentes" : "Recent highlights"}</h2>
        <span className="atual-stories-all">{isPt ? "Ver tudo →" : "See all →"}</span>
      </div>
      <div className="atual-stories-rail" aria-label={isPt ? "Destaques por canal" : "Highlights by channel"}>
        {availableTypes.map((type, i) => {
          const meta = PROVIDER_META[type];
          const label = STORY_LABELS[type]?.[isPt ? "pt" : "en"] ?? meta.label;
          const seen = i >= 3;
          return (
            <div key={type} className="atual-story-item" role="button" tabIndex={0} aria-label={label}>
              <div
                className={"atual-story-bubble" + (seen ? " is-seen" : "")}
                style={{ "--story-color": meta.color } as React.CSSProperties}
              >
                <div className="atual-story-inner">
                  <span className="atual-story-icon" aria-hidden="true">{meta.icon}</span>
                </div>
              </div>
              <span className="atual-story-label">{label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function FeedMural({ initialPosts, counts, lang }: Props) {
  const [filter, setFilter] = useState<PostType | "all">("all");
  const [viewMode, setViewMode] = useState<"mural" | "list">("mural");
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

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const weeklyCount = initialPosts.filter(
    (p) => (p.published_at ?? p.created_at) >= weekAgo
  ).length;

  return (
    <>
      {/* Hero strip */}
      <div className="atual-hero">
        <div className="atual-hero-content">
          <div className="atual-live-badge" aria-label={isPt ? "Em directo" : "Live"}>
            <span className="atual-live-dot" aria-hidden="true" />
            {isPt ? "Em directo" : "Live"}
          </div>
          <h1 className="atual-hero-title">{isPt ? "Atualidades" : "News"}</h1>
          <p className="atual-hero-lead">
            {isPt
              ? "Tudo o que se passa na PDW, num só feed. Vídeos, podcasts, eventos e marcos — agregados das redes oficiais."
              : "Everything happening at PDW, in one feed. Videos, podcasts, events and milestones — aggregated from official channels."}
          </p>
        </div>
        <div className="atual-hero-aside">
          {weeklyCount > 0 && (
            <div className="atual-week-badge">
              <ArrowUpIcon />
              <strong>{weeklyCount} {isPt ? "novos" : "new"}</strong>
              {" "}{isPt ? "esta semana" : "this week"}
            </div>
          )}
          <div className="atual-view-toggle" role="group" aria-label={isPt ? "Modo de visualização" : "View mode"}>
            <button
              className={"atual-view-btn" + (viewMode === "mural" ? " is-active" : "")}
              onClick={() => setViewMode("mural")}
              aria-pressed={viewMode === "mural"}
            >
              <GridIcon />
              {isPt ? "Mural" : "Grid"}
            </button>
            <button
              className={"atual-view-btn" + (viewMode === "list" ? " is-active" : "")}
              onClick={() => setViewMode("list")}
              aria-pressed={viewMode === "list"}
            >
              <ListIcon />
              {isPt ? "Linha" : "List"}
            </button>
          </div>
        </div>
      </div>

      {/* Stories rail */}
      <StoryRail counts={counts} lang={lang} />

      {/* Filter bar + search */}
      <div className="atual-filter-bar">
        <div className="atual-filter" role="tablist" aria-label={isPt ? "Filtrar por tipo" : "Filter by type"}>
          {visibleFilters.map((f) => {
            const active = f.id === filter;
            const count = f.id === "all" ? (counts.all ?? initialPosts.length) : (counts[f.id] ?? 0);
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
        <div className="atual-search" aria-label={isPt ? "Pesquisar" : "Search"}>
          <SearchIcon />
          <span className="atual-search-placeholder">{isPt ? "Pesquisar…" : "Search…"}</span>
          <kbd className="atual-search-kbd">⌘K</kbd>
        </div>
      </div>

      {/* Feed */}
      <div style={{ opacity: isPending ? 0.5 : 1, transition: "opacity 0.2s" }}>
        {posts.length === 0 ? (
          <div className="atual-empty">
            {isPt ? "Ainda não há posts deste tipo." : "No posts of this type yet."}
          </div>
        ) : viewMode === "mural" ? (
          <div className="atual-bento">
            {posts.map((p) => <PostCard key={p.id} post={p} lang={lang} />)}
          </div>
        ) : (
          <div className="atual-list-view">
            {posts.map((p) => <PostCard key={p.id} post={p} lang={lang} compact />)}
          </div>
        )}
      </div>

      {/* Load more */}
      <div className="atual-load-more">
        <button className="atual-load-more-btn">
          {isPt ? "Carregar mais ↓" : "Load more ↓"}
        </button>
      </div>
    </>
  );
}
