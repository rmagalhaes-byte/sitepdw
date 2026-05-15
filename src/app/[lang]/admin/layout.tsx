/**
 * pdw-site-v2/src/app/[lang]/admin/layout.tsx
 *
 * Layout para rotas /admin. Adiciona uma faixa amarela visível em
 * todas as páginas dentro de /admin para deixar claro ao operador que
 * está em modo de administração. O gate de auth está no middleware.
 */
import { ReactNode } from "react";

export const dynamic = "force-dynamic"; // nunca cachear admin

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-shell">
      <div className="admin-banner" role="banner">
        <div className="container admin-banner-inner">
          <span className="admin-banner-dot" aria-hidden="true" />
          <span>
            <strong>Modo administração</strong> · acesso restrito · sessão registada
          </span>
          <a href="/" className="admin-banner-exit">
            Sair →
          </a>
        </div>
      </div>
      <div className="container">{children}</div>
    </div>
  );
}
