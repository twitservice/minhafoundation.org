import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";
import Banner, { type BannerData } from "@/components/home/banner";
import Donate from "@/components/home/donate";
import Services from "@/components/home/services";

interface HomeDictionary {
  title: string;
  description: string;
  banner: BannerData;
  heading: string;
  services: any;
}



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
  const homeDict = await getDictionary<HomeDictionary>(locale, 'home');

  return (
    <>
      <Banner lang={locale} dictionary={homeDict.banner} />
      <Donate lang={locale} />
      <Services lang={locale} dictionary={homeDict.services} />
    </>
  );
}
