// pdw-site-v2/src/lib/embed-parser.ts
// Detecta o provider a partir de um URL colado no admin e extrai metadata
// determinística (videoId, postId, etc.). Sem chamadas de rede — tudo regex.
// Para enriquecer com título/thumbnail/duração, ver enrich() que faz oEmbed
// best-effort (silenciosamente cai para fallback).

export type Provider =
  | 'youtube'
  | 'spotify'
  | 'linkedin'
  | 'instagram'
  | 'x'
  | 'vimeo'
  | null;

export interface DetectedEmbed {
  provider: Provider;
  /** Identificador canónico (videoId, postId, etc.) */
  id?: string;
  /** Tipo dentro do provider (ex.: spotify episode|show|playlist) */
  kind?: string;
  /** URL canónico (limpo de query params de tracking) */
  canonicalUrl: string;
  /** Payload livre para guardar em embed_json */
  payload: Record<string, any>;
}

const PATTERNS: Array<{ provider: Exclude<Provider, null>; regex: RegExp; build: (m: RegExpMatchArray) => DetectedEmbed }> = [
  {
    provider: 'youtube',
    regex: /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i,
    build: (m) => ({
      provider: 'youtube',
      id: m[1],
      canonicalUrl: `https://www.youtube.com/watch?v=${m[1]}`,
      payload: { videoId: m[1], thumbnail: `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg` },
    }),
  },
  {
    provider: 'spotify',
    regex: /open\.spotify\.com\/(episode|show|track|album|playlist)\/([A-Za-z0-9]+)/i,
    build: (m) => ({
      provider: 'spotify',
      id: m[2],
      kind: m[1].toLowerCase(),
      canonicalUrl: `https://open.spotify.com/${m[1]}/${m[2]}`,
      payload: { kind: m[1].toLowerCase(), spotifyId: m[2] },
    }),
  },
  {
    provider: 'linkedin',
    regex: /linkedin\.com\/(?:posts|feed\/update)\/([\w:-]+)/i,
    build: (m) => ({
      provider: 'linkedin',
      id: m[1],
      canonicalUrl: m.input!.split('?')[0],
      payload: { url: m.input!.split('?')[0], postId: m[1] },
    }),
  },
  {
    provider: 'instagram',
    regex: /instagram\.com\/(?:p|reel)\/([\w-]+)/i,
    build: (m) => ({
      provider: 'instagram',
      id: m[1],
      canonicalUrl: `https://www.instagram.com/p/${m[1]}/`,
      payload: { postId: m[1] },
    }),
  },
  {
    provider: 'x',
    regex: /(?:twitter|x)\.com\/([^/]+)\/status\/(\d+)/i,
    build: (m) => ({
      provider: 'x',
      id: m[2],
      canonicalUrl: `https://x.com/${m[1]}/status/${m[2]}`,
      payload: { author: m[1], tweetId: m[2] },
    }),
  },
  {
    provider: 'vimeo',
    regex: /vimeo\.com\/(\d+)/i,
    build: (m) => ({
      provider: 'vimeo',
      id: m[1],
      canonicalUrl: `https://vimeo.com/${m[1]}`,
      payload: { videoId: m[1] },
    }),
  },
];

export function detectEmbed(url: string): DetectedEmbed | null {
  const cleaned = url.trim();
  if (!cleaned) return null;
  for (const p of PATTERNS) {
    const m = cleaned.match(p.regex);
    if (m) {
      // attach .input for handlers that need the full url
      (m as any).input = cleaned;
      return p.build(m);
    }
  }
  return null;
}

/**
 * Tenta enriquecer com título/thumbnail/duração via oEmbed público.
 * Sem dependências externas — usa fetch nativo. Best-effort, falha silenciosa.
 */
export async function enrichEmbed(detected: DetectedEmbed): Promise<DetectedEmbed> {
  try {
    let oembedUrl: string | null = null;
    if (detected.provider === 'youtube') {
      oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(detected.canonicalUrl)}&format=json`;
    } else if (detected.provider === 'spotify') {
      oembedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(detected.canonicalUrl)}`;
    } else if (detected.provider === 'vimeo') {
      oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(detected.canonicalUrl)}`;
    }
    if (!oembedUrl) return detected;
    const res = await fetch(oembedUrl, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return detected;
    const data = await res.json();
    return {
      ...detected,
      payload: {
        ...detected.payload,
        title: data.title,
        author: data.author_name,
        thumbnail: data.thumbnail_url ?? detected.payload.thumbnail,
        duration: data.duration ?? detected.payload.duration,
        html: data.html, // útil para Spotify (player embebido), opcional para outros
      },
    };
  } catch {
    return detected;
  }
}
