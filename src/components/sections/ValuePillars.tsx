interface ValuePillarsProps {
  dict: any;
}

export function ValuePillars({ dict }: ValuePillarsProps) {
  const pillars = [
    {
      title: dict.pillars.privacy.title,
      text: dict.pillars.privacy.text
    },
    {
      title: dict.pillars.compliance.title,
      text: dict.pillars.compliance.text
    },
    {
      title: dict.pillars.education.title,
      text: dict.pillars.education.text
    }
  ];

  return (
    <section style={{ marginTop: 14 }}>
      <div className="grid-3">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="section-card">
            <h3 style={{ margin: "0 0 8px", color: 'var(--color-primary)' }}>{pillar.title}</h3>
            <p style={{ margin: 0, color: "var(--color-muted)", fontSize: '15px', lineHeight: '1.5' }}>{pillar.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
