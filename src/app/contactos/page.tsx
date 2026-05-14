import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadFormSection } from "@/components/sections/LeadFormSection";

export default function ContactosPage() {
  return (
    <>
      <section className="section-card">
        <SectionHeading title="Contactos e Parcerias" subtitle="Canal institucional para pilotos." />
        <p>Equipa PDW, TecMinho - Campus de Azurem, Guimaraes.</p>
      </section>
      <LeadFormSection />
    </>
  );
}
