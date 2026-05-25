import db from './db';

export interface Lead {
  id: number;
  name: string;
  institution: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
}

export function listLeads(limit = 1000, offset = 0): Lead[] {
  return db
    .prepare(`SELECT * FROM leads ORDER BY created_at DESC LIMIT ? OFFSET ?`)
    .all(limit, offset) as Lead[];
}

export function countLeads(): number {
  const row = db.prepare(`SELECT COUNT(*) as n FROM leads`).get() as { n: number };
  return row.n;
}
