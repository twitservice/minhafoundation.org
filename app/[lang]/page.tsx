import { i18n, type Locale } from "@/lib/i18n-config";
import { getHomeDictionary } from "@/lib/get-dictionary";
import Banner from "@/components/home/banner";

// Generate static params for all locales
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const homeDict = await getHomeDictionary(locale);

  return (
    <>
      <Banner lang={locale} dictionary={homeDict} />

      <h1>
        {homeDict.heading}
      </h1>
    </>
  );
}
