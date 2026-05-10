import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary, getCommonDictionary } from "@/lib/get-dictionary";
import Breadcrumb from "@/components/breadcrumb";
import { resolveMetaImg } from "@/lib/meta";

interface BlogItem {
  title: string;
  excerpt: string;
  date: string;
  image_url: string;
  alt: string;
  url: string;
}

interface PaginationData {
  previous: string;
  next: string;
  pages: number[];
  current: number;
}

interface BlogsPageData {
  title: string;
  description: string;
  meta_img?: string;
  sections: {
    latest: string;
    popular: string;
  };
  featured: BlogItem;
  popular_items: BlogItem[];
  posts: BlogItem[];
  pagination: PaginationData;
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
    getDictionary<BlogsPageData>(locale, 'blogs'),
    getCommonDictionary(locale),
  ]);
  const metaImg = resolveMetaImg(pageData.meta_img, commonDict.images.meta_img, baseUrl);

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}/blogs`;
  }

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/blogs`,
      languages,
    },
      openGraph: {
        title: pageData.title,
        description: pageData.description,
        url: `${baseUrl}/${locale}/blogs`,
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

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const [pageData, commonDict] = await Promise.all([
    getDictionary<BlogsPageData>(locale, 'blogs'),
    getCommonDictionary(locale),
  ]);

  return (
    <>
      <Breadcrumb breadcrumbImg={commonDict.images.breadcrumb} breadcrumbTitle={pageData.title} />
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.45fr)_360px] lg:items-start">
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-primary">{pageData.sections.latest}</h2>
              <a
                href={`/${locale}${pageData.featured.url}`}
                className="block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <img
                  src={pageData.featured.image_url}
                  alt={pageData.featured.alt}
                  className="aspect-video w-full object-cover"
                />
                <div className="space-y-3 p-5 md:p-6">
                  <h3 className="text-4xl font-bold leading-tight text-primary">{pageData.featured.title}</h3>
                  <p className="text-secondary-text">{pageData.featured.excerpt}</p>
                  <p className="text-sm font-semibold text-rose-500">{pageData.featured.date}</p>
                </div>
              </a>
            </section>

            <aside className="space-y-4">
              <h2 className="text-3xl font-bold text-primary">{pageData.sections.popular}</h2>
              <div className="space-y-3">
                {pageData.popular_items.map((item) => (
                  <a
                    key={`${item.url}-${item.date}`}
                    href={`/${locale}${item.url}`}
                    className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md"
                  >
                    <img src={item.image_url} alt={item.alt} className="aspect-square w-full rounded-lg object-cover" />
                    <div className="min-w-0">
                      <h3 className="line-clamp-2 text-xl font-semibold text-primary">{item.title}</h3>
                      <p className="mt-1 line-clamp-3 text-sm text-secondary-text">{item.excerpt}</p>
                      <p className="mt-2 text-xs font-semibold text-rose-500">{item.date}</p>
                    </div>
                  </a>
                ))}
              </div>
            </aside>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {pageData.posts.map((item) => (
              <a
                key={`${item.url}-${item.date}`}
                href={`/${locale}${item.url}`}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <img src={item.image_url} alt={item.alt} className="aspect-4/3 w-full object-cover" />
                <div className="space-y-2 p-4">
                  <h3 className="line-clamp-2 text-xl font-semibold text-primary">{item.title}</h3>
                  <p className="line-clamp-4 text-sm text-secondary-text">{item.excerpt}</p>
                  <p className="text-xs font-semibold text-rose-500">{item.date}</p>
                </div>
              </a>
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
