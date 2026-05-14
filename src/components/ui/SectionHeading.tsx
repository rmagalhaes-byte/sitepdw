type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div style={{ marginBottom: 14 }}>
      <h2 style={{ margin: "0 0 6px" }}>{title}</h2>
      {subtitle ? <p style={{ margin: 0, color: "var(--color-muted)" }}>{subtitle}</p> : null}
    </div>
  );
}
