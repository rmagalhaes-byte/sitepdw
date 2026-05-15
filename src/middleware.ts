/**
 * pdw-site-v2/src/middleware.ts
 *
 * Gate de auth para `/admin`. Estratégia em duas fases:
 *
 *  FASE 1 (curto prazo, para testes internos):
 *    Cookie httpOnly `pdw_admin` com valor partilhado.
 *    Cria-se manualmente via /api/admin/login (não incluído aqui,
 *    fácil de adicionar com email allowlist + magic link).
 *
 *  FASE 2 (médio prazo, recomendado):
 *    Substituir pela integração NextAuth (Google + email allowlist
 *    @uminho.pt / @tecminho.uminho.pt). Trocar a chamada
 *    `getSession()` no exemplo abaixo pela do NextAuth.
 *
 * IMPORTANTE: este middleware respeita os locales — `/pt/admin` e
 * `/en/admin` ambos passam pelo gate. Em DEV (NODE_ENV !== production)
 * permite passagem com `?admin_dev=1` para facilitar testes locais.
 */
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // O matcher abaixo só envia paths /pt/admin* e /en/admin* aqui.
  // Confirmação extra por segurança:
  if (!/^\/(pt|en)\/admin(\/|$)/.test(pathname)) return NextResponse.next();

  // ── DEV bypass ────────────────────────────────────────────────────────────
  if (
    process.env.NODE_ENV !== "production" &&
    searchParams.get("admin_dev") === "1"
  ) {
    return NextResponse.next();
  }

  // ── FASE 1: cookie partilhado ─────────────────────────────────────────────
  // Configurar AUTH_TOKEN no .env.local
  // Set-Cookie: pdw_admin=<AUTH_TOKEN>; HttpOnly; Secure; SameSite=Strict
  const cookie = req.cookies.get("pdw_admin")?.value;
  const expected = process.env.PDW_ADMIN_TOKEN;

  if (expected && cookie === expected) {
    return NextResponse.next();
  }

  // ── Não autenticado ───────────────────────────────────────────────────────
  // Redireciona para a home no idioma correto.
  const lang = pathname.split("/")[1] || "pt";
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}`;
  url.searchParams.set("admin_denied", "1");
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/pt/admin/:path*", "/en/admin/:path*"],
};
