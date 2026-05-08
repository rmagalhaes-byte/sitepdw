interface LeadFormSectionProps {
  dict: any;
}

export function LeadFormSection({ dict }: LeadFormSectionProps) {
  return (
    <section className="section-card" style={{ marginTop: 16 }}>
      <h3 style={{ marginTop: 0 }}>{dict.contacts.heading.title}</h3>
      <p style={{ color: "var(--color-muted)" }}>
        {dict.contacts.invite}
      </p>
      <form className="simple-list">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <label style={{ display: 'block' }}>
            {dict.contacts.form.name}
            <input type="text" name="name" style={{ display: "block", width: "100%", padding: 8, marginTop: 4, borderRadius: 4, border: '1px solid var(--color-border)' }} required />
          </label>
          <label style={{ display: 'block' }}>
            {dict.contacts.form.institution}
            <input
              type="text"
              name="institution"
              style={{ display: "block", width: "100%", padding: 8, marginTop: 4, borderRadius: 4, border: '1px solid var(--color-border)' }}
              required
            />
          </label>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: 12 }}>
          <label style={{ display: 'block' }}>
            {dict.contacts.form.email}
            <input type="email" name="email" style={{ display: "block", width: "100%", padding: 8, marginTop: 4, borderRadius: 4, border: '1px solid var(--color-border)' }} required />
          </label>
          <label style={{ display: 'block' }}>
            {dict.contacts.form.subject}
            <input type="text" name="subject" style={{ display: "block", width: "100%", padding: 8, marginTop: 4, borderRadius: 4, border: '1px solid var(--color-border)' }} />
          </label>
        </div>
        <label style={{ display: 'block', marginTop: 12 }}>
          {dict.contacts.form.message}
          <textarea name="message" rows={4} style={{ display: "block", width: "100%", padding: 8, marginTop: 4, borderRadius: 4, border: '1px solid var(--color-border)', resize: 'vertical' }} required></textarea>
        </label>
        <button type="submit" className="cta" style={{ width: "fit-content", marginTop: 12, padding: '12px 24px', cursor: 'pointer' }}>
          {dict.contacts.form.submit}
        </button>
      </form>
    </section>
  );
}
