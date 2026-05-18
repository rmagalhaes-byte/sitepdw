"use client";

import { useState, FormEvent } from "react";

export function AdminLoginForm({ lang }: { lang: string }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const r = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });
      if (r.ok) {
        window.location.href = `/${lang}/admin`;
      } else {
        setError(true);
        setPwd("");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "50vh",
    }}>
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{
            display: "inline-block",
            background: "var(--color-primary)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 20,
            letterSpacing: ".05em",
            marginBottom: 16,
          }}>
            ÁREA RESTRITA
          </span>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>
            Acesso ao admin
          </h1>
          <p style={{ color: "var(--color-muted)", fontSize: 14, margin: "8px 0 0" }}>
            Insere a senha de administração para continuar.
          </p>
        </div>

        <form onSubmit={submit} className="admin-card" style={{ padding: 24 }}>
          <label className="admin-field">
            <span>Senha de acesso</span>
            <input
              type="password"
              value={pwd}
              onChange={(e) => { setPwd(e.target.value); setError(false); }}
              autoFocus
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </label>

          {error && (
            <p style={{ color: "#dc2626", fontSize: 13, margin: "8px 0 0" }}>
              Senha incorreta. Tente novamente.
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !pwd.trim()}
            className="admin-btn admin-btn--primary"
            style={{ width: "100%", marginTop: 16 }}
          >
            {loading ? "A verificar…" : "Entrar →"}
          </button>
        </form>
      </div>
    </div>
  );
}
