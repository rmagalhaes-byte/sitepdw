// pdw-site-v2/src/app/api/admin/embed/route.ts
// Recebe um URL, detecta provider e tenta enriquecer com título/duração via
// oEmbed público. Usado pelo /admin para a pré-visualização ao colar um link.
import { NextRequest, NextResponse } from 'next/server';
import { detectEmbed, enrichEmbed } from '@/lib/embed-parser';

export async function POST(req: NextRequest) {
  // Auth check (igual aos outros endpoints admin)
  const cookie = req.cookies.get('pdw_admin')?.value;
  const expected = process.env.PDW_ADMIN_TOKEN;
  const devBypass = process.env.NODE_ENV !== 'production'
    && req.nextUrl.searchParams.get('admin_dev') === '1';
  if (!devBypass && (!expected || cookie !== expected)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const { url } = await req.json();
  const detected = detectEmbed(url);
  if (!detected) return NextResponse.json({ provider: null });
  const enriched = await enrichEmbed(detected);
  return NextResponse.json(enriched);
}
