/**
 * pdw-site-v2/src/components/sections/FeaturedCase.tsx
 *
 * NOVO. Callout "Em destaque" usado no TOPO da página /casos-de-uso.
 * Foto real wallet-mockup.png à esquerda + métricas grandes à direita.
 *
 * Esta versão substituiu a antiga DiplomaCaseSection na home; agora
 * o home volta a ter a versão interativa, e esta versão editorial
 * vive na página de Casos para reforçar a prova institucional.
 */
import Image from "next/image";
import Link from "next/link";

interface FeaturedCaseProps {
  lang: string;
}

export function FeaturedCase({ lang }: FeaturedCaseProps) {
  return (
    <section className="diploma-case-editorial featured-case">
      <div className="diploma-case-photo">
        <Image
          src="/wallet-mockup.png"
          alt={
            lang === "pt"
              ? "Aplicação PDW a mostrar diploma da Universidade do Minho"
              : "PDW app showing University of Minho diploma"
          }
          width={520}
          height={650}
          loading="lazy"
        />
        <div className="diploma-case-photo-tag">
          <span aria-hidden="true">●</span>{" "}
          {lang === "pt" ? "Em produção · 2026" : "In production · 2026"}
        </div>
      </div>
      <div className="diploma-case-content">
        <span className="diploma-case-eyebrow">
          {lang === "pt" ? "Caso em destaque" : "Featured case"}
        </span>
        <h2 className="diploma-case-title">
          {lang === "pt" ? (
            <>
              A Universidade do Minho
              <br />
              já emite diplomas digitais.
            </>
          ) : (
            <>
              University of Minho is already
              <br />
              issuing digital diplomas.
            </>
          )}
        </h2>
        <p className="diploma-case-lead">
          {lang === "pt" ? (
            <>
              A primeira aplicação operacional da PDW. <strong>~12 000 diplomas/ano</strong>{" "}
              emitidos no formato W3C Verifiable Credential, assinados com chave{" "}
              <code>did:ebsi</code> e reconhecidos em <strong>27 Estados-Membros</strong> sem
              novos acordos bilaterais.
            </>
          ) : (
            <>
              The first operational PDW application. <strong>~12,000 diplomas/year</strong>{" "}
              issued in W3C Verifiable Credential format, signed with a <code>did:ebsi</code>{" "}
              key and recognised in <strong>27 Member States</strong> without new bilateral
              agreements.
            </>
          )}
        </p>
        <div className="diploma-case-metrics">
          <div>
            <div className="diploma-case-metric-num">90 %</div>
            <div className="diploma-case-metric-lbl">
              {lang === "pt" ? (
                <>
                  Menos tempo
                  <br />
                  de verificação
                </>
              ) : (
                <>
                  Less verification
                  <br />
                  time
                </>
              )}
            </div>
          </div>
          <div>
            <div className="diploma-case-metric-num">−85 %</div>
            <div className="diploma-case-metric-lbl">
              {lang === "pt" ? (
                <>
                  Encargo
                  <br />
                  administrativo
                </>
              ) : (
                <>
                  Administrative
                  <br />
                  burden
                </>
              )}
            </div>
          </div>
          <div>
            <div className="diploma-case-metric-num">0 %</div>
            <div className="diploma-case-metric-lbl">
              {lang === "pt" ? (
                <>
                  Risco
                  <br />
                  de fraude
                </>
              ) : (
                <>
                  Fraud
                  <br />
                  risk
                </>
              )}
            </div>
          </div>
        </div>
        <Link
          href={`/${lang}/casos-de-uso/diplomas-digitais`}
          className="diploma-case-link"
        >
          {lang === "pt" ? "Ver o caso completo" : "See the full case"} →
        </Link>
      </div>
    </section>
  );
}
