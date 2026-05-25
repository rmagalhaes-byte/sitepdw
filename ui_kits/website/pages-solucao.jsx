// PDW · Solução — two variants
// Variant A: Story-first (interactive Trust Triangle prominent, narrative flow)
// Variant B: Dev-first (technical table + JSON-LD example, then triangle)

const { useState: useStateSolucao, useMemo: useMemoSolucao } = React;

// ====== Interactive Trust Triangle ======
// Layout: usa `trust-triangle.png` como ilustração principal à esquerda
// e três "abas" clicáveis à direita que expandem o detalhe do papel
// escolhido. Eliminámos o SVG hand-drawn — a vossa ilustração tem
// identidade própria, o SVG era sintético.
function TrustTriangle({ value, onChange }) {
  const nodes = {
    issuer: {
      title: "Emissor",
      sub: "Issuer",
      body: "Entidade autorizada que cria e assina criptograficamente a credencial. Universidades, ministérios, instituições de saúde, autoridades.",
      examples: "ex.: Universidade do Minho, Ordem dos Médicos, Direção-Geral da Saúde."
    },
    holder: {
      title: "Utilizador",
      sub: "Holder",
      body: "O cidadão que guarda a credencial na sua PDW. Decide o que partilha, com quem, e durante quanto tempo. Os dados ficam cifrados no dispositivo.",
      examples: "ex.: estudante, profissional de saúde, candidato a um emprego."
    },
    verifier: {
      title: "Verificador",
      sub: "Verifier",
      body: "Quem precisa de validar a credencial. Verifica a assinatura junto da rede EBSI em segundos — sem contactar o emissor.",
      examples: "ex.: recrutador, hospital noutro país, banco, serviço público."
    }
  };

  return (
    <div className="trust-triangle-real">
      <div className="trust-triangle-img">
        <img src="../../assets/trust-triangle.png" alt="Triângulo de confiança PDW: Emissor, Utilizador e Verificador conectados pela camada EBSI"/>
      </div>
      <div className="trust-triangle-tabs">
        <div className="trust-triangle-tabs-head" role="tablist" aria-label="Selecionar papel">
          {Object.entries(nodes).map(([key, n]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={value === key}
              className={`trust-tab ${value === key ? 'is-active' : ''}`}
              onClick={() => onChange(key)}
            >
              <span className="trust-tab-title">{n.title}</span>
              <span className="trust-tab-sub">{n.sub}</span>
            </button>
          ))}
        </div>
        <div className="trust-tab-panel" role="tabpanel">
          <p>{nodes[value].body}</p>
          <p className="trust-detail-eg">{nodes[value].examples}</p>
        </div>
      </div>
    </div>
  );
}

// ====== Flow image (Como Funciona) ======
// Usa o infográfico próprio em vez de redesenhar com cards CSS.
function FlowSteps() {
  return (
    <figure className="flow-image">
      <img src="../../assets/Como-funciona.png" alt="Como funciona a PDW: 1 Pedido, 2 Autorização, 3 Verificação via EBSI, 4 Ação. Os dados ficam seguros no controlo do utilizador."/>
    </figure>
  );
}

// ====== Dev-facing technical table ======
const TECH_TABLE = [
  { area: "Formatos de credencial",  tokens: ["W3C VC Data Model 2.0", "JWT-VC", "SD-JWT VC (selective disclosure)"] },
  { area: "Identificadores",         tokens: ["did:ebsi:*", "did:key:*", "did:jwk:*"] },
  { area: "Suítes criptográficas",   tokens: ["EdDSA · Ed25519", "ES256 · P-256", "BBS+ (em avaliação)"] },
  { area: "Protocolos",              tokens: ["OID4VCI · emissão", "OID4VP · apresentação", "DIDComm v2 (parcial)"] },
  { area: "Trust registry",          tokens: ["EBSI Trusted Issuers Registry", "EBSI Trust Anchor", "TIR REST API v3"] },
  { area: "Armazenamento local",     tokens: ["Android Keystore", "Secure Enclave (iOS)", "Encrypted SQLite"] }
];

function TechTable() {
  return (
    <div className="tech-table">
      {TECH_TABLE.map(row => (
        <div key={row.area} className="tech-row">
          <div className="tech-area">{row.area}</div>
          <div className="tech-tokens">
            {row.tokens.map(t => <code key={t}>{t}</code>)}
          </div>
        </div>
      ))}
    </div>
  );
}

const SAMPLE_VC = `{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://w3id.org/security/suites/jws-2020/v1"
  ],
  "type": ["VerifiableCredential", "UniversityDegree"],
  "issuer": "did:ebsi:zr2rWDHHrUCdZAW7wsSb5nQ",
  "validFrom": "2026-05-14T10:22:11Z",
  "credentialSubject": {
    "id": "did:key:z6Mki…",
    "name": "João Silva",
    "degree": {
      "type": "Mestrado em Engenharia Informática",
      "issuer": "Universidade do Minho"
    }
  },
  "proof": { "type": "DataIntegrityProof", "cryptosuite": "eddsa-jcs-2022", "…": "…" }
}`;

function CredentialSample() {
  return (
    <div className="code-block" aria-label="Exemplo de credencial verificável">
      <header className="code-block-head">
        <span>credential.jsonld</span>
        <span className="code-block-tag">W3C VC 2.0 · EBSI</span>
      </header>
      <pre>{SAMPLE_VC}</pre>
    </div>
  );
}

// ====== Page header (shared) ======
function SolucaoHeader() {
  return (
    <header className="page-hero">
      <span className="eyebrow">A solução</span>
      <h1 className="page-hero-title">
        <span className="text-gradient">Credenciais verificáveis,</span><br/>
        sem fricção, com soberania.
      </h1>
      <p className="page-hero-lead">
        A PDW assenta no paradigma da <strong>Identidade Auto-Soberana</strong> e em
        credenciais verificáveis que cumprem os referenciais europeus
        <strong> W3C VC</strong>, <strong>EBSI</strong> e <strong>EUDI ARF</strong>.
      </p>
    </header>
  );
}

// ====== Variant A · Story-first ======
function SolucaoVariantA() {
  const [node, setNode] = useStateSolucao('holder');
  return (
    <article className="solucao-page solucao-A">
      <SolucaoHeader/>

      <section className="two-col">
        <div className="section-card section-card-soft">
          <h3 className="section-title">O que é uma carteira digital?</h3>
          <p>
            É uma <em>«camada de execução»</em> de credenciais — uma aplicação que recebe,
            guarda e apresenta documentos digitais com validade jurídica, sem dependência de
            formulários e processos repetitivos.
          </p>
        </div>
        <div className="section-card section-card-soft">
          <h3 className="section-title">O que são credenciais verificáveis?</h3>
          <p>
            Versões digitais seguras de documentos: diplomas, identificações, certificados.
            São assinadas criptograficamente, verificáveis por máquinas, e suportam
            <strong> divulgação seletiva</strong> — o utilizador partilha apenas o que é necessário.
          </p>
        </div>
      </section>

      <section>
        <header className="section-header">
          <span className="eyebrow">Ecossistema de confiança</span>
          <h3 className="section-title">O triângulo de confiança</h3>
          <p className="section-deck">
            Três papéis, uma camada comum de confiança. Clique num dos vértices para perceber
            como cada papel interage com a PDW.
          </p>
        </header>
        <TrustTriangle value={node} onChange={setNode}/>
      </section>

      <section>
        <header className="section-header">
          <span className="eyebrow">Como funciona</span>
          <h3 className="section-title">Quatro passos, do emissor ao verificador</h3>
        </header>
        <FlowSteps/>
      </section>

      <section>
        <header className="section-header">
          <span className="eyebrow">Características</span>
          <h3 className="section-title">Os três pilares da PDW</h3>
        </header>
        <div className="grid-3">
          <article className="section-card">
            <h4 className="feature-title">Interoperabilidade nativa</h4>
            <p>Alinhamento total com o EUDI ARF — válida em toda a União Europeia.</p>
          </article>
          <article className="section-card">
            <h4 className="feature-title">Segurança criptográfica</h4>
            <p>Chaves privadas armazenadas no dispositivo, ligadas à confiança EBSI.</p>
          </article>
          <article className="section-card">
            <h4 className="feature-title">Privacidade por desenho</h4>
            <p>Dados processados localmente. O utilizador decide quem acede a quê.</p>
          </article>
        </div>
      </section>
    </article>
  );
}

// ====== Variant B · Dev-first ======
function SolucaoVariantB() {
  const [node, setNode] = useStateSolucao('issuer');
  return (
    <article className="solucao-page solucao-B">
      <SolucaoHeader/>

      <section>
        <header className="section-header">
          <span className="eyebrow">Stack técnico</span>
          <h3 className="section-title">Tecnologia que suporta a PDW</h3>
          <p className="section-deck">
            Formatos, identificadores, suítes e protocolos em uso — todos os referenciais
            de mercado para identidade digital verificável.
          </p>
        </header>
        <TechTable/>
      </section>

      <section className="two-col two-col-asym">
        <div>
          <header className="section-header">
            <span className="eyebrow">Exemplo</span>
            <h3 className="section-title">Uma credencial em código</h3>
            <p className="section-deck">
              Diploma universitário no formato W3C VC 2.0, assinado por uma chave
              <code> did:ebsi</code> e verificável via EBSI Trusted Issuers Registry.
            </p>
          </header>
        </div>
        <CredentialSample/>
      </section>

      <section>
        <header className="section-header">
          <span className="eyebrow">Triângulo de confiança</span>
          <h3 className="section-title">Emissor, utilizador e verificador</h3>
        </header>
        <TrustTriangle value={node} onChange={setNode}/>
      </section>

      <section>
        <header className="section-header">
          <span className="eyebrow">Protocolo</span>
          <h3 className="section-title">Fluxo de emissão e apresentação</h3>
        </header>
        <FlowSteps/>
      </section>

      <section className="section-card section-card-soft">
        <h3 className="section-title">Recursos para programadores</h3>
        <p>
          A PDW publicará uma SDK de referência (Android · iOS · Web) e documentação
          OpenAPI para integração com sistemas legacy. Os protocolos OID4VCI e OID4VP
          são compatíveis com qualquer carteira EUDI.
        </p>
        <ul className="link-list">
          <li><a href="https://hub.ebsi.eu/" target="_blank" rel="noopener noreferrer">EBSI Hub →</a></li>
          <li><a href="https://www.w3.org/TR/vc-data-model-2.0/" target="_blank" rel="noopener noreferrer">W3C VC Data Model 2.0 →</a></li>
          <li><a href="https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html" target="_blank" rel="noopener noreferrer">OpenID4VCI →</a></li>
        </ul>
      </section>
    </article>
  );
}

// ====== Exposed ======
function SolucaoPage({ variant = 'A' }) {
  return variant === 'B' ? <SolucaoVariantB/> : <SolucaoVariantA/>;
}

Object.assign(window, { SolucaoPage });
