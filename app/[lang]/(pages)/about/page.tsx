import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary, getCommonDictionary } from "@/lib/get-dictionary";
import Breadcrumb from "@/components/breadcrumb";

interface AboutPageData {
  title: string;
  description: string;
  content: string;
  image_url?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://minhafoundation.org';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const pageData = await getDictionary<AboutPageData>(locale, 'about');

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}/about`;
  }

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/about`,
      languages,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const [pageData, commonDict] = await Promise.all([
    getDictionary<AboutPageData>(locale, 'about'),
    getCommonDictionary(locale),
  ]);
  
  return (
    <>
      <Breadcrumb breadcrumbImg={commonDict.images.breadcrumb} breadcrumbTitle={pageData.title} />
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
              {pageData.title}
            </h2>
            <p className="mx-auto mt-4 max-w-5xl text-lg font-semibold leading-8 text-secondary-text">
              {pageData.content}
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-3xl bg-[#344766] sm:mt-10">
            <div className="aspect-[16/7] w-full">
              <img
                src={pageData.image_url || "/cdn/assets/img/minhafoundation-slider-01.webp"}
                alt={pageData.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
