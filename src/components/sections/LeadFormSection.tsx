export function LeadFormSection() {
  return (
    <section className="section-card" style={{ marginTop: 16 }}>
      <h3 style={{ marginTop: 0 }}>Iniciar parceria institucional</h3>
      <p style={{ color: "var(--color-muted)" }}>
        Preencha com email institucional e a equipa entra em contacto.
      </p>
      <form className="simple-list">
        <label>
          Nome
          <input type="text" name="name" style={{ display: "block", width: "100%", padding: 8 }} />
        </label>
        <label>
          Instituicao
          <input
            type="text"
            name="institution"
            style={{ display: "block", width: "100%", padding: 8 }}
          />
        </label>
        <label>
          Email institucional
          <input type="email" name="email" style={{ display: "block", width: "100%", padding: 8 }} />
        </label>
        <button type="submit" className="cta" style={{ width: "fit-content" }}>
          Solicitar contacto
        </button>
      </form>
    </section>
  );
}
