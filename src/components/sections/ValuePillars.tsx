const pillars = [
  {
    title: "Privacidade e Soberania",
    text: "O utilizador controla os seus dados e partilha apenas o necessario."
  },
  {
    title: "Conformidade Europeia",
    text: "Estruturado para alinhamento com eIDAS 2.0 e arquitetura EUDI."
  },
  {
    title: "Foco na Educacao",
    text: "Primeiro caso de uso com diplomas digitais verificaveis."
  }
];

export function ValuePillars() {
  return (
    <section style={{ marginTop: 14 }}>
      <div className="grid-3">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="section-card">
            <h3 style={{ margin: "0 0 8px" }}>{pillar.title}</h3>
            <p style={{ margin: 0, color: "var(--color-muted)" }}>{pillar.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
