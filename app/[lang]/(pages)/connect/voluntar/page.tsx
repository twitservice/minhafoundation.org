import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary, getCommonDictionary } from "@/lib/get-dictionary";
import { resolveMetaImg } from "@/lib/meta";

interface ConnectVoluntarData {
  title: string;
  description: string;
  meta_img?: string;
  left: {
    heading: string;
    description: string;
    image_url: string;
    image_alt: string;
    quote: string;
    benefits_title: string;
    benefits: string[];
  };
  application: {
    title: string;
    description: string;
    sections: string[];
    required_note: string;
    submit: string;
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
    getDictionary<ConnectVoluntarData>(locale, "connect-voluntar"),
    getCommonDictionary(locale),
  ]);

  const metaImg = resolveMetaImg(pageData.meta_img, commonDict.images.meta_img, baseUrl);

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}/connect/voluntar`;
  }

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/connect/voluntar`,
      languages,
    },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `${baseUrl}/${locale}/connect/voluntar`,
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

export default async function ConnectVoluntarPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const pageData = await getDictionary<ConnectVoluntarData>(locale, "connect-voluntar");

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.2fr)_420px]">
        <section className="space-y-4">
          <h2 className="text-4xl font-bold text-primary">{pageData.left.heading}</h2>
          <p className="text-secondary-text">{pageData.left.description}</p>

          <div className="overflow-hidden rounded-2xl bg-[#344766] shadow-sm">
            <img src={pageData.left.image_url} alt={pageData.left.image_alt} className="aspect-video w-full object-cover" />
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl bg-rose-50 p-6">
            <h3 className="text-3xl font-bold text-primary">{pageData.left.benefits_title}</h3>
            <ul className="mt-4 space-y-2">
              {pageData.left.benefits.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-secondary-text">
                  <span className="mt-1.5 inline-flex h-2.5 w-2.5 rounded-full bg-green-700" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <blockquote className="rounded-2xl bg-rose-50 p-6 text-lg font-semibold text-primary">{pageData.left.quote}</blockquote>
        </aside>
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="rounded-t-2xl bg-[#99003f] px-6 py-5 text-white">
          <h3 className="text-3xl font-bold">{pageData.application.title}</h3>
          <p className="mt-2 text-white/90">{pageData.application.description}</p>
        </div>

        <div className="space-y-5 p-6">
          {pageData.application.sections.map((section, index) => (
            <div key={index} className="rounded-xl border border-gray-200 p-4">
              <h4 className="text-xl font-semibold text-primary">{section}</h4>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input className="h-11 rounded-lg border border-gray-200 bg-gray-50 px-3" placeholder={section} />
                <input className="h-11 rounded-lg border border-gray-200 bg-gray-50 px-3" placeholder={section} />
              </div>
            </div>
          ))}

          <p className="text-sm font-semibold text-rose-600">{pageData.application.required_note}</p>
          <button type="button" className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-green-700 px-5 text-sm font-semibold text-white transition hover:bg-green-800">
            {pageData.application.submit}
          </button>
        </div>
      </section>
    </div>
  );
}
