import { NextRequest, NextResponse } from 'next/server';
import { updateSection } from '@/lib/sections-db';
import { revalidatePath } from 'next/cache';

function requireAdmin(req: NextRequest): NextResponse | null {
  if (process.env.NODE_ENV !== 'production') return null;
  const cookie = req.cookies.get('pdw_admin')?.value;
  const expected = process.env.PDW_ADMIN_TOKEN;
  if (!expected || cookie !== expected) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  return null;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  const { key } = await params;
  const body = await req.json().catch(() => ({}));
  const section = updateSection(key, body);
  if (!section) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  revalidatePath('/pt/solucao');
  revalidatePath('/en/solucao');

  return NextResponse.json({ section });
}

export const dynamic = 'force-dynamic';
