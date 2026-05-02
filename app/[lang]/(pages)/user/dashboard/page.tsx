import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary, getCommonDictionary } from "@/lib/get-dictionary";
import { resolveMetaImg } from "@/lib/meta";

interface DashboardStat {
  label: string;
  value: string;
  color: string;
}

interface UserDashboardData {
  title: string;
  description: string;
  meta_img?: string;
  hero: {
    title: string;
    description: string;
    button: string;
  };
  acknowledgment: {
    text: string;
    button: string;
  };
  profile: {
    name: string;
    id_label: string;
    id_value: string;
    edit: string;
    stats: DashboardStat[];
  };
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
    getDictionary<UserDashboardData>(locale, "user-dashboard"),
    getCommonDictionary(locale),
  ]);
  const metaImg = resolveMetaImg(pageData.meta_img, commonDict.images.meta_img, baseUrl);

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}/user/dashboard`;
  }

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/user/dashboard`,
      languages,
    },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `${baseUrl}/${locale}/user/dashboard`,
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

export default async function UserDashboardPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const pageData = await getDictionary<UserDashboardData>(locale, "user-dashboard");

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-[#0f4e22] via-[#1a7a34] to-[#0f4e22] p-8 text-white shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold">{pageData.hero.title}</h2>
            <p className="mt-3 text-white/90">{pageData.hero.description}</p>
          </div>
          <button type="button" className="inline-flex h-11 items-center justify-center rounded-xl bg-[#99003f] px-6 text-sm font-semibold text-white">
            {pageData.hero.button}
          </button>
        </div>
      </section>

      <section className="rounded-2xl bg-rose-50 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xl font-semibold text-primary">{pageData.acknowledgment.text}</p>
          <button type="button" className="inline-flex h-11 min-w-40 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-white">
            {pageData.acknowledgment.button}
          </button>
        </div>
      </section>

      <section className="rounded-2xl bg-rose-50 p-8 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-500 text-white">
              <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current" aria-hidden>
                <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-6xl font-bold text-primary">{pageData.profile.name}</h3>
              <p className="mt-1 text-2xl font-semibold text-primary">
                {pageData.profile.id_label}:{pageData.profile.id_value}
              </p>
            </div>
          </div>
          <button type="button" className="inline-flex h-11 items-center justify-center rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-primary">
            {pageData.profile.edit}
          </button>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pageData.profile.stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-4 rounded-xl bg-white p-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-white" style={{ backgroundColor: stat.color }}>
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
                    <path d="M12 2c.28 2.5-1.2 4.02-2.4 5.25C8.22 8.62 7 9.88 7 12a5 5 0 0 0 10 0c0-1.98-1.01-3.16-2.18-4.53-.93-1.1-1.98-2.34-2.32-4.47-.82.88-1.22 1.87-1.2 2.98.04 1.52-.67 2.48-1.5 3.34-.58.6-1.22 1.27-1.5 2.18-.5-2.12.7-3.66 1.8-5.06C11.2 5.03 12.15 3.83 12 2Z" />
                  </svg>
                </span>
                <div>
                  <p className="text-lg font-semibold text-primary">{stat.label}</p>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
