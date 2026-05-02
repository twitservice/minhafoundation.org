import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary, getCommonDictionary } from "@/lib/get-dictionary";
import { resolveMetaImg } from "@/lib/meta";

interface CareerJobItem {
  title: string;
  experience: string;
  type: string;
  location: string;
  button: string;
  url: string;
}

interface ConnectCareerData {
  title: string;
  description: string;
  meta_img?: string;
  jobs: CareerJobItem[];
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
    getDictionary<ConnectCareerData>(locale, "connect-career"),
    getCommonDictionary(locale),
  ]);

  const metaImg = resolveMetaImg(pageData.meta_img, commonDict.images.meta_img, baseUrl);

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}/connect/career`;
  }

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/connect/career`,
      languages,
    },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `${baseUrl}/${locale}/connect/career`,
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

export default async function ConnectCareerPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const pageData = await getDictionary<ConnectCareerData>(locale, "connect-career");

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {pageData.jobs.map((job, index) => (
        <article key={`${job.url}-${index}`} className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
          <h3 className="text-4xl font-bold text-primary">{job.title}</h3>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div>
              <p className="text-sm font-semibold text-primary">Experience</p>
              <p className="text-secondary-text">{job.experience}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Type</p>
              <p className="text-secondary-text">{job.type}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Location</p>
              <p className="text-secondary-text">{job.location}</p>
            </div>
          </div>

          <a
            href={`/${locale}${job.url}`}
            className="mt-5 inline-flex h-10 min-w-28 items-center justify-center rounded-lg bg-green-700 px-5 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            {job.button}
          </a>
        </article>
      ))}
    </div>
  );
}
