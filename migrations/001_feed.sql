-- pdw-site-v2/migrations/001_feed.sql
-- Esquema para o feed de atualidades + media library.
-- Executar uma vez via `npm run migrate` (script novo no package.json).

CREATE TABLE IF NOT EXISTS posts (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  type             TEXT NOT NULL CHECK (type IN ('imagem','youtube','spotify','linkedin','instagram','x','evento','pdw')),
  title            TEXT NOT NULL,
  excerpt          TEXT,
  -- Embed payload (JSON serializado): provider-specific.
  -- Ex.: youtube → { videoId, duration, title, thumbnail }
  --      spotify → { kind: 'episode'|'show'|'playlist', id }
  --      linkedin/instagram/x → { url, author }
  --      evento  → { date_iso, time, location, rsvp_url }
  --      imagem  → { src, alt, caption }
  --      pdw     → { version, body_md }
  embed_json       TEXT,
  source_url       TEXT,           -- URL original colado pelo admin
  -- Estado
  status           TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','scheduled','published','archived')),
  scheduled_at     TEXT,           -- ISO 8601, NULL se publicado de imediato
  published_at     TEXT,
  pinned           INTEGER NOT NULL DEFAULT 0 CHECK (pinned IN (0,1)),
  -- Engagement
  likes_count      INTEGER NOT NULL DEFAULT 0,
  comments_enabled INTEGER NOT NULL DEFAULT 0 CHECK (comments_enabled IN (0,1)),
  comments_count   INTEGER NOT NULL DEFAULT 0,
  -- Auditoria
  created_at       TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at       TEXT NOT NULL DEFAULT (datetime('now')),
  author           TEXT
);

CREATE INDEX IF NOT EXISTS idx_posts_status_published_at
  ON posts(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_type
  ON posts(type);

-- Likes (anónimos, identidade visitante por hash IP+UA)
CREATE TABLE IF NOT EXISTS post_likes (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id       INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  visitor_hash  TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(post_id, visitor_hash)
);
CREATE INDEX IF NOT EXISTS idx_post_likes_post ON post_likes(post_id);

-- Comentários (fase 2; tabela pronta, UI desligada por defeito)
CREATE TABLE IF NOT EXISTS post_comments (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id       INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_name   TEXT NOT NULL,
  author_email  TEXT,             -- só para notificação ao admin, nunca exibido
  body          TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','spam')),
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_post_comments_post_status ON post_comments(post_id, status);

-- Biblioteca de media (vídeos, logos, imagens carregadas pelo admin)
CREATE TABLE IF NOT EXISTS media (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  kind         TEXT NOT NULL CHECK (kind IN ('video','logo','image')),
  filename     TEXT NOT NULL,    -- nome final no disco
  public_path  TEXT NOT NULL,    -- ex.: /uploads/videos/demo-90s.mp4
  alt          TEXT,
  mime         TEXT,
  size_bytes   INTEGER,
  slot         TEXT,             -- para logos: 'header'|'footer-partners'|'trustbar'|'funders'
  -- contagem de uso (incrementada quando referenciado em posts ou config)
  uses         INTEGER NOT NULL DEFAULT 0,
  created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_media_kind_slot ON media(kind, slot);
