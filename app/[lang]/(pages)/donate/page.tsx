import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary, getCommonDictionary } from "@/lib/get-dictionary";
import Breadcrumb from "@/components/breadcrumb";
import { resolveMetaImg } from "@/lib/meta";
import Link from "next/link";

interface DonateItem {
  title: string;
  description: string;
  button_text: string;
  url: string;
}

interface DonatePageData {
  title: string;
  description: string;
  subtitle?: string;
  meta_img?: string;
  items: DonateItem[];
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
    getDictionary<DonatePageData>(locale, 'donate'),
    getCommonDictionary(locale),
  ]);
  const metaImg = resolveMetaImg(pageData.meta_img, commonDict.images.meta_img, baseUrl);

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}/donate`;
  }

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/donate`,
      languages,
    },
      openGraph: {
        title: pageData.title,
        description: pageData.description,
        url: `${baseUrl}/${locale}/donate`,
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

export default async function DonatePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const [pageData, commonDict] = await Promise.all([
    getDictionary<DonatePageData>(locale, 'donate'),
    getCommonDictionary(locale),
  ]);

  return (
    <>
      <Breadcrumb breadcrumbImg={commonDict.images.breadcrumb} breadcrumbTitle={pageData.title} />
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {pageData.subtitle ? (
            <p className="mx-auto mb-8 max-w-3xl text-center text-secondary-text">{pageData.subtitle}</p>
          ) : null}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pageData.items.slice(0, 6).map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                    <path d="M12 2c.28 2.5-1.2 4.02-2.4 5.25C8.22 8.62 7 9.88 7 12a5 5 0 0 0 10 0c0-1.98-1.01-3.16-2.18-4.53-.93-1.1-1.98-2.34-2.32-4.47-.82.88-1.22 1.87-1.2 2.98.04 1.52-.67 2.48-1.5 3.34-.58.6-1.22 1.27-1.5 2.18-.5-2.12.7-3.66 1.8-5.06C11.2 5.03 12.15 3.83 12 2Zm0 19a3 3 0 0 1-3-3c0-1.36.73-2.2 1.52-3.1.47-.54.95-1.08 1.28-1.76.28.75.76 1.33 1.2 1.86.76.9 1.5 1.78 1.5 3A3 3 0 0 1 12 21Z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-primary">{item.title}</h3>
                <p className="mt-3 min-h-18 text-sm leading-6 text-secondary-text">{item.description}</p>

                <Link
                  href={`/${locale}${item.url}`}
                  className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-lg bg-green-700 px-4 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  {item.button_text}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
