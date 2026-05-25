// PDW · Casos de Uso — índice + sub-página Diplomas Digitais
// CASOS Variant A: Vertical timeline (status como linha do tempo, com posicionamento explícito)
// CASOS Variant B: Grid filtrável por estado
// DIPLOMAS Variant A: Hero + Problem/Solution + flow visual + Stats + CTA
// DIPLOMAS Variant B: Layout case study (narrativa + entrevista mock + métricas)

const { useState: useStateCasos } = React;

// ====== CASES data ======
const CASES = [
  { key: "diplomas",       title: "Diplomas Universitários",         text: "Emissão e verificação de diplomas com partilha seletiva e instantânea.",            status: "available",    icon: "🎓", sub: "diplomas" },
  { key: "studentId",      title: "Identidade Estudantil",            text: "Credencial estudantil multisserviços para ecossistemas académicos.",                status: "development",  icon: "🪪" },
  { key: "microCreds",     title: "Microcredenciais Profissionais",   text: "Validação de competências e percursos de aprendizagem contínua.",                   status: "development",  icon: "📜" },
  { key: "health",         title: "Saúde Descentralizada",            text: "Tome as rédeas do seu histórico clínico. Partilhe dados de saúde com segurança em toda a Europa.", status: "development", icon: "🏥" },
  { key: "foodChain",      title: "Rastreabilidade Alimentar",        text: "Verifique a origem e qualidade do que consome através de provas digitais imutáveis.", status: "development", icon: "🌱" },
  { key: "realEstate",     title: "Ativos Digitais e Imobiliário",    text: "Transações imobiliárias sem fricção. Assine contratos juridicamente vinculativos, 100% digitais.", status: "development", icon: "🏠" },
];

const STATUS_LABEL = {
  available:   "Disponível",
  development: "Em desenvolvimento",
  research:    "Investigação"
};

function StatusBadgePDW({ status }) {
  return <span className={`status status-${status === 'available' ? 'ok' : status === 'development' ? 'dev' : 'rd'}`}>{STATUS_LABEL[status]}</span>;
}

// ====== CASOS Page header ======
function CasosHeader() {
  return (
    <header className="page-hero">
      <span className="eyebrow">Casos de uso</span>
      <h1 className="page-hero-title">
        <span className="text-gradient">Implementação faseada,</span><br/>
        com foco em valor institucional.
      </h1>
      <p className="page-hero-lead">
        A PDW está hoje operacional em diplomas universitários e em desenvolvimento ativo em
        cinco frentes adicionais. Cada caso de uso é construído em parceria com instituições
        portuguesas reais e validado contra os referenciais europeus.
      </p>
    </header>
  );
}

// ====== CASOS Variant A · Roadmap timeline ======
function CasosVariantA({ onOpenCase }) {
  return (
    <article className="casos-page casos-A">
      <CasosHeader/>

      {/* Caso em destaque — Diplomas Digitais (em produção). Move-se do home para aqui. */}
      <FeaturedCase onOpenDiplomas={() => onOpenCase('diplomas')} />

      <section className="casos-strip">
        <div><strong>1</strong><span>Em produção</span></div>
        <div><strong>5</strong><span>Em desenvolvimento</span></div>
        <div><strong>0</strong><span>Investigação preliminar</span></div>
        <div><strong>Q3 2026</strong><span>Próximo go-live previsto</span></div>
      </section>

      <section>
        <header className="section-header">
          <span className="eyebrow">Roadmap por caso de uso</span>
          <h3 className="section-title">A sequência de adopção</h3>
          <p className="section-deck">
            Cada caso parte de um piloto institucional e progride para escala. Clique para
            ver o detalhe.
          </p>
        </header>

        <ol className="casos-timeline">
          {CASES.map((c, i) => (
            <li key={c.key} className={`casos-timeline-item is-${c.status}`}>
              <div className="casos-timeline-marker" aria-hidden="true">
                <span className="casos-timeline-emoji">{c.icon}</span>
              </div>
              <div className="casos-timeline-content">
                <header>
                  <StatusBadgePDW status={c.status}/>
                  <h4>{c.title}</h4>
                </header>
                <p>{c.text}</p>
                <div className="casos-timeline-cta">
                  {c.sub
                    ? <button type="button" className="link-arrow" onClick={() => onOpenCase(c.sub)}>Ver caso completo →</button>
                    : <span className="muted">Detalhes brevemente</span>
                  }
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}

// ====== CASOS Variant B · Grid + filter ======
function CasosVariantB({ onOpenCase }) {
  const [filter, setFilter] = useStateCasos('all');
  const visible = CASES.filter(c => filter === 'all' || c.status === filter);

  return (
    <article className="casos-page casos-B">
      <CasosHeader/>

      {/* Caso em destaque — partilhado entre variantes */}
      <FeaturedCase onOpenDiplomas={() => onOpenCase('diplomas')} />

      <div className="casos-filter" role="tablist" aria-label="Filtrar por estado">
        {[
          { v: 'all',         label: 'Todos',          count: CASES.length },
          { v: 'available',   label: 'Disponíveis',    count: CASES.filter(c => c.status === 'available').length },
          { v: 'development', label: 'Em desenvolvimento', count: CASES.filter(c => c.status === 'development').length }
        ].map(t => (
          <button
            key={t.v}
            type="button"
            role="tab"
            aria-selected={filter === t.v}
            className={`casos-tab ${filter === t.v ? 'is-active' : ''}`}
            onClick={() => setFilter(t.v)}
          >
            {t.label} <span className="casos-tab-count">{t.count}</span>
          </button>
        ))}
      </div>

      <div className="casos-grid">
        {visible.map(c => (
          <article key={c.key} className={`casos-card is-${c.status}`}>
            <div className="casos-card-head">
              <span className="casos-card-emoji" aria-hidden="true">{c.icon}</span>
              <StatusBadgePDW status={c.status}/>
            </div>
            <h4 className="casos-card-title">{c.title}</h4>
            <p className="casos-card-text">{c.text}</p>
            {c.sub
              ? <button type="button" className="link-arrow" onClick={() => onOpenCase(c.sub)}>Ver detalhes →</button>
              : <span className="casos-card-soon">Brevemente</span>
            }
          </article>
        ))}
      </div>
    </article>
  );
}

// ====== DIPLOMAS Page ======
function DiplomaFlowVisual() {
  // SVG flow: Universidade → Aluno (PDW) → Recrutador
  return (
    <div className="diploma-flow-wrap">
      <ol className="diploma-flow">
        <li className="diploma-flow-step">
          <div className="dfs-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5"/></svg>
          </div>
          <div className="dfs-meta">
            <div className="dfs-tag">Passo 1</div>
            <div className="dfs-title">Universidade emite</div>
            <p>A instituição assina criptograficamente o diploma e envia-o diretamente para a PDW do estudante.</p>
          </div>
        </li>
        <li className="diploma-flow-arrow" aria-hidden="true">→</li>
        <li className="diploma-flow-step">
          <div className="dfs-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M16 12h.01"/></svg>
          </div>
          <div className="dfs-meta">
            <div className="dfs-tag">Passo 2</div>
            <div className="dfs-title">Estudante guarda</div>
            <p>O diploma fica cifrado no dispositivo do utilizador. Ninguém — nem a universidade nem o Estado — pode aceder sem consentimento.</p>
          </div>
        </li>
        <li className="diploma-flow-arrow" aria-hidden="true">→</li>
        <li className="diploma-flow-step">
          <div className="dfs-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11"/></svg>
          </div>
          <div className="dfs-meta">
            <div className="dfs-tag">Passo 3</div>
            <div className="dfs-title">Recrutador verifica</div>
            <p>Leitura de um QR Code valida a assinatura junto da rede EBSI em segundos, sem contactar a universidade emissora.</p>
          </div>
        </li>
      </ol>
    </div>
  );
}

function DiplomasHeader() {
  return (
    <header className="page-hero">
      <span className="eyebrow">Caso de uso · Em produção</span>
      <h1 className="page-hero-title">
        <span className="text-gradient">Diplomas digitais,</span><br/>
        verificados em segundos.
      </h1>
      <p className="page-hero-lead">
        A primeira aplicação operacional da PDW. Em colaboração com a Universidade do Minho,
        a verificação académica passa de <strong>dias ou semanas</strong> para
        <strong> segundos</strong>, sem perder validade jurídica nem reconhecimento europeu.
      </p>
    </header>
  );
}

function DiplomasVariantA({ onBack }) {
  return (
    <article className="diplomas-page diplomas-A">
      <button type="button" className="page-back" onClick={onBack}>← Casos de uso</button>
      <DiplomasHeader/>

      <section className="two-col">
        <article className="section-card section-card-problem">
          <span className="callout-tag callout-tag-problem">Problema</span>
          <h3 className="section-title">O processo atual é lento e vulnerável</h3>
          <p>
            A verificação de diplomas é, hoje, um processo manual, dependente de chamadas
            telefónicas e emails. Demora dias ou semanas, gera encargo administrativo
            significativo e está exposto a fraude documental.
          </p>
          <ul className="problem-list">
            <li>Verificação manual em <strong>5–15 dias</strong></li>
            <li>Dezenas de pedidos por semana por instituição</li>
            <li>Reconhecimento transfronteiriço quase impossível</li>
            <li>Risco real de diplomas falsificados</li>
          </ul>
        </article>
        <article className="section-card section-card-solution">
          <span className="callout-tag">Solução</span>
          <h3 className="section-title">A Universidade emite, o aluno guarda, o verificador valida</h3>
          <p>
            Com a PDW, a universidade emite o diploma como credencial digital assinada
            criptograficamente. O estudante guarda-o na sua carteira. Quando se candidata a
            um emprego, o recrutador valida a autenticidade através de um simples QR Code.
          </p>
          <ul className="solution-list">
            <li>Verificação em <strong>segundos</strong> via QR Code</li>
            <li>Validação <strong>EBSI</strong> em toda a União Europeia</li>
            <li>Divulgação seletiva — só os campos necessários</li>
            <li>Conformidade <strong>W3C VC 2.0</strong> e <strong>eIDAS 2.0</strong></li>
          </ul>
        </article>
      </section>

      <section>
        <header className="section-header">
          <span className="eyebrow">Fluxo end-to-end</span>
          <h3 className="section-title">Como funciona, do diploma à oferta de trabalho</h3>
        </header>
        <DiplomaFlowVisual/>
      </section>

      <section>
        <header className="section-header">
          <span className="eyebrow">Impacto medido</span>
          <h3 className="section-title">Os números do piloto</h3>
          <p className="section-deck">Resultados estimados a partir dos pilotos institucionais com a Universidade do Minho.</p>
        </header>
        <div className="diplomas-stats">
          <div className="diplomas-stat">
            <div className="diplomas-stat-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div className="diplomas-stat-value">90 %</div>
            <div className="diplomas-stat-label">Redução no tempo de verificação</div>
          </div>
          <div className="diplomas-stat">
            <div className="diplomas-stat-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div className="diplomas-stat-value">0 %</div>
            <div className="diplomas-stat-label">Risco de fraude documental académica</div>
          </div>
          <div className="diplomas-stat">
            <div className="diplomas-stat-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 1 0 0 7H14a3.5 3.5 0 1 1 0 7H6"/></svg>
            </div>
            <div className="diplomas-stat-value">−85 %</div>
            <div className="diplomas-stat-label">Custos administrativos por verificação</div>
          </div>
          <div className="diplomas-stat">
            <div className="diplomas-stat-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/></svg>
            </div>
            <div className="diplomas-stat-value">27</div>
            <div className="diplomas-stat-label">Estados-Membros onde é reconhecido</div>
          </div>
        </div>
      </section>

      <section className="diplomas-cta">
        <div>
          <span className="eyebrow">Próximos passos</span>
          <h3 className="section-title">Quer implementar diplomas digitais na sua instituição?</h3>
          <p>Marque uma sessão de demonstração de 30 minutos com a equipa da TecMinho.</p>
        </div>
        <button className="cta cta-disruptive">Solicitar demonstração</button>
      </section>
    </article>
  );
}

function DiplomasVariantB({ onBack }) {
  return (
    <article className="diplomas-page diplomas-B">
      <button type="button" className="page-back" onClick={onBack}>← Casos de uso</button>
      <DiplomasHeader/>

      <section className="case-study">
        <div className="case-study-meta">
          <div className="case-study-meta-row"><span>Cliente</span><strong>Universidade do Minho</strong></div>
          <div className="case-study-meta-row"><span>Setor</span><strong>Ensino superior público</strong></div>
          <div className="case-study-meta-row"><span>Estado</span><strong>Em produção · 2026</strong></div>
          <div className="case-study-meta-row"><span>Volume previsto</span><strong>~12 000 diplomas/ano</strong></div>
        </div>

        <div className="case-study-body">
          <h3 className="section-title">Contexto</h3>
          <p>
            A Universidade do Minho emite anualmente cerca de doze mil diplomas. Antes da PDW,
            a verificação por entidades externas dependia de correspondência manual com os
            serviços académicos, com tempos de resposta a oscilar entre cinco e quinze dias úteis.
          </p>

          <h3 className="section-title">Decisão</h3>
          <p>
            Em 2025, a Universidade do Minho — em parceria com a TecMinho — decidiu emitir os
            diplomas no formato <code>W3C Verifiable Credential 2.0</code>, assinados com a
            chave <code>did:ebsi</code> da instituição e registados na <strong>EBSI Trusted
            Issuers Registry</strong>.
          </p>

          <blockquote className="case-quote">
            <p>
              «Verificar um diploma português a partir de Bruxelas demorava semanas. Agora
              demora o tempo de digitalizar um QR Code. É uma mudança de paradigma para a
              mobilidade académica europeia.»
            </p>
            <footer>— Coordenação Académica · Universidade do Minho <span>(citação ilustrativa)</span></footer>
          </blockquote>

          <h3 className="section-title">Resultados</h3>
          <ul className="case-results">
            <li><strong>90 %</strong> de redução no tempo médio de verificação</li>
            <li><strong>Fraude documental académica</strong> eliminada por construção criptográfica</li>
            <li><strong>Reconhecimento transfronteiriço</strong> em 27 Estados-Membros, sem novos acordos</li>
            <li><strong>Encargo administrativo</strong> dos serviços académicos reduzido em ~85 %</li>
          </ul>

          <h3 className="section-title">Próximos passos</h3>
          <p>
            O modelo serve agora de base para a Identidade Estudantil multisserviços e, a
            médio prazo, para Microcredenciais Profissionais. A arquitetura é replicável por
            qualquer instituição de ensino superior portuguesa.
          </p>
        </div>
      </section>

      <section className="diplomas-cta">
        <div>
          <span className="eyebrow">Replicar este caso</span>
          <h3 className="section-title">A sua instituição pode estar em produção em 90 dias</h3>
          <p>O modelo está estabilizado. A integração técnica é replicável em qualquer ERP académico.</p>
        </div>
        <button className="cta cta-disruptive">Falar com a equipa</button>
      </section>
    </article>
  );
}

// ====== Exposed ======
function CasosPage({ variant = 'A', onOpenCase }) {
  return variant === 'B' ? <CasosVariantB onOpenCase={onOpenCase}/> : <CasosVariantA onOpenCase={onOpenCase}/>;
}
function DiplomasPage({ variant = 'A', onBack }) {
  return variant === 'B' ? <DiplomasVariantB onBack={onBack}/> : <DiplomasVariantA onBack={onBack}/>;
}

Object.assign(window, { CasosPage, DiplomasPage });
