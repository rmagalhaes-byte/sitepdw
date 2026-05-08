interface TrustBarProps {
  dict: any;
}

export function TrustBar({ dict }: TrustBarProps) {
  return (
    <section className="section-card" style={{ marginTop: 14 }}>
      <strong style={{ display: 'block', marginBottom: '12px' }}>{dict.trustBar.title}</strong>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '20px', 
        alignItems: 'center',
        opacity: 0.8
      }}>
        {dict.trustBar.partners.map((item: string) => (
          <span key={item} style={{ 
            fontSize: '13px', 
            fontWeight: 600,
            background: '#edf2f7',
            padding: '4px 10px',
            borderRadius: '4px'
          }}>{item}</span>
        ))}
      </div>
    </section>
  );
}
