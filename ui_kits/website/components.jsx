// PDW Website UI kit — components exported to window
// Loaded after React + Babel via <script type="text/babel" src="components.jsx"></script>

const { useState, useEffect } = React;

// ---------- Tiny SVG icon set (Lucide-style, stroke 2) ----------
const Icon = ({ name, size = 20, ...rest }) => {
  const common = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: 2,
    strokeLinecap: "round", strokeLinejoin: "round",
    ...rest,
  };
  switch (name) {
    case "mapPin":   return (<svg {...common}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>);
    case "mail":     return (<svg {...common}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>);
    case "play":     return (<svg {...common}><polygon points="5 3 19 12 5 21 5 3"/></svg>);
    case "linkedin": return (<svg {...common}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>);
    case "instagram":return (<svg {...common}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>);
    case "users":    return (<svg {...common}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
    case "moon":     return (<svg {...common}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>);
    case "sun":      return (<svg {...common}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>);
    case "menu":     return (<svg {...common}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>);
    case "x":        return (<svg {...common}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);
    case "check":    return (<svg {...common}><polyline points="20 6 9 17 4 12"/></svg>);
    case "checkCircle": return (<svg {...common}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
    case "graduation": return (<svg {...common}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>);
    default: return null;
  }
};

// ---------- Header ----------
// Production header. NOTE: the v1.x version badge that used to live here is
// MVP-only and has been moved to a hidden /admin route (see README).
function PdwHeader({ active, onNav }) {
  const items = [
    { key: "home", label: "Início" },
    { key: "sobre", label: "Sobre" },
    { key: "solucao", label: "Solução" },
    { key: "casos", label: "Casos de Uso" },
    { key: "atualidades", label: "Atualidades" },
    { key: "contactos", label: "Contactos" },
  ];
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" onClick={() => onNav("home")} style={{cursor: 'pointer'}}>
          <div className="brand-logo-wrapper">
            <img src="../../assets/pdw_logo.png" alt="PDW" width="32" height="32" className="brand-logo"/>
            <span>Portuguese Digital Wallet</span>
          </div>
        </a>
        <nav className="nav" aria-label="Navegação principal">
          {items.map(it => (
            <a key={it.key} className={active === it.key ? "active" : ""} onClick={() => onNav(it.key)}>{it.label}</a>
          ))}
        </nav>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <span className="lang" title="Alternar idioma">EN</span>
          <button className="cta">Obter a App</button>
        </div>
      </div>
    </header>
  );
}

// ---------- Hero ----------
function HeroInstitutional({ onPlayDemo }) {
  return (
    <section className="hero hero-editorial">
      <div className="hero-bg-grid" aria-hidden="true"></div>
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" aria-hidden="true"></span>
          Em produção · Agenda Blockchain.PT
        </div>
        <h1>
          <span className="hero-title-line">Acesso a serviços digitais</span>
          <span className="hero-title-accent">sem fricção.</span>
        </h1>
        <p className="hero-subtitle">
          As suas credenciais. Um clique. Qualquer serviço, em toda a Europa.
        </p>
        <p className="hero-description">
          A PDW é a camada de execução de credenciais verificáveis do Estado português.
          Elimina formulários, processos repetitivos e fraude documental — com privacidade
          por desenho e validade jurídica em toda a União Europeia.
        </p>
        <div className="btn-row">
          <button className="cta cta-disruptive" onClick={onPlayDemo}>
            <Icon name="play" size={14}/> Ver vídeo conceito
          </button>
          <a className="btn-secondary">Falar com a equipa →</a>
        </div>
        <dl className="hero-mini-stats">
          <div>
            <dt>72,9 M€</dt>
            <dd>Investimento total<br/>do consórcio</dd>
          </div>
          <div>
            <dt>27</dt>
            <dd>Estados-Membros<br/>de reconhecimento</dd>
          </div>
          <div>
            <dt>−90 %</dt>
            <dd>Tempo de<br/>verificação académica</dd>
          </div>
        </dl>
      </div>
      <div className="hero-image-frame">
        <img src="../../assets/Imagem-home.png" alt="Diploma universitário digital exibido na aplicação PDW"/>
        <div className="hero-image-caption">
          <span className="hero-image-caption-dot" aria-hidden="true"></span>
          <span>Diploma da Universidade do Minho · verificado em 1,2 s</span>
        </div>
      </div>
    </section>
  );
}

// ---------- Video modal (concept video) ----------
function VideoModal({ open, onClose }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="video-modal-overlay" onClick={onClose} role="dialog" aria-label="Vídeo conceito PDW">
      <div className="video-modal" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose} aria-label="Fechar vídeo">
          <Icon name="x" size={20}/>
        </button>
        <video
          src="../../assets/concept_video.mp4"
          controls
          autoPlay
          playsInline
          className="video-modal-player"
        />
        <div className="video-modal-caption">
          Vídeo conceito · Portuguese Digital Wallet
        </div>
      </div>
    </div>
  );
}

// ---------- Trust bar ----------
function TrustBar() {
  const partners = [
    { name: "Universidade do Minho", logo: "../../assets/uminho_logo.png", url: "https://www.uminho.pt/PT" },
    { name: "TecMinho", logo: "../../assets/tcminho-logo.png", url: "https://www.tecminho.uminho.pt/" },
    { name: "Agenda Blockchain.PT", logo: "../../assets/logo-Blockchain-pt.png", url: "https://blockchain.pt" },
    { name: "VOID Software", logo: "../../assets/logo-void.png", url: "https://void.software/" },
    { name: "EBSI", logo: "../../assets/logo-ebsi.png", url: "https://hub.ebsi.eu/", boosted: true },
  ];
  return (
    <section className="section-card trust-bar-section">
      <strong className="trust-bar-label">Parceiros do ecossistema</strong>
      <div className="trust-bar-logos">
        {partners.map(p => (
          <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="trust-logo-link" title={p.name}>
            <img src={p.logo} alt={p.name} className={`trust-logo-img${p.boosted ? ' trust-logo-img--boosted' : ''}`}/>
          </a>
        ))}
      </div>
    </section>
  );
}

// ---------- Value pillars (editorial · isométrico + 3 valores) ----------
function ValuePillars() {
  const pillars = [
    {
      tag: "01",
      title: "Privacidade por desenho",
      text: "Os seus dados são processados localmente no dispositivo. Você decide o que partilha, com quem e durante quanto tempo. Nada sai sem consentimento explícito.",
    },
    {
      tag: "02",
      title: "Conformidade europeia",
      text: "Alinhada com eIDAS 2.0, EBSI e EUDI ARF — garante validade jurídica e reconhecimento em todos os 27 Estados-Membros da União Europeia.",
    },
    {
      tag: "03",
      title: "Soberania digital",
      text: "Infraestrutura nacional crítica, coordenada pela TecMinho. Portugal mantém o controlo da camada de execução de credenciais — sem dependência externa.",
    },
  ];
  return (
    <section className="pillars-editorial">
      <div className="pillars-visual">
        <img src="../../assets/Imagem-isometrica.png" alt="Aplicação PDW com camadas de privacidade, conformidade e educação" loading="lazy"/>
      </div>
      <div className="pillars-content">
        <header className="pillars-header">
          <span className="pillars-eyebrow">Os três pilares da PDW</span>
          <h2 className="pillars-title">Construída sobre três decisões não-negociáveis.</h2>
        </header>
        <ol className="pillars-list">
          {pillars.map(p => (
            <li key={p.tag} className="pillars-item">
              <div className="pillars-item-tag">{p.tag}</div>
              <div className="pillars-item-body">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ---------- Editorial pull quote (Fase 2) ----------
// Full-bleed dark section between TrustBar and Pillars on home.
// Uses the negative-margin trick to break out of the container.
function PullQuote() {
  return (
    <section className="pullquote-full">
      <div className="pullquote-inner">
        <div className="pullquote-figure">
          <div className="pullquote-figure-num">10%</div>
          <div className="pullquote-figure-lbl">do PIB global<br/>em blockchain até 2027</div>
        </div>
        <div className="pullquote-body">
          <svg className="pullquote-mark" width="56" height="42" viewBox="0 0 80 60" fill="none" aria-hidden="true">
            <path d="M0 60V36C0 16 12 4 32 0L36 12C24 16 18 22 18 36H32V60H0ZM44 60V36C44 16 56 4 76 0L80 12C68 16 62 22 62 36H76V60H44Z" fill="currentColor" opacity="0.85"/>
          </svg>
          <blockquote>
            A PDW transforma esta oportunidade numa <strong>vantagem soberana</strong>, garantindo que Portugal lidera a camada de valor da economia descentralizada — em vez de a consumir importada.
          </blockquote>
          <footer>
            <div className="pullquote-source">Plano de Negócios · PDW</div>
            <div className="pullquote-source-role">Agenda «Descentralizar Portugal com Blockchain»</div>
          </footer>
        </div>
      </div>
    </section>
  );
}

// ---------- Editorial stats banner (Fase 2) ----------
// Full-bleed light section with the consortium's headline numbers.
// Goes after Pillars / before DiplomaCase on home.
function StatsBanner() {
  const stats = [
    { num: "72,9", suffix: "M€", label: "Investimento total\ndo consórcio" },
    { num: "26",   suffix: "",   label: "Produtos inovadores\nna Agenda" },
    { num: "378",  suffix: "",   label: "Profissionais\nmobilizados" },
    { num: "44",   suffix: "",   label: "Entidades · PME\nRTOs · Estado" },
  ];
  return (
    <section className="statsbanner-full">
      <header className="statsbanner-head">
        <span className="statsbanner-eyebrow">Agenda Blockchain.PT em números</span>
        <h2 className="statsbanner-title">A escala do consórcio que torna a PDW possível.</h2>
      </header>
      <div className="statsbanner-grid">
        {stats.map((s, i) => (
          <div key={i} className="statsbanner-stat">
            <div className="statsbanner-num">
              {s.num}<span className="statsbanner-num-sfx">{s.suffix}</span>
            </div>
            <div className="statsbanner-lbl">{s.label}</div>
          </div>
        ))}
      </div>
      <footer className="statsbanner-foot">
        Financiamento PRR · NextGenerationEU · Coordenação institucional pela TecMinho
      </footer>
    </section>
  );
}

// ---------- Recognition / Press (Fase 2) ----------
// Placeholder section for press mentions and recognitions.
// Slots are stubs to fill in when the team has real material.
function Recognition() {
  const items = [
    { kind: "press",      tag: "Imprensa nacional",     name: "Logótipo da publicação",   note: "Cobertura editorial" },
    { kind: "milestone",  tag: "Marco oficial",         name: "EBSI · Trusted Issuer",    note: "Conformidade europeia" },
    { kind: "partner",    tag: "Parceiro institucional",name: "Logótipo de organização",   note: "Suporte estratégico" },
    { kind: "press",      tag: "Comunicação social",    name: "Logótipo da publicação",   note: "Entrevista institucional" },
  ];
  return (
    <section className="recognition">
      <header className="recognition-head">
        <span className="recognition-eyebrow">Reconhecimento institucional</span>
        <h2 className="recognition-title">A PDW na imprensa e nas instituições.</h2>
        <p className="recognition-deck">
          Imprensa, marcos regulatórios e parcerias que validam o trabalho do consórcio.
          <span className="recognition-todo"> · A preencher pela equipa de comunicação</span>
        </p>
      </header>
      <div className="recognition-grid">
        {items.map((it, i) => (
          <article key={i} className={`recognition-card recognition-card-${it.kind}`}>
            <span className="recognition-tag">{it.tag}</span>
            <div className="recognition-slot" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18M9 21V9"/>
              </svg>
            </div>
            <div className="recognition-name">{it.name}</div>
            <div className="recognition-note">{it.note}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ---------- Use cases ----------
function UseCasesGrid() {
  const cases = [
    { title: "Diplomas Universitários", text: "Emissão e verificação de diplomas com partilha seletiva e instantânea.", status: "available", icon: "🎓" },
    { title: "Identidade Estudantil", text: "Credencial estudantil multisserviços para ecossistemas académicos.", status: "development", icon: "🪪" },
    { title: "Microcredenciais Profissionais", text: "Validação de competências e percursos de aprendizagem contínua.", status: "development", icon: "📜" },
    { title: "Saúde Descentralizada", text: "Partilhe os seus dados de saúde de forma segura e privada com instituições em toda a Europa.", status: "development", icon: "🏥" },
    { title: "Rastreabilidade Alimentar", text: "Acompanhe toda a cadeia agrícola desde a produção até ao retalho.", status: "development", icon: "🌱" },
    { title: "Ativos Digitais e Imobiliário", text: "Transações imobiliárias e gestão de ativos sem fricção.", status: "development", icon: "🏠" },
  ];
  const label = { available: "Disponível", development: "Em desenvolvimento", research: "Em desenvolvimento" };
  return (
    <section>
      <div className="use-cases-heading">
        <h2>Casos de uso prioritários</h2>
        <p>Implementação gradual com foco em valor institucional e soberania digital.</p>
      </div>
      <div className="grid-3">
        {cases.map(c => (
          <article key={c.title} className="section-card use-case-card">
            <div>
              <div style={{display:'flex', alignItems:'center', gap:10, marginBottom: 10}}>
                <span style={{fontSize: 28, lineHeight: 1}}>{c.icon}</span>
                <span className={`status status-${c.status === 'available' ? 'ok' : 'dev'}`}>{label[c.status]}</span>
              </div>
              <h3 style={{margin:'2px 0 8px', fontSize: 17, fontWeight: 700}}>{c.title}</h3>
              <p style={{margin: 0, color:'var(--pdw-text-muted)', fontSize: 14, lineHeight: 1.55}}>{c.text}</p>
            </div>
            <a style={{fontWeight: 700, color: 'var(--pdw-green-700)', marginTop: 12, fontSize: 14, cursor:'pointer'}}>Ver detalhes →</a>
          </article>
        ))}
      </div>
    </section>
  );
}

// ---------- Interactive simulator ----------
function InteractiveSimulator() {
  const [step, setStep] = useState(0); // 0 idle, 1 verifying, 2 verified
  const verify = () => {
    setStep(1);
    setTimeout(() => setStep(2), 1600);
  };
  return (
    <div className="simulator-card">
      <div className="simulator-glow" />
      <div className="simulator-content">
        <h3 className="simulator-title">Simulador de Verificação</h3>
        <p className="simulator-subtitle">Clique para verificar o diploma na rede EBSI</p>
        {step === 0 && (
          <div className="simulator-dropzone" onClick={verify}>
            <Icon name="graduation" size={42} style={{color: 'var(--pdw-green-700)', marginBottom: 12}}/>
            <div style={{fontWeight: 600}}>Mestrado em Engenharia</div>
            <div style={{fontSize: 13, color: 'var(--pdw-text-muted)', marginTop: 4}}>Universidade do Minho</div>
            <button className="cta" style={{marginTop: 18}}>Verificar Credencial</button>
          </div>
        )}
        {step === 1 && (
          <div style={{padding: '40px 0'}}>
            <div style={{width: 56, height: 56, border: '4px solid rgba(0,108,75,0.2)', borderTopColor: 'var(--pdw-green-700)', borderRadius: '50%', margin: '0 auto', animation: 'spin 1s linear infinite'}}/>
            <p style={{marginTop: 20, fontWeight: 600, color: 'var(--pdw-green-700)'}}>A verificar blockchain…</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}
        {step === 2 && (
          <div className="simulator-result">
            <Icon name="checkCircle" size={42} style={{color: '#059669'}}/>
            <h4 style={{color: '#059669', fontSize: 18, fontWeight: 700, margin: '8px 0 4px'}}>Diploma Válido</h4>
            <p style={{color: '#065F46', margin: '0 0 4px', fontSize: 13}}>Verificado com sucesso na rede EBSI.</p>
            <div className="simulator-credential">
              <div className="sim-label">Titular</div>
              <div className="sim-value">João Silva</div>
              <div className="sim-label">Emissor</div>
              <div className="sim-value">Universidade do Minho <Icon name="checkCircle" size={14} style={{color:'#10B981'}}/></div>
            </div>
            <button onClick={() => setStep(0)} style={{padding: '8px 14px', background: 'transparent', color: '#059669', border: '1px solid #059669', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'}}>Tentar Novamente</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Diploma case section ----------
function DiplomaCaseSection() {
  return (
    <section className="section-card diploma-case-section">
      <div style={{position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center'}}>
        <div>
          <div style={{display:'flex', alignItems:'center', gap:10, marginBottom: 12}}>
            <span style={{fontSize:24}}>🎓</span>
            <h3 style={{margin: 0, color: 'var(--pdw-green-700)', fontSize: 18, fontWeight: 700}}>Caso: Diplomas Digitais</h3>
          </div>
          <p style={{color: 'var(--pdw-text-muted)', lineHeight: 1.7, fontSize: 15, margin: '0 0 18px', maxWidth: 540}}>
            Transformamos a validação académica: a universidade emite o diploma como uma credencial digital
            que o estudante guarda na PDW. Quando se candidata a um emprego, o recrutador verifica a autenticidade
            instantaneamente via QR Code, reduzindo o tempo de espera em 90 % e eliminando fraude.
          </p>
          <a className="cta cta-disruptive" style={{display:'inline-flex', alignItems:'center', gap: 8, fontSize: 14, cursor: 'pointer'}}>
            Saber mais sobre Diplomas Digitais →
          </a>
        </div>
        <div style={{width: '100%', minWidth: 320}}>
          <InteractiveSimulator />
        </div>
      </div>
    </section>
  );
}

// ---------- Editorial "Caso em destaque" — used at top of Casos page ----------
// Reuses .diploma-case-editorial styles from styles.css.
function FeaturedCase({ onOpenDiplomas }) {
  return (
    <section className="diploma-case-editorial featured-case">
      <div className="diploma-case-photo">
        <img src="../../assets/wallet-mockup.png" alt="Aplicação PDW a mostrar diploma da Universidade do Minho" loading="lazy"/>
        <div className="diploma-case-photo-tag">
          <span aria-hidden="true">●</span> Em produção · 2026
        </div>
      </div>
      <div className="diploma-case-content">
        <span className="diploma-case-eyebrow">Caso em destaque</span>
        <h2 className="diploma-case-title">
          A Universidade do Minho<br/>já emite diplomas digitais.
        </h2>
        <p className="diploma-case-lead">
          A primeira aplicação operacional da PDW. <strong>~12 000 diplomas/ano</strong> emitidos
          no formato W3C Verifiable Credential, assinados com chave <code>did:ebsi</code> e
          reconhecidos em <strong>27 Estados-Membros</strong> sem novos acordos bilaterais.
        </p>
        <div className="diploma-case-metrics">
          <div>
            <div className="diploma-case-metric-num">90 %</div>
            <div className="diploma-case-metric-lbl">Menos tempo<br/>de verificação</div>
          </div>
          <div>
            <div className="diploma-case-metric-num">−85 %</div>
            <div className="diploma-case-metric-lbl">Encargo<br/>administrativo</div>
          </div>
          <div>
            <div className="diploma-case-metric-num">0 %</div>
            <div className="diploma-case-metric-lbl">Risco<br/>de fraude</div>
          </div>
        </div>
        <button type="button" className="diploma-case-link" onClick={onOpenDiplomas}>
          Ver o caso completo →
        </button>
      </div>
    </section>
  );
}

// ---------- Contact CTA ----------
function ContactCTA() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); if (email.trim()) setSent(true); };
  return (
    <section className="section-card contact-cta">
      <h2>Pronto para integrar a PDW?</h2>
      <p>Deixe o seu email institucional e a nossa equipa entra em contacto em 48 horas.</p>
      {sent ? (
        <div style={{display:'inline-flex', alignItems:'center', gap:8, color:'#059669', fontWeight:600}}>
          <Icon name="checkCircle" size={20}/> Obrigado — entraremos em contacto em breve.
        </div>
      ) : (
        <form className="contact-form" onSubmit={submit}>
          <input type="email" required placeholder="O seu email institucional" value={email} onChange={e => setEmail(e.target.value)}/>
          <button type="submit" className="cta cta-disruptive" style={{padding: '13px 28px', whiteSpace: 'nowrap'}}>Solicitar demonstração</button>
        </form>
      )}
    </section>
  );
}

// ---------- Footer ----------
function PdwFooter() {
  const quick = [
    { label: "Sobre" }, { label: "Solução" }, { label: "Casos de Uso" }, { label: "Contactos" },
  ];
  return (
    <footer className="footer-disruptive">
      <div className="container">
        <div className="footer-divider" />
        <div className="footer-grid">
          <div>
            <a style={{display:'flex', alignItems:'center', gap:10}}>
              <img src="../../assets/pdw_logo.png" width={36} height={36} alt="" style={{borderRadius: 6, filter: 'drop-shadow(0 2px 6px rgba(0,108,75,0.2))'}}/>
              <span className="footer-brand-name">Portuguese Digital Wallet</span>
            </a>
            <p className="footer-description">Infraestrutura crítica de confiança para a economia descentralizada portuguesa.</p>
            <div className="footer-info-item"><Icon name="mapPin" size={14}/> <span>TecMinho — Campus de Azurém, Guimarães, Portugal</span></div>
            <div className="footer-info-item"><Icon name="mail" size={14}/> <a style={{color: 'var(--pdw-green-700)'}}>rmagalhaes@tecminho.uminho.pt</a></div>
            <div style={{display:'flex', gap: 14, marginTop: 16, color: 'var(--pdw-text-muted)'}}>
              <a><Icon name="linkedin" size={18}/></a>
              <a><Icon name="users" size={18}/></a>
              <a><Icon name="instagram" size={18}/></a>
            </div>
          </div>
          <div>
            <h3 className="footer-col-title">Navegação</h3>
            <nav>
              {quick.map(q => (
                <a key={q.label} className="footer-nav-link"><span style={{color: 'var(--pdw-green-700)'}}>→</span> {q.label}</a>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="footer-col-title">O Projeto</h3>
            <div style={{marginBottom: 18}}>
              <a className="footer-partner-card"><img src="../../assets/logo-Blockchain-pt.png" alt="Blockchain.PT"/></a>
            </div>
            <h3 className="footer-col-title">Promotor</h3>
            <a className="footer-partner-card"><img src="../../assets/tcminho-logo.png" alt="TecMinho"/></a>
          </div>
        </div>

        <div className="footer-funders">
          <div className="footer-funders-label">Financiado por</div>
          <div className="footer-funders-logos">
            <div className="funder-logo"><img src="../../assets/PRR.png" alt="PRR"/></div>
            <div className="funder-logo"><img src="../../assets/RP.png" alt="República Portuguesa"/></div>
            <div className="funder-logo"><img src="../../assets/FEU.png" alt="União Europeia"/></div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">© 2026 Portuguese Digital Wallet. Financiado por PRR & NextGenerationEU.</p>
          <div className="footer-legal-links">
            <a className="footer-legal-link">Política de Privacidade</a>
            <span className="footer-legal-sep">·</span>
            <a className="footer-legal-link">Termos de Utilização</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---------- Accessibility widget ----------
// Floating bottom-right pill. Houses every "viewing preference" the
// site offers: dark mode, contrast, font size. Replaces the old
// header ThemeToggle so the public header stays clean.
function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [contrast, setContrast] = useState('normal');
  const [scale, setScale] = useState(100);

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  useEffect(() => { document.documentElement.setAttribute('data-contrast', contrast); }, [contrast]);
  useEffect(() => { document.documentElement.style.fontSize = (16 * (scale/100)) + 'px'; }, [scale]);

  const Seg = ({ value, current, onSelect, children }) => (
    <button
      type="button"
      className={`acc-seg ${current === value ? 'on' : ''}`}
      onClick={() => onSelect(value)}
    >{children}</button>
  );

  return (
    <div className="accessibility-widget">
      {open && (
        <div className="acc-menu" role="dialog" aria-label="Preferências de visualização">
          <div className="acc-menu-head">
            <span>Preferências de visualização</span>
            <button className="acc-close" onClick={() => setOpen(false)} aria-label="Fechar"><Icon name="x" size={14}/></button>
          </div>

          <div className="acc-row">
            <span className="acc-label">Tema</span>
            <div className="acc-control">
              <Seg value="light" current={theme} onSelect={setTheme}>Claro</Seg>
              <Seg value="dark"  current={theme} onSelect={setTheme}>Escuro</Seg>
            </div>
          </div>

          <div className="acc-row">
            <span className="acc-label">Alto contraste</span>
            <div className="acc-control">
              <Seg value="normal" current={contrast} onSelect={setContrast}>Não</Seg>
              <Seg value="high"   current={contrast} onSelect={setContrast}>Sim</Seg>
            </div>
          </div>

          <div className="acc-row">
            <span className="acc-label">Tamanho do texto</span>
            <div className="acc-control">
              <Seg value={90}  current={scale} onSelect={setScale}>A−</Seg>
              <Seg value={100} current={scale} onSelect={setScale}>A</Seg>
              <Seg value={115} current={scale} onSelect={setScale}>A+</Seg>
            </div>
          </div>

          <p className="acc-foot">Estas preferências ficam guardadas neste dispositivo.</p>
        </div>
      )}
      <button
        className="acc-btn"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label="Opções de acessibilidade"
        title="Acessibilidade"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="4" r="2"/>
          <path d="M12 7v8"/>
          <path d="M5 10l7-1.5 7 1.5"/>
          <path d="M9 16l-2 5"/>
          <path d="M15 16l2 5"/>
        </svg>
      </button>
    </div>
  );
}

// ---------- Hidden admin badge ----------
// Lives on /admin (a hidden, auth-gated route). Surfaces the
// current production version + a link to the full changelog modal.
// Reused here so the MVP version badge is still reachable for the
// internal team without leaking to the public header.
function AdminVersionBadge({ version = "v1.7.3", onOpenChangelog }) {
  return (
    <button className="ver-badge admin-only" onClick={onOpenChangelog} title="Changelog (apenas admin)">
      {version}
    </button>
  );
}

// ---------- Changelog modal ----------
function ChangelogModal({ open, onClose }) {
  if (!open) return null;
  const items = [
    { ver: "v1.7.3", date: "12 mai 2026", points: ["Modo escuro refinado", "Simulador de verificação animado", "Acessibilidade WCAG AA"] },
    { ver: "v1.6.0", date: "02 mai 2026", points: ["Página de Solução com Triângulo de Confiança", "Trust bar dos parceiros"] },
  ];
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Atualizações da PDW</h3>
          <button className="modal-close" onClick={onClose}><Icon name="x" size={18}/></button>
        </div>
        <div className="modal-body">
          {items.map(it => (
            <div key={it.ver} style={{marginBottom: 18}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8}}>
                <span style={{background: 'rgba(0,108,75,0.10)', color: 'var(--pdw-green-700)', padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 700}}>{it.ver}</span>
                <span style={{fontSize: 12, color: 'var(--pdw-text-muted)'}}>{it.date}</span>
              </div>
              <ul style={{margin: 0, paddingLeft: 20, fontSize: 13.5, lineHeight: 1.65, color: 'var(--pdw-text)'}}>
                {it.points.map(p => <li key={p}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Expose to window
Object.assign(window, {
  Icon, PdwHeader, HeroInstitutional, TrustBar, ValuePillars, UseCasesGrid,
  InteractiveSimulator, DiplomaCaseSection, FeaturedCase, ContactCTA, PdwFooter,
  ChangelogModal, AccessibilityWidget, AdminVersionBadge, VideoModal,
  PullQuote, StatsBanner, Recognition,
});
