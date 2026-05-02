import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary, getCommonDictionary } from "@/lib/get-dictionary";
import Breadcrumb from "@/components/breadcrumb";
import Link from "next/link";

interface ActivityItem {
  title: string;
  description: string;
  image_url: string;
  badge: string;
  slug: string;
}

interface ActivitiesPageData {
  title: string;
  description: string;
  content: string;
  badge: string;
  see_details: string;
  items: ActivityItem[];
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
  const pageData = await getDictionary<ActivitiesPageData>(locale, 'activities');

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}/activities`;
  }

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/activities`,
      languages,
    },
  };
}

export default async function ActivitiesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const [pageData, commonDict] = await Promise.all([
    getDictionary<ActivitiesPageData>(locale, 'activities'),
    getCommonDictionary(locale),
  ]);

  return (
    <>
      <Breadcrumb breadcrumbImg={commonDict.images.breadcrumb} breadcrumbTitle={pageData.title} />
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pageData.items.map((item) => (
              <div
                key={item.slug}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Card image */}
                <div className="aspect-4/3 w-full overflow-hidden bg-[#344766]">
                  <img
                    src={item.image_url || "https://placehold.co/600x400/344766/344766"}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Card body */}
                <div className="p-4">
                  {/* Badge */}
                  <span className="mb-2 inline-flex items-center gap-1 text-xs font-semibold text-rose-600">
                    <span className="inline-block h-2 w-2 rounded-sm bg-rose-600" />
                    {item.badge}
                  </span>

                  {/* Title */}
                  <h3 className="text-base font-bold leading-snug text-primary">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-secondary-text">
                    {item.description}
                  </p>

                  {/* Button */}
                  <Link
                    href={`/${locale}/activities/${item.slug}`}
                    className="mt-4 inline-flex w-full items-center justify-center gap-1 rounded-lg bg-[#2d6a4f] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    {pageData.see_details}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
