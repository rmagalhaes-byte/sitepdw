import { SectionHeading } from "@/components/ui/SectionHeading";
import { UseCasesGrid } from "@/components/sections/UseCasesGrid";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";

export default async function CasosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <SectionHeading
        title={dict.nav.useCases}
        subtitle={dict.useCases.heading.subtitle}
      />
      <UseCasesGrid lang={lang as Locale} dict={dict} />
    </>
  );
}
