import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";
import type { Metadata } from "next";
import { getCommonDictionary } from "@/lib/get-dictionary";
import { resolveMetaImg } from "@/lib/meta";
import Banner, { type BannerData } from "@/components/home/banner";
import Donate, { type QuickDonateData } from "@/components/home/donate";
import Services from "@/components/home/services";
import Activities from "@/components/home/activities";
import DonationFunds from "@/components/home/donation-funds";
import SpecialActivities from "@/components/home/special-activities";
import Gallery from "@/components/home/gallery";
import BlogSection from "@/components/home/blog-section";
import JoinUs from "@/components/home/join-us";
import OurConnection from "@/components/home/our-connection";

interface HomeDictionary {
  title: string;
  description: string;
  banner: BannerData;
  heading: string;
  services: any;
  activities: any;
  donation_funds: any;
  special_activities: any;
  gallery: any;
  blog: any;
  join_us: any;
  our_connection: any;
  quick_donate: QuickDonateData;
  meta_img?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://minhafoundation.org';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const [homeDict, commonDict] = await Promise.all([
    getDictionary<HomeDictionary>(locale, 'home'),
    getCommonDictionary(locale),
  ]);
  const metaImg = resolveMetaImg(homeDict.meta_img, commonDict.images.meta_img, baseUrl);

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}`;
  }

  return {
    title: homeDict.title,
    description: homeDict.description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
    openGraph: {
      title: homeDict.title,
      description: homeDict.description,
      url: `${baseUrl}/${locale}`,
      images: [{ url: metaImg }],
    },
    twitter: {
      card: 'summary_large_image',
      title: homeDict.title,
      description: homeDict.description,
      images: [metaImg],
    },
  };
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
      <section className="w-full bg-white">
        <Banner lang={locale} dictionary={homeDict.banner} />
        <Donate lang={locale} dictionary={homeDict.quick_donate} />
      </section>
      <Services lang={locale} dictionary={homeDict.services} />
      <Activities lang={locale} dictionary={homeDict.activities} />
      <DonationFunds lang={locale} dictionary={homeDict.donation_funds} />
      <SpecialActivities lang={locale} dictionary={homeDict.special_activities} />
      <Gallery lang={locale} dictionary={homeDict.gallery} />
      <BlogSection lang={locale} dictionary={homeDict.blog} />
      <JoinUs lang={locale} dictionary={homeDict.join_us} />
      <OurConnection lang={locale} dictionary={homeDict.our_connection} />
    </>
  );
}
