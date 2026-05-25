// pdw-site-v2/src/app/api/admin/upload/route.ts
// Upload de vídeos / logos / imagens para /public/uploads/<kind>.
// Devolve a entrada de Media gravada na BD.
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { addMedia } from '@/lib/posts-db';

const ALLOWED_KIND = new Set(['video', 'logo', 'image']);
const MAX_BYTES = 200 * 1024 * 1024; // 200 MB

export async function POST(req: NextRequest) {
  const cookie = req.cookies.get('pdw_admin')?.value;
  const expected = process.env.PDW_ADMIN_TOKEN;
  const devBypass = process.env.NODE_ENV !== 'production'
    && req.nextUrl.searchParams.get('admin_dev') === '1';
  if (!devBypass && (!expected || cookie !== expected)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const form = await req.formData();
  const kind = String(form.get('kind') ?? 'image');
  const slot = form.get('slot') ? String(form.get('slot')) : null;
  const alt  = form.get('alt')  ? String(form.get('alt'))  : null;
  const file = form.get('file') as File | null;

  if (!file)                  return NextResponse.json({ error: 'no_file' }, { status: 400 });
  if (!ALLOWED_KIND.has(kind)) return NextResponse.json({ error: 'bad_kind' }, { status: 400 });
  if (file.size > MAX_BYTES)  return NextResponse.json({ error: 'too_large', max: MAX_BYTES }, { status: 413 });

  const dir = path.join(process.cwd(), 'public', 'uploads', kind + 's');
  fs.mkdirSync(dir, { recursive: true });

  const ext  = path.extname(file.name) || '';
  const safe = path.basename(file.name, ext).replace(/[^a-z0-9-_]+/gi, '-').toLowerCase().slice(0, 60);
  const hash = crypto.randomBytes(4).toString('hex');
  const filename = `${safe || 'upload'}-${hash}${ext}`;
  const dest = path.join(dir, filename);
  const buf  = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(dest, buf);

  const item = addMedia({
    kind: kind as any,
    filename,
    public_path: `/uploads/${kind}s/${filename}`,
    alt,
    mime: file.type || null,
    size_bytes: file.size,
    slot,
  });

  return NextResponse.json({ media: item }, { status: 201 });
}

// Aumentar limite do body para uploads grandes
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
