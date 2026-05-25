// pdw-site-v2/src/components/atualidades/EmbedRenderer.tsx
// Renderiza o corpo de um post conforme o seu tipo / provider.
// Server-safe: usa iframes oficiais e <Image> do Next quando aplicável.
"use client";

import Image from "next/image";
import type { Post } from "@/lib/posts-db";

const PROVIDER_COLOR: Record<string, string> = {
  pdw: "#006c4b", youtube: "#FF0033", spotify: "#1DB954",
  linkedin: "#0A66C2", instagram: "#E1306C", x: "#000000",
  evento: "#1a3b5d", imagem: "#3d4a42",
};

export function EmbedRenderer({ post }: { post: Post }) {
  const e = post.embed ?? {};
  switch (post.type) {
    case "youtube":
      return (
        <div className="pdw-embed-frame" style={{ aspectRatio: "16/9" }}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${e.videoId}`}
            title={post.title}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: 0, width: "100%", height: "100%", borderRadius: 12 }}
          />
        </div>
      );

    case "spotify": {
      const kind = e.kind ?? "episode";
      return (
        <iframe
          src={`https://open.spotify.com/embed/${kind}/${e.spotifyId}?utm_source=oembed`}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          style={{ border: 0, width: "100%", height: 152, borderRadius: 12 }}
          title={post.title}
        />
      );
    }

    case "linkedin":
      // LinkedIn não tem embed JSON oEmbed estável; usamos preview com link out.
      return (
        <a href={post.source_url ?? "#"} target="_blank" rel="noopener noreferrer"
           className="pdw-embed-card" style={{ borderColor: `${PROVIDER_COLOR.linkedin}22` }}>
          <div className="pdw-embed-card__header">
            <span className="pdw-embed-card__chip" style={{ background: PROVIDER_COLOR.linkedin }}>in</span>
            <div>
              <strong>{e.author ?? "Portuguese Digital Wallet"}</strong>
              <div className="pdw-embed-card__sub">Ver no LinkedIn →</div>
            </div>
          </div>
          {post.excerpt && <p>{post.excerpt}</p>}
        </a>
      );

    case "instagram":
      return (
        <a href={post.source_url ?? "#"} target="_blank" rel="noopener noreferrer"
           className="pdw-embed-card pdw-embed-card--ig">
          <div className="pdw-embed-card__header">
            <span className="pdw-embed-card__chip pdw-embed-card__chip--ig">@</span>
            <strong>{e.author ? `@${e.author}` : "@portuguesedigitalwallet"}</strong>
          </div>
          {post.excerpt && <p>{post.excerpt}</p>}
          <div className="pdw-embed-card__sub">Abrir no Instagram →</div>
        </a>
      );

    case "x":
      return (
        <a href={post.source_url ?? "#"} target="_blank" rel="noopener noreferrer"
           className="pdw-embed-card pdw-embed-card--x">
          <div className="pdw-embed-card__header">
            <span className="pdw-embed-card__chip pdw-embed-card__chip--x">𝕏</span>
            <div>
              <strong>Portuguese Digital Wallet</strong>
              <div className="pdw-embed-card__sub">@{e.author ?? "PDW_PT"}</div>
            </div>
          </div>
          {post.excerpt && <p>{post.excerpt}</p>}
        </a>
      );

    case "evento":
      return (
        <div className="pdw-event-card">
          <div className="pdw-event-card__date">
            <div className="pdw-event-card__month">
              {new Date(e.date_iso).toLocaleDateString("pt-PT", { month: "short" }).toUpperCase()}
            </div>
            <div className="pdw-event-card__day">
              {new Date(e.date_iso).getDate()}
            </div>
            {e.time && <div className="pdw-event-card__time">{e.time}</div>}
          </div>
          <div>
            {e.location && <div className="pdw-event-card__loc">📍 {e.location}</div>}
            {e.rsvp_url && (
              <a href={e.rsvp_url} target="_blank" rel="noopener noreferrer" className="pdw-event-card__rsvp">
                RSVP →
              </a>
            )}
          </div>
        </div>
      );

    case "imagem":
      return e.src ? (
        <figure className="pdw-embed-image">
          <Image src={e.src} alt={e.alt ?? ""} width={1200} height={800} style={{ width: "100%", height: "auto", borderRadius: 12 }} />
          {e.caption && <figcaption>{e.caption}</figcaption>}
        </figure>
      ) : null;

    case "pdw":
      return (
        <div className="pdw-release-card">
          <span className="pdw-release-card__eyebrow">Release oficial</span>
          <div className="pdw-release-card__version">v{e.version}</div>
          {e.body_md && <p>{e.body_md}</p>}
        </div>
      );

    default:
      return null;
  }
}
