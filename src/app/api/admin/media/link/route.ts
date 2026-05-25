import { NextRequest, NextResponse } from 'next/server';
import { detectEmbed } from '@/lib/embed-parser';
import { addMedia } from '@/lib/posts-db';

export async function POST(req: NextRequest) {
  const cookie = req.cookies.get('pdw_admin')?.value;
  const expected = process.env.PDW_ADMIN_TOKEN;
  const devBypass = process.env.NODE_ENV !== 'production';
  if (!devBypass && (!expected || cookie !== expected)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const { url, slot, alt } = body as { url?: string; slot?: string; alt?: string };
  if (!url?.trim()) return NextResponse.json({ error: 'no_url' }, { status: 400 });

  const detected = detectEmbed(url);
  if (!detected || !['youtube', 'vimeo'].includes(detected.provider ?? '')) {
    return NextResponse.json({ error: 'unsupported_provider', hint: 'Cole um link YouTube ou Vimeo' }, { status: 400 });
  }

  let embedUrl: string;
  let filename: string;
  if (detected.provider === 'youtube') {
    embedUrl = `https://www.youtube.com/embed/${detected.id}`;
    filename = `youtube-${detected.id}`;
  } else {
    embedUrl = `https://player.vimeo.com/video/${detected.id}`;
    filename = `vimeo-${detected.id}`;
  }

  const item = addMedia({
    kind: 'video',
    filename,
    public_path: embedUrl,
    alt: alt ?? null,
    mime: `video/${detected.provider}`,
    size_bytes: null,
    slot: slot ?? null,
  });

  return NextResponse.json({ media: item }, { status: 201 });
}

export const dynamic = 'force-dynamic';
