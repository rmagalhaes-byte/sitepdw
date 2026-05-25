import { NextRequest, NextResponse } from 'next/server';
import { listSections } from '@/lib/sections-db';

function requireAdmin(req: NextRequest): NextResponse | null {
  if (process.env.NODE_ENV !== 'production') return null;
  const cookie = req.cookies.get('pdw_admin')?.value;
  const expected = process.env.PDW_ADMIN_TOKEN;
  if (!expected || cookie !== expected) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  return NextResponse.json({ sections: listSections() });
}

export const dynamic = 'force-dynamic';
