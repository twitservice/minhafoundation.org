import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary, getCommonDictionary } from "@/lib/get-dictionary";
import Breadcrumb from "@/components/breadcrumb";
import { resolveMetaImg } from "@/lib/meta";
import ZakatCalculatorForm, { type ZakatCalculatorDictionary } from "@/components/zakat/zakat-calculator-form";

interface ZakatCalculatorPageData {
  title: string;
  description: string;
  meta_img?: string;
  calculator: ZakatCalculatorDictionary;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://minhafoundation.org";

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

  const [pageData, commonDict] = await Promise.all([
    getDictionary<ZakatCalculatorPageData>(locale, "zakat-calculator"),
    getCommonDictionary(locale),
  ]);

  const metaImg = resolveMetaImg(pageData.meta_img, commonDict.images.meta_img, baseUrl);

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}/zakat-calculator`;
  }

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/zakat-calculator`,
      languages,
    },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `${baseUrl}/${locale}/zakat-calculator`,
      images: [{ url: metaImg }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageData.title,
      description: pageData.description,
      images: [metaImg],
    },
  };
}

export default async function ZakatCalculatorPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;

  const [pageData, commonDict] = await Promise.all([
    getDictionary<ZakatCalculatorPageData>(locale, "zakat-calculator"),
    getCommonDictionary(locale),
  ]);

  return (
    <>
      <Breadcrumb breadcrumbImg={commonDict.images.breadcrumb} breadcrumbTitle={pageData.title} />
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <ZakatCalculatorForm locale={locale} dictionary={pageData.calculator} />
        </div>
      </div>
    </>
  );
}
