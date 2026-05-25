// PDW · Sobre — two variants
// Variant A: Institutional (card grid, density)
// Variant B: Editorial (long-form, timeline, single column)

const { useState: useStateSobre } = React;

// ====== Shared sub-components ======

function KpiStat({ value, label, accent }) {
  return (
    <div className="kpi-stat">
      <div className="kpi-value" style={accent ? {color: 'var(--pdw-green-700)'} : undefined}>{value}</div>
      <div className="kpi-label">{label}</div>
    </div>
  );
}

function StandardBlock({ tag, name, body }) {
  return (
    <article className="standard-block">
      <span className="standard-tag">{tag}</span>
      <h4 className="standard-name">{name}</h4>
      <p className="standard-body">{body}</p>
    </article>
  );
}

function TeamCard({ name, role, photo }) {
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('');
  return (
    <article className="team-card">
      <div className="team-photo">
        {photo
          ? <img src={photo} alt={name}/>
          : <span aria-hidden="true">{initials}</span>
        }
      </div>
      <div className="team-meta">
        <div className="team-name">{name}</div>
        <div className="team-role">{role}</div>
      </div>
    </article>
  );
}

const TEAM = [
  { name: "Pedro Xavier",     role: "Gestão e Coordenação" },
  { name: "Pedro Pereira",    role: "Coordenação Técnica" },
  { name: "Diogo Magalhães",  role: "Coordenação Técnica" },
  { name: "Miguel Marques",   role: "Desenvolvimento e Estratégia" },
  { name: "Kim P. Jørgensen", role: "Estratégia" },
];

const PARTNERS = [
  { name: "TecMinho",            role: "Líder Tecnológico da carteira · Coordenação institucional",  lead: true,  desc: "Interface da Universidade do Minho dedicada à transferência de conhecimento para o mercado. Fundada em 1990." },
  { name: "VOID Software",       role: "Líder da Agenda Blockchain.PT" },
  { name: "Universidade do Minho", role: "Parceiro institucional",  desc: "Instituição pública de ensino superior, com foco na excelência da educação e na investigação aplicada." },
  { name: "INESC-ID",            role: "I&D · Interoperabilidade" },
  { name: "INESC TEC",           role: "I&D · Interoperabilidade" },
  { name: "IST / IST-ID",        role: "I&D · Interoperabilidade" },
  { name: "TICE.PT",             role: "Parceiro institucional" },
];

// ====== Page header (shared) ======
function SobreHeader() {
  return (
    <header className="page-hero">
      <span className="eyebrow">Sobre o projeto</span>
      <h1 className="page-hero-title">
        <span className="text-gradient">Infraestrutura nacional de identidade digital,</span><br/>
        construída em Portugal para a Europa.
      </h1>
      <p className="page-hero-lead">
        A <strong>Portuguese Digital Wallet (PDW)</strong> é a camada de execução de credenciais
        verificáveis do Estado português. Coordenada pela <strong>TecMinho</strong> e integrada na
        Agenda Mobilizadora <em>«Descentralizar Portugal com Blockchain»</em>, posiciona o país
        como referência regulatória e tecnológica na identidade digital descentralizada europeia.
      </p>
    </header>
  );
}

// ====== KPI strip (shared) ======
function SobreKpis() {
  return (
    <section className="kpi-strip" aria-label="Indicadores do consórcio">
      <KpiStat value="72,9 M€" accent label="Investimento total do consórcio" />
      <KpiStat value="26"      accent label="Produtos inovadores na Agenda" />
      <KpiStat value="378"     accent label="Profissionais mobilizados" />
      <KpiStat value="44"      accent label="Entidades · PME · RTOs · Estado" />
    </section>
  );
}

// ====== Variant A · Institutional ======
function SobreVariantA() {
  return (
    <article className="sobre-page sobre-A">
      <SobreHeader/>
      <SobreKpis/>

      <section className="two-col">
        <div className="section-card section-card-soft">
          <h3 className="section-title">O que é a PDW</h3>
          <p>
            A PDW é a <em>«Credential Execution Layer»</em> de Portugal: uma infraestrutura crítica
            que permite emitir, guardar e apresentar credenciais digitais com validade jurídica
            em toda a União Europeia.
          </p>
          <p>
            O paradigma é o da <strong>Identidade Auto-Soberana (SSI)</strong> — o utilizador
            mantém o controlo dos seus dados, escolhe o que partilha e com quem, sem depender
            de intermediários.
          </p>
        </div>
        <div className="section-card section-card-emphasis">
          <span className="callout-tag">Coordenação institucional</span>
          <h3 className="section-title">O papel da TecMinho</h3>
          <p>
            A <strong>TecMinho</strong> — interface da Universidade do Minho para a transferência
            de conhecimento, fundada em 1990 — lidera o desenvolvimento técnico e a coordenação
            institucional da PDW dentro do consórcio.
          </p>
          <p>
            Esta responsabilidade traduz a aposta nacional em colocar o ensino superior público
            no centro de uma infraestrutura crítica de soberania digital.
          </p>
          <a className="callout-link" href="https://www.tecminho.uminho.pt/" target="_blank" rel="noopener noreferrer">
            Conhecer a TecMinho →
          </a>
        </div>
      </section>

      <section className="section-card">
        <h3 className="section-title">Contexto estratégico</h3>
        <p>
          A PDW integra a Agenda Mobilizadora <em>«Descentralizar Portugal com Blockchain»</em>,
          liderada pela <strong>VOID Software</strong> e financiada pelo Plano de Recuperação e
          Resiliência (PRR) ao abrigo do programa NextGenerationEU. O consórcio agrega
          <strong> 24 PME</strong>, <strong>15 organizações de investigação e tecnologia</strong> e
          <strong> 5 entidades públicas</strong>.
        </p>
        <p>
          A PDW é o eixo da <em>«transição gémea»</em> — digital e verde — e contribui de forma
          direta para a meta nacional de <strong>3 % do PIB em I&amp;D até 2030</strong>, bem como
          para a redução de papel e deslocações em atos administrativos.
        </p>
      </section>

      <section>
        <header className="section-header">
          <span className="eyebrow">Fundamentos técnicos</span>
          <h3 className="section-title">Normas e referenciais europeus</h3>
        </header>
        <div className="grid-3 standards-grid">
          <StandardBlock
            tag="EIDAS 2.0"
            name="Identificação eletrónica"
            body="Regulamento europeu que define o quadro jurídico para a identificação eletrónica transfronteiriça segura entre Estados-Membros."
          />
          <StandardBlock
            tag="EBSI · approved"
            name="Infraestrutura blockchain europeia"
            body="Conformidade com a European Blockchain Services Infrastructure, base para a verificação transfronteiriça de documentos e identidades."
          />
          <StandardBlock
            tag="EUDI · ARF"
            name="Architecture & Reference Framework"
            body="Garante a interoperabilidade técnica entre a carteira portuguesa e as carteiras digitais nacionais de toda a União Europeia."
          />
        </div>
      </section>

      <section>
        <header className="section-header">
          <span className="eyebrow">Equipa core</span>
          <h3 className="section-title">Gestão, coordenação técnica e estratégia</h3>
        </header>
        <div className="team-grid">
          {TEAM.map(t => <TeamCard key={t.name} {...t} />)}
        </div>
        <p className="team-footnote">
          Fotos a serem fornecidas pela equipa de comunicação · placeholders com iniciais até lá.
        </p>
      </section>

      <section className="two-col">
        <div className="section-card">
          <h3 className="section-title">Modelo de governação</h3>
          <p>
            A PDW adopta o modelo de governação da Agenda Blockchain.PT, estruturado em
            <strong> Steering Committee</strong> deliberativo, <strong>Executive Committee</strong>
            operacional e <strong>Scientific Board</strong>. A gestão de risco segue a metodologia
            <em> FMEA</em>, com validação mensal do <em>Description of Work</em>.
          </p>
        </div>
        <div className="section-card">
          <h3 className="section-title">Compromisso de exportação</h3>
          <p>
            Mais de <strong>dois terços das vendas previstas</strong> destinam-se a mercados
            externos, consolidando a PDW como produto português de exportação na identidade
            digital descentralizada.
          </p>
        </div>
      </section>

      <section>
        <header className="section-header">
          <span className="eyebrow">Consórcio</span>
          <h3 className="section-title">Parceiros estratégicos</h3>
        </header>
        <div className="partners-list">
          {PARTNERS.map(p => (
            <article key={p.name} className={`partner-row${p.lead ? ' partner-row-lead' : ''}`}>
              <div className="partner-meta">
                <div className="partner-name">{p.name}</div>
                <div className="partner-role">{p.role}</div>
              </div>
              {p.desc && <p className="partner-desc">{p.desc}</p>}
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}

// ====== Variant B · Editorial ======
function SobreVariantB() {
  return (
    <article className="sobre-page sobre-B">
      <SobreHeader/>

      <section className="editorial">
        <div className="editorial-pullquote">
          <p>
            «A PDW transforma a oportunidade dos <strong>10&nbsp;% do PIB global em blockchain
            até 2027</strong> numa vantagem soberana — garantindo que Portugal lidera a camada
            de valor da economia descentralizada.»
          </p>
          <footer>Plano de Negócios · PDW</footer>
        </div>

        <h3 className="section-title">O projeto em três frases</h3>
        <p className="editorial-lead">
          A PDW é a infraestrutura crítica de confiança da Agenda <em>«Descentralizar
          Portugal com Blockchain»</em>. Coordenada pela TecMinho — interface de transferência
          de tecnologia da Universidade do Minho — entrega ao Estado e aos cidadãos uma
          carteira digital alinhada com os padrões europeus eIDAS 2.0, EBSI e EUDI ARF.
          Não é apenas software: é o motor da transição digital portuguesa para a economia
          descentralizada.
        </p>

        <div className="editorial-numbers">
          <KpiStat value="72,9 M€" accent label="Investimento total do consórcio" />
          <KpiStat value="26" accent label="Produtos inovadores na Agenda" />
          <KpiStat value="378" accent label="Profissionais mobilizados" />
          <KpiStat value="44" accent label="Entidades · PME · RTOs · Estado" />
        </div>

        <h3 className="section-title">O consórcio e o papel da TecMinho</h3>
        <p>
          O ecossistema é liderado pela <strong>VOID Software</strong> e congrega
          <strong> 24 PME</strong>, <strong>15 organizações de investigação e tecnologia</strong>
          e <strong>5 entidades públicas</strong>. Dentro deste consórcio, a
          <strong> TecMinho</strong> assume a liderança técnica e a coordenação institucional
          da PDW — responsabilidade que afirma o ensino superior público português como
          construtor de infraestrutura nacional crítica.
        </p>

        <h3 className="section-title">Missão e visão</h3>
        <div className="editorial-twocol">
          <div>
            <h4>Missão</h4>
            <p>
              Assegurar a soberania digital dos cidadãos e eliminar a fricção em processos
              de identificação, consolidando uma infraestrutura nacional resiliente e
              descentralizada para serviços digitais.
            </p>
          </div>
          <div>
            <h4>Visão</h4>
            <p>
              Estabelecer a PDW como referência absoluta em identidade digital segura,
              liderando a transição para um ecossistema de credenciais interoperável e
              centrado no utilizador.
            </p>
          </div>
        </div>

        <h3 className="section-title">Equipa core</h3>
        <div className="team-grid team-grid-compact">
          {TEAM.map(t => <TeamCard key={t.name} {...t} />)}
        </div>

        <h3 className="section-title">Parceiros estratégicos</h3>
        <ol className="editorial-partners">
          {PARTNERS.map(p => (
            <li key={p.name} className={p.lead ? 'is-lead' : ''}>
              <strong>{p.name}</strong> — {p.role}
            </li>
          ))}
        </ol>

        <h3 className="section-title">Governação e risco</h3>
        <p>
          A PDW adopta o modelo de governação da Agenda Blockchain.PT, com supervisão
          estratégica vinculativa (Steering Committee), gestão tática mensal (Executive
          Committee) e validação científica contínua (Scientific Board). A gestão de risco
          segue a metodologia FMEA, com mitigação ativa em três frentes: escalonamento de
          tempo, alocação de recursos e expansão de escopo.
        </p>
      </section>
    </article>
  );
}

// ====== Exposed ======
function SobrePage({ variant = 'A' }) {
  return variant === 'B' ? <SobreVariantB/> : <SobreVariantA/>;
}

Object.assign(window, { SobrePage });
