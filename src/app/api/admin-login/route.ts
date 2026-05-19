import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const expected = process.env.PDW_ADMIN_TOKEN;

  if (!expected || password !== expected) {
    return NextResponse.json({ error: 'invalid_password' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set('pdw_admin', expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: '/',
  });
  return res;
}
