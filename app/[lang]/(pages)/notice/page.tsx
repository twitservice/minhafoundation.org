import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary, getCommonDictionary } from "@/lib/get-dictionary";
import Breadcrumb from "@/components/breadcrumb";
import { resolveMetaImg } from "@/lib/meta";

interface NoticeItem {
  title: string;
  description: string;
  badge: string;
  url: string;
}

interface NoticeGroup {
  date: string;
  items: NoticeItem[];
}

interface NoticePagination {
  previous: string;
  next: string;
  pages: number[];
  current: number;
}

interface NoticePageData {
  title: string;
  description: string;
  meta_img?: string;
  groups: NoticeGroup[];
  pagination: NoticePagination;
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
    getDictionary<NoticePageData>(locale, 'notice'),
    getCommonDictionary(locale),
  ]);
  const metaImg = resolveMetaImg(pageData.meta_img, commonDict.images.meta_img, baseUrl);

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}/notice`;
  }

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/notice`,
      languages,
    },
      openGraph: {
        title: pageData.title,
        description: pageData.description,
        url: `${baseUrl}/${locale}/notice`,
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

export default async function NoticePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const [pageData, commonDict] = await Promise.all([
    getDictionary<NoticePageData>(locale, 'notice'),
    getCommonDictionary(locale),
  ]);

  return (
    <>
      <Breadcrumb breadcrumbImg={commonDict.images.breadcrumb} breadcrumbTitle={pageData.title} />
      <div className="bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="space-y-8">
            {pageData.groups.map((group) => (
              <section key={group.date} className="space-y-4">
                <h2 className="border-b border-gray-200 pb-3 text-lg font-semibold text-primary">{group.date}</h2>

                <div className="space-y-4">
                  {group.items.map((item, index) => (
                    <a
                      key={`${group.date}-${item.url}-${index}`}
                      href={`/${locale}${item.url}`}
                      className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-5 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:px-7"
                    >
                      <div className="min-w-0">
                        <h3 className="text-2xl font-bold text-primary">{item.title}</h3>
                        <p className="mt-2 max-w-3xl text-secondary-text">{item.description}</p>
                      </div>

                      <span className="inline-flex h-10 items-center justify-center self-start rounded-full bg-rose-100 px-5 text-sm font-semibold text-primary sm:self-center">
                        {item.badge}
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-gray-200 bg-white px-2 text-sm text-secondary-text"
            >
              {pageData.pagination.previous}
            </button>
            {pageData.pagination.pages.map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                className={`inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-sm ${
                  pageNumber === pageData.pagination.current
                    ? "border-green-700 bg-green-700 text-white"
                    : "border-gray-200 bg-white text-secondary-text"
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              type="button"
              className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-gray-200 bg-white px-2 text-sm text-secondary-text"
            >
              {pageData.pagination.next}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
