const partners = ["Universidade do Minho", "TecMinho", "CCG", "EU Initiative"];

export function TrustBar() {
  return (
    <section className="section-card" style={{ marginTop: 14 }}>
      <strong>Entidades parceiras</strong>
      <div className="simple-list" style={{ marginTop: 8 }}>
        {partners.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}
