import { SectionHeading } from "@/components/ui/SectionHeading";

export default function PrivacidadePage() {
  return (
    <section className="section-card">
      <SectionHeading title="Politica de Privacidade" />
      <p>
        Este website recolhe apenas os dados submetidos voluntariamente no formulario de contacto
        para resposta institucional. Nao utilizamos rastreamento invasivo no MVP.
      </p>
    </section>
  );
}
