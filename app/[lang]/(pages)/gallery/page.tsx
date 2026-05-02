import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary, getCommonDictionary } from "@/lib/get-dictionary";
import Breadcrumb from "@/components/breadcrumb";
import { resolveMetaImg } from "@/lib/meta";
import GalleryBrowser, { type GalleryBrowserData } from "@/components/gallery/gallery-browser";

interface GalleryPageData {
  title: string;
  description: string;
  meta_img?: string;
  gallery: GalleryBrowserData;
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
  const [pageData, commonDict] = await Promise.all([
    getDictionary<GalleryPageData>(locale, 'gallery'),
    getCommonDictionary(locale),
  ]);
  const metaImg = resolveMetaImg(pageData.meta_img, commonDict.images.meta_img, baseUrl);

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}/gallery`;
  }

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/gallery`,
      languages,
    },
      openGraph: {
        title: pageData.title,
        description: pageData.description,
        url: `${baseUrl}/${locale}/gallery`,
        images: [{ url: metaImg }],
      },
      twitter: {
        card: 'summary_large_image',
        title: pageData.title,
        description: pageData.description,
        images: [metaImg],
      },
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const [pageData, commonDict] = await Promise.all([
    getDictionary<GalleryPageData>(locale, 'gallery'),
    getCommonDictionary(locale),
  ]);

  return (
    <>
      <Breadcrumb breadcrumbImg={commonDict.images.breadcrumb} breadcrumbTitle={pageData.title} />
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <GalleryBrowser data={pageData.gallery} />
        </div>
      </div>
    </>
  );
}
