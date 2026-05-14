import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Sobre o Projeto | Portuguese Digital Wallet",
  description:
    "Iniciativa de I&D liderada pela TecMinho para a carteira digital europeia, alinhada com eIDAS 2.0 e foco no setor da educacao."
};

const mission =
  "Construir uma carteira digital portuguesa, interoperavel e centrada na pessoa, que torne a emissao, partilha e verificacao de credenciais digitais simples, segura e conforme com a regulamentacao europeia.";

const vision =
  "Tornar Portugal uma referencia na adocao da EUDI Wallet, comecando pelo setor da educacao e expandindo para identidade, saude, mobilidade e servicos publicos.";

const team = [
  { name: "Coordenacao Cientifica", role: "Universidade do Minho", initials: "UM" },
  { name: "Direcao de Projeto", role: "TecMinho - Interface UMinho", initials: "TM" },
  { name: "Arquitetura Tecnica", role: "Equipa de Engenharia PDW", initials: "AT" },
  { name: "Investigacao e Conformidade", role: "Equipa I&D eIDAS / EUDI", initials: "IC" }
];

const partners = [
  { name: "Universidade do Minho", role: "Instituicao lider", logo: "/uminho_logo.png" },
  { name: "TecMinho", role: "Interface de transferencia", logo: "/tcminho-logo.png" },
  { name: "EBSI", role: "Infraestrutura europeia de blockchain", logo: "/logo-ebsi.png" }
];

const compliancePoints = [
  {
    title: "Alinhamento eIDAS 2.0",
    text: "Arquitetura preparada para o regulamento europeu de identidade digital e para a EUDI Wallet."
  },
  {
    title: "Credenciais verificaveis",
    text: "Suporte a normas abertas (W3C VC, OpenID4VC) para interoperabilidade transfronteirica."
  },
  {
    title: "Privacidade por design",
    text: "Minimizacao de dados, divulgacao seletiva e controlo do titular sobre a partilha."
  },
  {
    title: "Soberania institucional",
    text: "Emissao e verificacao mantidas no perimetro das entidades portuguesas envolvidas."
  }
];

export default function SobrePage() {
  return (
    <>
      <section className="page-hero">
        <span className="status status-rd">Projeto I&amp;D ativo</span>
        <h1>Sobre a Portuguese Digital Wallet</h1>
        <p>
          Iniciativa de investigacao e desenvolvimento liderada pela TecMinho, em
          articulacao com a Universidade do Minho, para concretizar uma carteira digital
          portuguesa alinhada com a estrategia europeia eIDAS 2.0 e a EUDI Wallet.
        </p>
      </section>

      <section className="block">
        <SectionHeading
          title="Missao e Visao"
          subtitle="O que nos move e onde queremos chegar."
        />
        <div className="grid-2">
          <article className="info-card">
            <span className="info-card-eyebrow">Missao</span>
            <p>{mission}</p>
          </article>
          <article className="info-card">
            <span className="info-card-eyebrow">Visao</span>
            <p>{vision}</p>
          </article>
        </div>
      </section>

      <section className="block">
        <SectionHeading
          title="Contexto do projeto"
          subtitle="Enquadramento nacional e europeu."
        />
        <div className="section-card prose">
          <p>
            A Portuguese Digital Wallet (PDW) responde ao desafio europeu de dotar cada
            cidadao de uma carteira digital de identidade, prevista no Regulamento eIDAS 2.0
            e materializada na EUDI Wallet. Portugal, atraves de instituicoes academicas e
            de transferencia de tecnologia, posiciona-se para liderar a adocao nacional com
            um caso de uso ancorado na educacao: o diploma digital verificavel.
          </p>
          <p>
            O projeto e desenvolvido em ambiente de investigacao aplicada, com governanca
            partilhada entre a Universidade do Minho e a TecMinho, e com colaboracao tecnica
            de parceiros do ecossistema portugues de inovacao digital.
          </p>
        </div>
      </section>

      <section className="block">
        <SectionHeading
          title="Equipa nuclear"
          subtitle="Quem lidera e executa o projeto."
        />
        <div className="team-grid">
          {team.map((person) => (
            <article key={person.name} className="team-card">
              <div className="team-avatar" aria-hidden="true">
                {person.initials}
              </div>
              <h3>{person.name}</h3>
              <p>{person.role}</p>
            </article>
          ))}
        </div>
        <p className="block-note">
          Identificacao nominal dos membros sera publicada apos validacao institucional.
        </p>
      </section>

      <section className="block">
        <SectionHeading
          title="Parceiros institucionais"
          subtitle="Entidades envolvidas no projeto."
        />
        <div className="partner-grid">
          {partners.map((partner) => (
            <article key={partner.name} className="partner-card">
              <div className="partner-logo-img">
                <Image
                  src={partner.logo}
                  alt={`Logo ${partner.name}`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <strong>{partner.name}</strong>
              <span>{partner.role}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="block">
        <SectionHeading
          title="Conformidade eIDAS 2.0"
          subtitle="O que isto significa em linguagem acessivel."
        />
        <div className="compliance-grid">
          {compliancePoints.map((item) => (
            <article key={item.title} className="compliance-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-block">
        <h2>Quer saber mais sobre o projeto?</h2>
        <p>
          Estamos disponiveis para apresentacoes institucionais e para discutir cenarios de
          adocao com universidades, entidades publicas e parceiros tecnologicos.
        </p>
        <div className="btn-row">
          <Link href="/contactos" className="cta">
            Falar com a equipa
          </Link>
          <Link href="/solucao" className="btn-secondary">
            Conhecer a solucao
          </Link>
        </div>
      </section>
    </>
  );
}
