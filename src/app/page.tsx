import { HeroInstitutional } from "@/components/sections/HeroInstitutional";
import { TrustBar } from "@/components/sections/TrustBar";
import { ValuePillars } from "@/components/sections/ValuePillars";
import { UseCasesGrid } from "@/components/sections/UseCasesGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function HomePage() {
  return (
    <>
      <HeroInstitutional />
      <TrustBar />
      <ValuePillars />
      <section style={{ marginTop: 20 }}>
        <SectionHeading
          title="Casos de uso prioritarios"
          subtitle="Implementacao gradual com foco em valor institucional."
        />
        <UseCasesGrid />
      </section>
    </>
  );
}
