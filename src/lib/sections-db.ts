import db from './db';

export interface SiteSection {
  key: string;
  enabled: boolean;
  content: Record<string, any> | null;
  updated_at: string;
}

function rowToSection(r: any): SiteSection {
  return {
    key: r.key,
    enabled: !!r.enabled,
    content: r.content_json ? JSON.parse(r.content_json) : null,
    updated_at: r.updated_at,
  };
}

export function listSections(): SiteSection[] {
  return (db.prepare(`SELECT * FROM site_sections ORDER BY key`).all() as any[]).map(rowToSection);
}

export function getSection(key: string): SiteSection | null {
  const r = db.prepare(`SELECT * FROM site_sections WHERE key = ?`).get(key) as any;
  return r ? rowToSection(r) : null;
}

export function getSectionEnabled(key: string): boolean {
  const r = db.prepare(`SELECT enabled FROM site_sections WHERE key = ?`).get(key) as any;
  return r ? !!r.enabled : true;
}

export function getSectionContent<T = Record<string, any>>(key: string): T | null {
  const r = db.prepare(`SELECT content_json FROM site_sections WHERE key = ?`).get(key) as any;
  if (!r?.content_json) return null;
  return JSON.parse(r.content_json) as T;
}

export function updateSection(
  key: string,
  patch: { enabled?: boolean; content?: Record<string, any> | null }
): SiteSection | null {
  const existing = getSection(key);
  if (!existing) return null;
  const now = new Date().toISOString();
  const enabled = patch.enabled !== undefined ? (patch.enabled ? 1 : 0) : (existing.enabled ? 1 : 0);
  const content_json = 'content' in patch
    ? (patch.content ? JSON.stringify(patch.content) : null)
    : (existing.content ? JSON.stringify(existing.content) : null);
  db.prepare(`
    UPDATE site_sections SET enabled = ?, content_json = ?, updated_at = ? WHERE key = ?
  `).run(enabled, content_json, now, key);
  return getSection(key);
}
