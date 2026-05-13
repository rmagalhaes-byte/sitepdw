"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LeadForm.css";

interface LeadFormSectionProps {
  dict: any;
}

export function LeadFormSection({ dict }: LeadFormSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section className="section-card success-message-container">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12 }}
        >
          <div style={{ marginBottom: '24px', color: 'var(--color-primary)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 3-3 1.5 1.5L6 21Z"/><path d="M9.5 15.5 8 14l5-5 1.5 1.5Z"/><path d="M11.5 13.5 14 11l5-5 1.5 1.5-5 5-2.5 2.5Z"/><path d="m15.5 9.5 1-1 3-3L21 7l-3 3-1 1Z"/><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="M9 21v-3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3"/></svg>
          </div>
          <h3 style={{ color: 'var(--color-primary)' }}>
            Olá {formData.name || "ali"}!
          </h3>
          <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'var(--color-muted)', maxWidth: '500px', margin: '0 auto 32px' }}>
            A sua jornada com a <strong>Portuguese Digital Wallet</strong> começou. 
            O pedido para a <strong>{formData.institution || "sua instituição"}</strong> foi registado com segurança. 
            Fale em breve com a nossa equipa.
          </p>
          <button 
            className="cta" 
            onClick={() => setIsSubmitted(false)}
            style={{ padding: '12px 32px' }}
          >
            Fechar
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="section-card" style={{ marginTop: 16 }}>
      <div className="lead-form-container">
        <div className="form-content">
          <h3 style={{ marginTop: 0 }}>{dict.contacts.heading.title}</h3>
          <p style={{ color: "var(--color-muted)", marginBottom: 24 }}>
            {dict.contacts.invite}
          </p>
          
          <form className="simple-list" onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <label style={{ display: 'block' }}>
                {dict.contacts.form.name}
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  style={{ display: "block", width: "100%", padding: 12, marginTop: 4, borderRadius: 8, border: '1px solid var(--color-border)' }} 
                  required 
                />
              </label>
              <label style={{ display: 'block' }}>
                {dict.contacts.form.institution}
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  style={{ display: "block", width: "100%", padding: 12, marginTop: 4, borderRadius: 8, border: '1px solid var(--color-border)' }}
                  required
                />
              </label>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: 12 }}>
              <label style={{ display: 'block' }}>
                {dict.contacts.form.email}
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  style={{ display: "block", width: "100%", padding: 12, marginTop: 4, borderRadius: 8, border: '1px solid var(--color-border)' }} 
                  required 
                />
              </label>
              <label style={{ display: 'block' }}>
                {dict.contacts.form.subject}
                <input 
                  type="text" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  style={{ display: "block", width: "100%", padding: 12, marginTop: 4, borderRadius: 8, border: '1px solid var(--color-border)' }} 
                />
              </label>
            </div>
            
            <label style={{ display: 'block', marginTop: 12 }}>
              {dict.contacts.form.message}
              <textarea 
                name="message" 
                rows={4} 
                value={formData.message}
                onChange={handleChange}
                style={{ display: "block", width: "100%", padding: 12, marginTop: 4, borderRadius: 8, border: '1px solid var(--color-border)', resize: 'vertical' }} 
                required
              ></textarea>
            </label>
            
            <button type="submit" className="cta" style={{ width: "fit-content", marginTop: 20, padding: '14px 32px', cursor: 'pointer' }}>
              {dict.contacts.form.submit}
            </button>
          </form>
        </div>

        <div className="form-preview">
          <div className="pdw-badge-preview">
            <div className="badge-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              PDW Preview Pass
            </div>
            <div className="badge-name">{formData.name || "Seu Nome"}</div>
            <div className="badge-institution">{formData.institution || "Instituição"}</div>
            <div className="badge-status">Status: Aguardando Submissão</div>
            <div style={{ marginTop: '12px', fontSize: '10px', opacity: 0.5 }}>
              Generated by Portuguese Digital Wallet Infrastructure
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
