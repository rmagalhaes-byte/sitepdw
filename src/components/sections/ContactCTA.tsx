"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n/config";

interface ContactCTAProps {
  lang: Locale;
  dict: any;
}

export function ContactCTA({ lang, dict }: ContactCTAProps) {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    router.push(`/${lang}/contactos?email=${encodeURIComponent(email.trim())}`);
  };

  return (
    <section className="section-card" style={{ marginTop: 16, textAlign: "center" }}>
      <h2 style={{ margin: "0 0 10px", fontSize: "clamp(1.4rem, 3vw, 1.9rem)" }}>
        {dict.contactCTA.title}
      </h2>
      <p style={{ color: "var(--color-muted)", margin: "0 auto 28px", maxWidth: 480, lineHeight: 1.6 }}>
        {dict.contactCTA.subtitle}
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: 520,
          margin: "0 auto",
        }}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={dict.contactCTA.placeholder}
          style={{
            flex: "1 1 260px",
            padding: "13px 16px",
            borderRadius: 8,
            border: "1px solid var(--color-border)",
            background: "var(--color-surface, var(--color-bg))",
            color: "var(--color-text)",
            fontSize: 15,
            outline: "none",
          }}
        />
        <button
          type="submit"
          className="cta cta-disruptive"
          style={{
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: "14px",
            padding: "13px 28px",
            whiteSpace: "nowrap",
          }}
        >
          {dict.contactCTA.button}
        </button>
      </form>
    </section>
  );
}
