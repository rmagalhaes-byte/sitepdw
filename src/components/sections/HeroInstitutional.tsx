import Link from "next/link";

export function HeroInstitutional() {
  return (
    <section className="hero">
      <h1>A carteira digital europeia para a educacao e muito mais</h1>
      <p>
        Projeto portugues alinhado com eIDAS 2.0 para emissao, partilha e verificacao
        de credenciais digitais com foco em confianca institucional.
      </p>
      <div className="btn-row">
        <Link href="/casos-de-uso/diplomas-digitais" className="cta">
          Ver demonstracao
        </Link>
        <Link href="/contactos" className="btn-secondary">
          Solicitar acesso antecipado
        </Link>
      </div>
    </section>
  );
}
