"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import "./LeadForm.css";

const leadSchema = z.object({
  name:        z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  institution: z.string().min(2, "Instituição deve ter pelo menos 2 caracteres"),
  email:       z.string().email("Email inválido"),
  subject:     z.string().optional(),
  message:     z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface LeadFormSectionProps {
  dict: any;
  initialEmail?: string;
}

export function LeadFormSection({ dict, initialEmail }: LeadFormSectionProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { email: initialEmail ?? "" },
  });

  const nameValue = watch("name");
  const institutionValue = watch("institution");

  const onSubmit = async (data: LeadFormValues) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setSubmitError(json.error ?? "Erro ao enviar. Tente novamente.");
        return;
      }
      setIsSubmitted(true);
    } catch {
      setSubmitError("Sem ligação ao servidor. Tente novamente.");
    }
  };

  if (isSubmitted) {
    // Logic moved inside main return to preserve layout
  }

  const inputStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    padding: 12,
    marginTop: 4,
    borderRadius: 8,
    border: "1px solid var(--color-border)",
    boxSizing: "border-box",
  };

  const errorStyle: React.CSSProperties = {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
  };

  const statusLabel = isSubmitted 
    ? (dict.contacts.form.statusVerified || "Status: Verificado") 
    : isSubmitting 
      ? (dict.contacts.form.statusSending || "Status: A processar...") 
      : (dict.contacts.form.statusWaiting || "Status: Aguardando Submissão");

  return (
    <section className="section-card" style={{ marginTop: 16 }}>
      <div className="lead-form-container">
        <div className="form-content">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="success-message-inner"
            >
              <div style={{ marginBottom: "20px", color: "var(--color-primary)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h3>Olá {nameValue || "ali"}!</h3>
              <p style={{ color: "var(--color-muted)", marginBottom: "24px" }}>
                A sua jornada com a <strong>Portuguese Digital Wallet</strong> começou.
                O pedido para a <strong>{institutionValue || "sua instituição"}</strong> foi registado.
              </p>
              <button className="cta btn-secondary" onClick={() => setIsSubmitted(false)}>
                Enviar outra mensagem
              </button>
            </motion.div>
          ) : (
            <>
              <h3 style={{ marginTop: 0 }}>{dict.contacts.heading.title}</h3>
              <p style={{ color: "var(--color-muted)", marginBottom: 24 }}>
                {dict.contacts.invite}
              </p>

              <form className="simple-list" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <label style={{ display: "block" }}>
                    {dict.contacts.form.name}
                    <input type="text" style={inputStyle} {...register("name")} placeholder="Seu nome completo" />
                    {errors.name && <span style={errorStyle}>{errors.name.message}</span>}
                  </label>
                  <label style={{ display: "block" }}>
                    {dict.contacts.form.institution}
                    <input type="text" style={inputStyle} {...register("institution")} placeholder="Nome da organização" />
                    {errors.institution && <span style={errorStyle}>{errors.institution.message}</span>}
                  </label>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: 12 }}>
                  <label style={{ display: "block" }}>
                    {dict.contacts.form.email}
                    <input type="email" style={inputStyle} {...register("email")} placeholder="exemplo@instituicao.pt" />
                    {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
                  </label>
                  <label style={{ display: "block" }}>
                    {dict.contacts.form.subject}
                    <input type="text" style={inputStyle} {...register("subject")} placeholder="Assunto (opcional)" />
                  </label>
                </div>

                <label style={{ display: "block", marginTop: 12 }}>
                  {dict.contacts.form.message}
                  <textarea
                    rows={4}
                    style={{ ...inputStyle, resize: "vertical" }}
                    {...register("message")}
                    placeholder="Como podemos colaborar?"
                  />
                  {errors.message && <span style={errorStyle}>{errors.message.message}</span>}
                </label>

                {submitError && (
                  <p style={{ color: "#ef4444", fontSize: 14, marginTop: 8 }}>{submitError}</p>
                )}

                <button
                  type="submit"
                  className="cta cta-disruptive"
                  disabled={isSubmitting}
                  style={{ width: "fit-content", marginTop: 20, padding: "14px 32px", cursor: isSubmitting ? "wait" : "pointer" }}
                >
                  {isSubmitting ? "A enviar…" : dict.contacts.form.submit}
                </button>
              </form>
            </>
          )}
        </div>

        <div className="form-preview">
          <div className={`pdw-badge-preview ${isSubmitted ? 'verified' : ''}`}>
            <div className="badge-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              PDW Preview Pass
            </div>
            <div className="badge-name">{nameValue || "Seu Nome"}</div>
            <div className="badge-institution">{institutionValue || "Instituição"}</div>
            <div className="badge-status">
              {isSubmitted && (
                <svg style={{ marginRight: 6 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              )}
              {statusLabel}
            </div>
            <div className="badge-footer">
              Generated by Portuguese Digital Wallet Infrastructure
            </div>
            {isSubmitted && <div className="badge-verified-seal">OFFICIAL</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
