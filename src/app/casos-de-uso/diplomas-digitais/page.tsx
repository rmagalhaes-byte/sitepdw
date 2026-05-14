import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadFormSection } from "@/components/sections/LeadFormSection";

export default function DiplomasPage() {
  return (
    <>
      <section className="section-card">
        <SectionHeading
          title="Diplomas Digitais"
          subtitle="Caso prioritario para verificacao academica rapida e confiavel."
        />
        <p>
          A instituicao emite uma credencial verificavel. O aluno guarda na carteira e partilha
          seletivamente com empregadores ou outras instituicoes para verificacao imediata.
        </p>
        <ul className="simple-list">
          <li>Reducao de tempo de verificacao.</li>
          <li>Menos risco de fraude documental.</li>
          <li>Maior eficiencia administrativa.</li>
        </ul>
      </section>
      <LeadFormSection />
    </>
  );
}
