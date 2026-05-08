import { HeroInstitutional } from "@/components/sections/HeroInstitutional";
import { TrustBar } from "@/components/sections/TrustBar";
import { ValuePillars } from "@/components/sections/ValuePillars";
import { UseCasesGrid } from "@/components/sections/UseCasesGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <HeroInstitutional lang={lang as Locale} dict={dict} />
      <TrustBar dict={dict} />
      <ValuePillars dict={dict} />
      <section style={{ marginTop: 40 }}>
        <SectionHeading
          title={dict.useCases.heading.title}
          subtitle={dict.useCases.heading.subtitle}
        />
        <UseCasesGrid lang={lang as Locale} dict={dict} />
      </section>
    </>
  );
}
