// pdw-site-v2/src/app/api/public/likes/route.ts
// Like/unlike anónimo. Visitor identity = hash(ip + user-agent + salt).
import { NextRequest, NextResponse } from 'next/server';
import { toggleLike, hashVisitor } from '@/lib/posts-db';

export async function POST(req: NextRequest) {
  const { post_id } = await req.json();
  if (!post_id) return NextResponse.json({ error: 'missing_post_id' }, { status: 400 });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? req.headers.get('x-real-ip')
    ?? '0.0.0.0';
  const ua = req.headers.get('user-agent') ?? '';
  const visitor = hashVisitor(ip, ua);

  const result = toggleLike(Number(post_id), visitor);
  return NextResponse.json(result);
}
