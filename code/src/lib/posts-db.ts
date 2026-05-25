// pdw-site-v2/src/lib/posts-db.ts
// Acesso a `posts`, `post_likes`, `post_comments`, `media`.
import db from './db';
import crypto from 'crypto';

export type PostType = 'imagem' | 'youtube' | 'spotify' | 'linkedin' | 'instagram' | 'x' | 'evento' | 'pdw';
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'archived';

export interface Post {
  id: number;
  type: PostType;
  title: string;
  excerpt: string | null;
  embed: Record<string, any> | null;
  source_url: string | null;
  status: PostStatus;
  scheduled_at: string | null;
  published_at: string | null;
  pinned: boolean;
  likes_count: number;
  comments_enabled: boolean;
  comments_count: number;
  created_at: string;
  updated_at: string;
  author: string | null;
}

function rowToPost(r: any): Post {
  return {
    id: r.id,
    type: r.type,
    title: r.title,
    excerpt: r.excerpt,
    embed: r.embed_json ? JSON.parse(r.embed_json) : null,
    source_url: r.source_url,
    status: r.status,
    scheduled_at: r.scheduled_at,
    published_at: r.published_at,
    pinned: !!r.pinned,
    likes_count: r.likes_count,
    comments_enabled: !!r.comments_enabled,
    comments_count: r.comments_count,
    created_at: r.created_at,
    updated_at: r.updated_at,
    author: r.author,
  };
}

export interface CreatePostInput {
  type: PostType;
  title: string;
  excerpt?: string;
  embed?: Record<string, any>;
  source_url?: string;
  status?: PostStatus;
  scheduled_at?: string | null;
  pinned?: boolean;
  comments_enabled?: boolean;
  author?: string;
}

export function createPost(input: CreatePostInput): Post {
  const now = new Date().toISOString();
  const status = input.status ?? 'draft';
  const stmt = db.prepare(`
    INSERT INTO posts
      (type, title, excerpt, embed_json, source_url, status, scheduled_at, published_at, pinned, comments_enabled, author, created_at, updated_at)
    VALUES
      (@type, @title, @excerpt, @embed_json, @source_url, @status, @scheduled_at, @published_at, @pinned, @comments_enabled, @author, @now, @now)
  `);
  const info = stmt.run({
    type: input.type,
    title: input.title,
    excerpt: input.excerpt ?? null,
    embed_json: input.embed ? JSON.stringify(input.embed) : null,
    source_url: input.source_url ?? null,
    status,
    scheduled_at: input.scheduled_at ?? null,
    published_at: status === 'published' ? now : null,
    pinned: input.pinned ? 1 : 0,
    comments_enabled: input.comments_enabled ? 1 : 0,
    author: input.author ?? null,
    now,
  });
  return getPost(Number(info.lastInsertRowid))!;
}

export function updatePost(id: number, patch: Partial<CreatePostInput>): Post | null {
  const existing = getPost(id);
  if (!existing) return null;
  const merged: CreatePostInput = {
    type: patch.type ?? existing.type,
    title: patch.title ?? existing.title,
    excerpt: patch.excerpt ?? existing.excerpt ?? undefined,
    embed: patch.embed ?? existing.embed ?? undefined,
    source_url: patch.source_url ?? existing.source_url ?? undefined,
    status: patch.status ?? existing.status,
    scheduled_at: patch.scheduled_at ?? existing.scheduled_at ?? null,
    pinned: patch.pinned ?? existing.pinned,
    comments_enabled: patch.comments_enabled ?? existing.comments_enabled,
    author: patch.author ?? existing.author ?? undefined,
  };
  const now = new Date().toISOString();
  const publishedAt = merged.status === 'published'
    ? (existing.published_at ?? now)
    : null;
  db.prepare(`
    UPDATE posts SET
      type=@type, title=@title, excerpt=@excerpt, embed_json=@embed_json,
      source_url=@source_url, status=@status, scheduled_at=@scheduled_at,
      published_at=@published_at, pinned=@pinned, comments_enabled=@comments_enabled,
      author=@author, updated_at=@now
    WHERE id=@id
  `).run({
    id,
    type: merged.type,
    title: merged.title,
    excerpt: merged.excerpt ?? null,
    embed_json: merged.embed ? JSON.stringify(merged.embed) : null,
    source_url: merged.source_url ?? null,
    status: merged.status,
    scheduled_at: merged.scheduled_at ?? null,
    published_at: publishedAt,
    pinned: merged.pinned ? 1 : 0,
    comments_enabled: merged.comments_enabled ? 1 : 0,
    author: merged.author ?? null,
    now,
  });
  return getPost(id);
}

export function deletePost(id: number): boolean {
  const info = db.prepare(`DELETE FROM posts WHERE id = ?`).run(id);
  return info.changes > 0;
}

export function getPost(id: number): Post | null {
  const r = db.prepare(`SELECT * FROM posts WHERE id = ?`).get(id);
  return r ? rowToPost(r) : null;
}

export interface ListPostsOptions {
  status?: PostStatus | 'all';
  type?: PostType | 'all';
  limit?: number;
  offset?: number;
}

export function listPosts({ status = 'published', type = 'all', limit = 24, offset = 0 }: ListPostsOptions = {}): Post[] {
  const where: string[] = [];
  const params: Record<string, any> = { limit, offset };
  if (status !== 'all') { where.push(`status = @status`); params.status = status; }
  if (type !== 'all')   { where.push(`type = @type`);     params.type   = type; }
  const sql = `
    SELECT * FROM posts
    ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
    ORDER BY pinned DESC,
      COALESCE(published_at, scheduled_at, updated_at) DESC
    LIMIT @limit OFFSET @offset
  `;
  return db.prepare(sql).all(params).map(rowToPost);
}

export function countPostsByType(status: PostStatus | 'all' = 'published'): Record<string, number> {
  const where = status === 'all' ? '' : `WHERE status = '${status}'`;
  const rows = db.prepare(`SELECT type, COUNT(*) c FROM posts ${where} GROUP BY type`).all() as Array<{ type: string; c: number }>;
  const out: Record<string, number> = { all: 0 };
  for (const r of rows) { out[r.type] = r.c; out.all += r.c; }
  return out;
}

// ─── Likes ────────────────────────────────────────────────────────────────
export function hashVisitor(ip: string, ua: string): string {
  const secret = process.env.PDW_LIKES_SECRET ?? 'pdw-default-salt';
  return crypto.createHash('sha256').update(`${secret}:${ip}:${ua}`).digest('hex');
}

export function toggleLike(postId: number, visitorHash: string): { liked: boolean; total: number } {
  const existing = db.prepare(`SELECT id FROM post_likes WHERE post_id=? AND visitor_hash=?`).get(postId, visitorHash);
  const tx = db.transaction((liked: boolean) => {
    if (liked) {
      db.prepare(`DELETE FROM post_likes WHERE post_id=? AND visitor_hash=?`).run(postId, visitorHash);
      db.prepare(`UPDATE posts SET likes_count = MAX(0, likes_count - 1) WHERE id=?`).run(postId);
    } else {
      db.prepare(`INSERT INTO post_likes (post_id, visitor_hash) VALUES (?, ?)`).run(postId, visitorHash);
      db.prepare(`UPDATE posts SET likes_count = likes_count + 1 WHERE id=?`).run(postId);
    }
  });
  tx(!!existing);
  const row = db.prepare(`SELECT likes_count FROM posts WHERE id=?`).get(postId) as { likes_count: number };
  return { liked: !existing, total: row.likes_count };
}

// ─── Media ────────────────────────────────────────────────────────────────
export interface MediaItem {
  id: number;
  kind: 'video' | 'logo' | 'image';
  filename: string;
  public_path: string;
  alt: string | null;
  mime: string | null;
  size_bytes: number | null;
  slot: string | null;
  uses: number;
  created_at: string;
}

export function listMedia(kind?: 'video' | 'logo' | 'image'): MediaItem[] {
  const sql = kind
    ? `SELECT * FROM media WHERE kind=? ORDER BY created_at DESC`
    : `SELECT * FROM media ORDER BY kind, created_at DESC`;
  return (kind ? db.prepare(sql).all(kind) : db.prepare(sql).all()) as MediaItem[];
}

export function addMedia(m: Omit<MediaItem, 'id' | 'created_at' | 'uses'>): MediaItem {
  const info = db.prepare(`
    INSERT INTO media (kind, filename, public_path, alt, mime, size_bytes, slot)
    VALUES (@kind, @filename, @public_path, @alt, @mime, @size_bytes, @slot)
  `).run(m as any);
  return db.prepare(`SELECT * FROM media WHERE id=?`).get(info.lastInsertRowid) as MediaItem;
}

export function deleteMedia(id: number): boolean {
  return db.prepare(`DELETE FROM media WHERE id=?`).run(id).changes > 0;
}
