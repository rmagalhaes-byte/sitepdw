import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isPt = lang === "pt";
  return {
    title: isPt
      ? "Diplomas Digitais — Verificação Instantânea | PDW"
      : "Digital Diplomas — Instant Verification | PDW",
    description: isPt
      ? "Elimine a fraude e reduza 90% do tempo de verificação académica com diplomas digitais verificáveis pela PDW."
      : "Eliminate fraud and reduce 90% of academic verification time with PDW verifiable digital diplomas.",
  };
}

export default async function DiplomasPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const isPt = lang === "pt";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": isPt ? "Diplomas Digitais PDW" : "PDW Digital Diplomas",
            "description": isPt
              ? "Emissão e verificação instantânea de diplomas académicos com tecnologia W3C VC e EBSI."
              : "Instant issuance and verification of academic diplomas using W3C VC and EBSI technology.",
            "provider": { "@type": "Organization", "name": "Portuguese Digital Wallet" },
            "areaServed": "PT",
            "serviceType": "Digital Identity Verification"
          })
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

        {/* ── Back link ── */}
        <Link href={`/${lang}/casos-de-uso`} className="page-back">
          ← {isPt ? "Casos de uso" : "Use Cases"}
        </Link>

        {/* ── Page hero ── */}
        <header className="page-hero">
          <span className="eyebrow">
            {isPt ? "Caso de uso · Em produção" : "Use case · In production"}
          </span>
          <h1 className="page-hero-title">
            <span className="text-gradient">
              {isPt ? "Diplomas digitais," : "Digital diplomas,"}
            </span>
            <br/>
            {isPt ? "verificados em segundos." : "verified in seconds."}
          </h1>
          <p className="page-hero-lead">
            {isPt ? (
              <>A primeira aplicação operacional da PDW. Em colaboração com a Universidade do Minho,
              a verificação académica passa de <strong>dias ou semanas</strong> para{" "}
              <strong>segundos</strong>, sem perder validade jurídica nem reconhecimento europeu.</>
            ) : (
              <>PDW&apos;s first operational application. In collaboration with the University of Minho,
              academic verification goes from <strong>days or weeks</strong> to{" "}
              <strong>seconds</strong>, without losing legal validity or European recognition.</>
            )}
          </p>
        </header>

        {/* ── Problem / Solution ── */}
        <section className="two-col">
          <article className="section-card section-card-problem">
            <span className="callout-tag callout-tag-problem">
              {isPt ? "Problema" : "Problem"}
            </span>
            <h3 className="section-title">
              {isPt
                ? "O processo atual é lento e vulnerável"
                : "The current process is slow and vulnerable"}
            </h3>
            <p>
              {isPt
                ? "A verificação de diplomas é, hoje, um processo manual, dependente de chamadas telefónicas e emails. Demora dias ou semanas, gera encargo administrativo significativo e está exposto a fraude documental."
                : "Diploma verification today is a manual process, dependent on phone calls and emails. It takes days or weeks, generates significant administrative burden, and is exposed to document fraud."}
            </p>
            <ul className="problem-list">
              {isPt ? (
                <>
                  <li>Verificação manual em <strong>5–15 dias</strong></li>
                  <li>Dezenas de pedidos por semana por instituição</li>
                  <li>Reconhecimento transfronteiriço quase impossível</li>
                  <li>Risco real de diplomas falsificados</li>
                </>
              ) : (
                <>
                  <li>Manual verification in <strong>5–15 days</strong></li>
                  <li>Dozens of requests per week per institution</li>
                  <li>Cross-border recognition nearly impossible</li>
                  <li>Real risk of forged diplomas</li>
                </>
              )}
            </ul>
          </article>

          <article className="section-card section-card-solution">
            <span className="callout-tag">
              {isPt ? "Solução" : "Solution"}
            </span>
            <h3 className="section-title">
              {isPt
                ? "A Universidade emite, o aluno guarda, o verificador valida"
                : "University issues, student holds, verifier validates"}
            </h3>
            <p>
              {isPt
                ? "Com a PDW, a universidade emite o diploma como credencial digital assinada criptograficamente. O estudante guarda-o na sua carteira. Quando se candidata a um emprego, o recrutador valida a autenticidade através de um simples QR Code."
                : "With PDW, the university issues the diploma as a cryptographically signed digital credential. The student stores it in their wallet. When applying for a job, the recruiter validates authenticity via a simple QR Code."}
            </p>
            <ul className="solution-list">
              {isPt ? (
                <>
                  <li>Verificação em <strong>segundos</strong> via QR Code</li>
                  <li>Validação <strong>EBSI</strong> em toda a União Europeia</li>
                  <li>Divulgação seletiva — só os campos necessários</li>
                  <li>Conformidade <strong>W3C VC 2.0</strong> e <strong>eIDAS 2.0</strong></li>
                </>
              ) : (
                <>
                  <li>Verification in <strong>seconds</strong> via QR Code</li>
                  <li><strong>EBSI</strong> validation across the European Union</li>
                  <li>Selective disclosure — only the required fields</li>
                  <li><strong>W3C VC 2.0</strong> and <strong>eIDAS 2.0</strong> compliance</li>
                </>
              )}
            </ul>
          </article>
        </section>

        {/* ── Flow visual ── */}
        <section>
          <header className="section-header">
            <span className="eyebrow">{isPt ? "Fluxo end-to-end" : "End-to-end flow"}</span>
            <h3 className="section-title">
              {isPt
                ? "Como funciona, do diploma à oferta de trabalho"
                : "How it works, from diploma to job offer"}
            </h3>
          </header>
          <div className="diploma-flow-wrap">
            <ol className="diploma-flow">
              <li className="diploma-flow-step">
                <div className="dfs-icon" aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5"/>
                  </svg>
                </div>
                <div className="dfs-meta">
                  <div className="dfs-tag">{isPt ? "Passo 1" : "Step 1"}</div>
                  <div className="dfs-title">{isPt ? "Universidade emite" : "University issues"}</div>
                  <p>{isPt
                    ? "A instituição assina criptograficamente o diploma e envia-o diretamente para a PDW do estudante."
                    : "The institution cryptographically signs the diploma and sends it directly to the student's PDW."}</p>
                </div>
              </li>
              <li className="diploma-flow-arrow" aria-hidden="true">→</li>
              <li className="diploma-flow-step">
                <div className="dfs-icon" aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="3"/>
                    <path d="M16 12h.01"/>
                  </svg>
                </div>
                <div className="dfs-meta">
                  <div className="dfs-tag">{isPt ? "Passo 2" : "Step 2"}</div>
                  <div className="dfs-title">{isPt ? "Estudante guarda" : "Student stores"}</div>
                  <p>{isPt
                    ? "O diploma fica cifrado no dispositivo do utilizador. Ninguém — nem a universidade nem o Estado — pode aceder sem consentimento."
                    : "The diploma is encrypted on the user's device. Nobody — not the university nor the state — can access it without consent."}</p>
                </div>
              </li>
              <li className="diploma-flow-arrow" aria-hidden="true">→</li>
              <li className="diploma-flow-step">
                <div className="dfs-icon" aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11l3 3 8-8"/>
                    <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11"/>
                  </svg>
                </div>
                <div className="dfs-meta">
                  <div className="dfs-tag">{isPt ? "Passo 3" : "Step 3"}</div>
                  <div className="dfs-title">{isPt ? "Recrutador verifica" : "Recruiter verifies"}</div>
                  <p>{isPt
                    ? "Leitura de um QR Code valida a assinatura junto da rede EBSI em segundos, sem contactar a universidade emissora."
                    : "Scanning a QR Code validates the signature with the EBSI network in seconds, without contacting the issuing university."}</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* ── Stats ── */}
        <section>
          <header className="section-header">
            <span className="eyebrow">{isPt ? "Impacto medido" : "Measured impact"}</span>
            <h3 className="section-title">{isPt ? "Os números do piloto" : "Pilot numbers"}</h3>
            <p className="section-deck">
              {isPt
                ? "Resultados estimados a partir dos pilotos institucionais com a Universidade do Minho."
                : "Results estimated from institutional pilots with the University of Minho."}
            </p>
          </header>
          <div className="diplomas-stats">
            <div className="diplomas-stat">
              <div className="diplomas-stat-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div className="diplomas-stat-value">90 %</div>
              <div className="diplomas-stat-label">
                {isPt ? "Redução no tempo de verificação" : "Reduction in verification time"}
              </div>
            </div>
            <div className="diplomas-stat">
              <div className="diplomas-stat-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div className="diplomas-stat-value">0 %</div>
              <div className="diplomas-stat-label">
                {isPt ? "Risco de fraude documental académica" : "Academic document fraud risk"}
              </div>
            </div>
            <div className="diplomas-stat">
              <div className="diplomas-stat-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 1 0 0 7H14a3.5 3.5 0 1 1 0 7H6"/>
                </svg>
              </div>
              <div className="diplomas-stat-value">−85 %</div>
              <div className="diplomas-stat-label">
                {isPt ? "Custos administrativos por verificação" : "Administrative costs per verification"}
              </div>
            </div>
            <div className="diplomas-stat">
              <div className="diplomas-stat-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12h20"/>
                  <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/>
                </svg>
              </div>
              <div className="diplomas-stat-value">27</div>
              <div className="diplomas-stat-label">
                {isPt ? "Estados-Membros onde é reconhecido" : "EU Member States where recognized"}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="diplomas-cta">
          <div>
            <span className="eyebrow">
              {isPt ? "Próximos passos" : "Next steps"}
            </span>
            <h3 className="section-title">
              {isPt
                ? "Quer implementar diplomas digitais na sua instituição?"
                : "Want to implement digital diplomas at your institution?"}
            </h3>
            <p>
              {isPt
                ? "Marque uma sessão de demonstração de 30 minutos com a equipa da TecMinho."
                : "Schedule a 30-minute demo session with the TecMinho team."}
            </p>
          </div>
          <Link href={`/${lang}/contactos`} className="cta">
            {isPt ? "Solicitar demonstração" : "Request a demo"}
          </Link>
        </section>

        {/* ── Lead form ── */}
        <LeadFormSection dict={dict} />
      </div>
    </>
  );
}
