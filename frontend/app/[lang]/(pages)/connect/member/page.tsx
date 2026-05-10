import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary, getCommonDictionary } from "@/lib/get-dictionary";
import { resolveMetaImg } from "@/lib/meta";

interface ConnectMemberData {
  title: string;
  description: string;
  meta_img?: string;
  left: {
    heading: string;
    image_url: string;
    image_alt: string;
    paragraphs: string[];
    highlight_title: string;
    highlights: string[];
  };
  form: {
    title: string;
    description: string;
    tabs: {
      lifetime_member: string;
      donor_member: string;
    };
    minimum_donation: string;
    fields: string[];
    payment_options: string[];
    button: string;
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
    getDictionary<ConnectMemberData>(locale, "connect-member"),
    getCommonDictionary(locale),
  ]);

  const metaImg = resolveMetaImg(pageData.meta_img, commonDict.images.meta_img, baseUrl);

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}/connect/member`;
  }

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/connect/member`,
      languages,
    },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `${baseUrl}/${locale}/connect/member`,
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

export default async function ConnectMemberPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const pageData = await getDictionary<ConnectMemberData>(locale, "connect-member");

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.2fr)_420px]">
      <section className="space-y-5">
        <h2 className="text-4xl font-bold text-primary">{pageData.left.heading}</h2>

        <div className="overflow-hidden rounded-2xl bg-[#344766] shadow-sm">
          <img src={pageData.left.image_url} alt={pageData.left.image_alt} className="aspect-video w-full object-cover" />
        </div>

        {pageData.left.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-secondary-text">
            {paragraph}
          </p>
        ))}

        <div className="rounded-2xl bg-rose-50 p-6">
          <h3 className="text-3xl font-bold text-primary">{pageData.left.highlight_title}</h3>
          <ul className="mt-4 space-y-2">
            {pageData.left.highlights.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-secondary-text">
                <span className="mt-1.5 inline-flex h-2.5 w-2.5 rounded-full bg-green-700" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="rounded-t-2xl bg-[#99003f] px-6 py-5 text-white">
          <h3 className="text-3xl font-bold">{pageData.form.title}</h3>
          <p className="mt-2 text-white/90">{pageData.form.description}</p>
        </div>

        <div className="space-y-5 p-6">
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1">
            <button type="button" className="h-11 rounded-lg bg-green-700 text-sm font-semibold text-white">
              {pageData.form.tabs.lifetime_member}
            </button>
            <button type="button" className="h-11 rounded-lg text-sm font-semibold text-primary">
              {pageData.form.tabs.donor_member}
            </button>
          </div>

          <p className="text-sm font-semibold text-primary">{pageData.form.minimum_donation}</p>

          <div className="space-y-3">
            {pageData.form.fields.map((field, index) => (
              <input key={index} className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3" placeholder={field} />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {pageData.form.payment_options.map((option, index) => (
              <button key={index} type="button" className="h-10 rounded-lg border border-gray-200 bg-gray-50 text-xs font-semibold text-primary">
                {option}
              </button>
            ))}
          </div>

          <button type="button" className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-green-700 px-5 text-sm font-semibold text-white transition hover:bg-green-800">
            {pageData.form.button}
          </button>
        </div>
      </section>
    </div>
  );
}
