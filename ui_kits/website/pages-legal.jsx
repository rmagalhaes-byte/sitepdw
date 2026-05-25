// PDW · Páginas legais — Privacidade & Termos
// Variant A: Print-ready, single-column, numbered clauses, justified
// Variant B: Two-column with TOC sidebar (web-optimized, still typographic)

// ====== Content ======
const PRIVACIDADE = {
  title: "Política de Privacidade",
  lastUpdated: "14 de maio de 2026",
  preamble: "A Portuguese Digital Wallet (PDW) respeita a soberania digital dos seus utilizadores. Esta política descreve, de forma transparente, que dados são tratados neste sítio institucional, com que finalidade e por quanto tempo, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD).",
  sections: [
    {
      id: "responsavel",
      title: "1 · Responsável pelo tratamento",
      body: [
        "O responsável pelo tratamento dos dados pessoais recolhidos através deste sítio é a TecMinho — Associação Universidade-Empresa para o Desenvolvimento, com sede no Campus de Azurém, Guimarães, Portugal, na qualidade de coordenadora institucional do projeto PDW."
      ]
    },
    {
      id: "dados-recolhidos",
      title: "2 · Dados recolhidos",
      body: [
        "Recolhemos exclusivamente os dados voluntariamente submetidos através do formulário de contacto institucional: nome, instituição, endereço de correio eletrónico e mensagem.",
        "Não recolhemos identificadores biométricos, dados de localização precisa, nem informação de qualquer outra natureza que não tenha sido explicitamente fornecida pelo utilizador."
      ]
    },
    {
      id: "finalidade",
      title: "3 · Finalidade e base legal",
      body: [
        "Os dados destinam-se exclusivamente a responder a pedidos de informação institucional, agendamento de demonstrações e exploração de parcerias.",
        "A base legal para o tratamento é o consentimento expresso do utilizador no momento da submissão, nos termos do artigo 6.º, n.º 1, alínea a) do RGPD."
      ]
    },
    {
      id: "conservacao",
      title: "4 · Conservação e segurança",
      body: [
        "Os dados são conservados pelo período estritamente necessário à finalidade prevista, não excedendo 24 meses após o último contacto, salvo obrigação legal em contrário.",
        "Aplicamos medidas técnicas e organizativas adequadas para garantir a confidencialidade e integridade da informação."
      ]
    },
    {
      id: "direitos",
      title: "5 · Direitos do titular dos dados",
      body: [
        "O utilizador pode, a qualquer momento, exercer os direitos de acesso, retificação, apagamento, limitação do tratamento, portabilidade e oposição.",
        "Para o exercício destes direitos, o utilizador deverá contactar a TecMinho através do endereço indicado no fim deste documento. As reclamações podem ser dirigidas à Comissão Nacional de Proteção de Dados (CNPD)."
      ]
    },
    {
      id: "subcontratantes",
      title: "6 · Subcontratantes",
      body: [
        "A entrega de mensagens transacionais (confirmações de contacto) é assegurada por subcontratantes técnicos com sede na União Europeia, sujeitos a contratos de tratamento de dados em conformidade com o artigo 28.º do RGPD."
      ]
    },
    {
      id: "alteracoes",
      title: "7 · Alterações a esta política",
      body: [
        "Esta política pode ser atualizada para refletir alterações legais, técnicas ou de governação. A data da última atualização figura no início deste documento."
      ]
    }
  ],
  contact: "Para questões de privacidade, contacte rmagalhaes@tecminho.uminho.pt."
};

const TERMOS = {
  title: "Termos de Utilização",
  lastUpdated: "14 de maio de 2026",
  preamble: "Os presentes termos regulam a utilização do sítio institucional da Portuguese Digital Wallet (PDW), gerido pela TecMinho no âmbito do consórcio da Agenda Mobilizadora «Descentralizar Portugal com Blockchain».",
  sections: [
    {
      id: "objeto",
      title: "1 · Objeto",
      body: [
        "Este sítio tem natureza informativa e divulga o projeto PDW, o seu enquadramento estratégico, casos de uso e oportunidades de parceria institucional."
      ]
    },
    {
      id: "uso-marca",
      title: "2 · Utilização da marca e conteúdos",
      body: [
        "A utilização da marca PDW e dos conteúdos associados — incluindo, sem limitação, textos, imagens, logótipos e diagramas — está sujeita a autorização prévia e expressa da TecMinho e dos parceiros do consórcio Agenda Blockchain.PT.",
        "É vedada a reprodução, distribuição ou modificação dos conteúdos para fins comerciais sem autorização escrita."
      ]
    },
    {
      id: "limitacao",
      title: "3 · Limitação de responsabilidade",
      body: [
        "A informação é disponibilizada «tal como está», sem garantias de atualização imediata em relação ao estado de desenvolvimento técnico do projeto.",
        "A TecMinho não pode ser responsabilizada por decisões tomadas com base no conteúdo informativo deste sítio."
      ]
    },
    {
      id: "ligacoes",
      title: "4 · Ligações para sítios externos",
      body: [
        "Este sítio pode incluir hiperligações para sítios geridos por terceiros (parceiros institucionais, financiadores, padrões europeus). A TecMinho não controla esses sítios e não se responsabiliza pelo seu conteúdo."
      ]
    },
    {
      id: "direitos-autor",
      title: "5 · Direitos de autor",
      body: [
        "Todos os direitos relativos a textos, imagens, logótipos, diagramas e demais conteúdos publicados encontram-se reservados à TecMinho e aos parceiros do consórcio."
      ]
    },
    {
      id: "lei-aplicavel",
      title: "6 · Lei aplicável e foro competente",
      body: [
        "A interpretação e execução dos presentes termos regem-se pela lei portuguesa. Os litígios serão submetidos ao foro da Comarca de Braga, com expressa renúncia a qualquer outro."
      ]
    }
  ],
  contact: "Em caso de dúvida sobre estes termos, contacte rmagalhaes@tecminho.uminho.pt."
};

// ====== Variant A · Print-ready single column ======
function LegalVariantA({ doc }) {
  return (
    <article className="legal-page legal-A">
      <header className="legal-header">
        <span className="eyebrow">Documento legal</span>
        <h1 className="legal-title">{doc.title}</h1>
        <div className="legal-meta">
          <span>Portuguese Digital Wallet</span>
          <span aria-hidden="true">·</span>
          <span>Última atualização: <strong>{doc.lastUpdated}</strong></span>
        </div>
      </header>

      <p className="legal-preamble">{doc.preamble}</p>

      {doc.sections.map(s => (
        <section key={s.id} id={s.id} className="legal-section">
          <h2 className="legal-section-title">{s.title}</h2>
          {s.body.map((p, i) => <p key={i} className="legal-p">{p}</p>)}
        </section>
      ))}

      <footer className="legal-footer">
        <p>{doc.contact}</p>
        <p className="legal-sig">
          TecMinho · Campus de Azurém, Guimarães, Portugal · {new Date().getFullYear()}
        </p>
      </footer>
    </article>
  );
}

// ====== Variant B · Two-column with TOC sidebar ======
function LegalVariantB({ doc }) {
  const [active, setActive] = React.useState(doc.sections[0].id);
  return (
    <article className="legal-page legal-B">
      <header className="legal-header">
        <span className="eyebrow">Documento legal</span>
        <h1 className="legal-title">{doc.title}</h1>
        <div className="legal-meta">
          <span>Portuguese Digital Wallet</span>
          <span aria-hidden="true">·</span>
          <span>Última atualização: <strong>{doc.lastUpdated}</strong></span>
        </div>
      </header>

      <p className="legal-preamble">{doc.preamble}</p>

      <div className="legal-grid">
        <aside className="legal-toc" aria-label="Índice">
          <span className="eyebrow">Índice</span>
          <ol>
            {doc.sections.map(s => (
              <li key={s.id} className={active === s.id ? 'is-active' : ''}>
                <a href={`#${s.id}`} onClick={(e) => { e.preventDefault(); setActive(s.id); document.getElementById(s.id)?.scrollIntoView({ block: 'start' }); }}>{s.title}</a>
              </li>
            ))}
          </ol>
        </aside>

        <div className="legal-body">
          {doc.sections.map(s => (
            <section key={s.id} id={s.id} className="legal-section">
              <h2 className="legal-section-title">{s.title}</h2>
              {s.body.map((p, i) => <p key={i} className="legal-p">{p}</p>)}
            </section>
          ))}
          <footer className="legal-footer">
            <p>{doc.contact}</p>
            <p className="legal-sig">
              TecMinho · Campus de Azurém, Guimarães, Portugal · {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      </div>
    </article>
  );
}

// ====== Exposed ======
function PrivacidadePage({ variant = 'A' }) {
  return variant === 'B' ? <LegalVariantB doc={PRIVACIDADE}/> : <LegalVariantA doc={PRIVACIDADE}/>;
}
function TermosPage({ variant = 'A' }) {
  return variant === 'B' ? <LegalVariantB doc={TERMOS}/> : <LegalVariantA doc={TERMOS}/>;
}

Object.assign(window, { PrivacidadePage, TermosPage });
