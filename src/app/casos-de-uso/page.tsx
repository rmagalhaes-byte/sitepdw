import { SectionHeading } from "@/components/ui/SectionHeading";
import { UseCasesGrid } from "@/components/sections/UseCasesGrid";

export default function CasosPage() {
  return (
    <>
      <SectionHeading
        title="Casos de Uso"
        subtitle="Portfolio inicial com estado de maturidade por caso."
      />
      <UseCasesGrid />
    </>
  );
}
