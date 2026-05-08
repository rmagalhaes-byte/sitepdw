import { getDictionary } from '@/i18n/dictionaries';
import { Locale, locales } from '@/i18n/config';
import { PdwHeader } from '@/components/layout/PdwHeader';
import { PdwFooter } from '@/components/layout/PdwFooter';

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <PdwHeader lang={lang as Locale} dict={dict} />
      <main className="main">
        <div className="container">{children}</div>
      </main>
      <PdwFooter lang={lang as Locale} dict={dict} />
    </>
  );
}
