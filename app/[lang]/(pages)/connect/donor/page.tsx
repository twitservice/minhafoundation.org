import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary, getCommonDictionary } from "@/lib/get-dictionary";
import { resolveMetaImg } from "@/lib/meta";

interface ConnectDonorData {
  title: string;
  description: string;
  meta_img?: string;
  top_notice: string;
  left: {
    image_url: string;
    image_alt: string;
    intro_paragraphs: string[];
    expense_title: string;
    expense_points: string[];
    auto_title: string;
    auto_description: string;
  };
  form: {
    title: string;
    description: string;
    frequency: {
      daily: string;
      monthly: string;
    };
    quick_amounts: string[];
    fields: {
      donation_amount: string;
      your_name: string;
      phone_email: string;
      donate_on_behalf: string;
    };
    payment_methods: string[];
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
    getDictionary<ConnectDonorData>(locale, "connect-donor"),
    getCommonDictionary(locale),
  ]);

  const metaImg = resolveMetaImg(pageData.meta_img, commonDict.images.meta_img, baseUrl);

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}/connect/donor`;
  }

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/connect/donor`,
      languages,
    },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `${baseUrl}/${locale}/connect/donor`,
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

export default async function ConnectDonorPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const pageData = await getDictionary<ConnectDonorData>(locale, "connect-donor");

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-rose-50 px-6 py-5 text-center text-secondary-text">{pageData.top_notice}</div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.2fr)_420px]">
        <section className="space-y-5">
          <div className="overflow-hidden rounded-2xl bg-[#344766] shadow-sm">
            <img src={pageData.left.image_url} alt={pageData.left.image_alt} className="aspect-video w-full object-cover" />
          </div>

          {pageData.left.intro_paragraphs.map((paragraph, index) => (
            <p key={index} className="text-secondary-text">
              {paragraph}
            </p>
          ))}

          <div className="rounded-2xl bg-rose-50 p-6">
            <h3 className="text-3xl font-bold text-primary">{pageData.left.expense_title}</h3>
            <ul className="mt-4 space-y-2">
              {pageData.left.expense_points.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-secondary-text">
                  <span className="mt-1.5 inline-flex h-2.5 w-2.5 rounded-full bg-green-700" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-rose-50 p-6">
            <h3 className="text-3xl font-bold text-primary">{pageData.left.auto_title}</h3>
            <p className="mt-3 text-secondary-text">{pageData.left.auto_description}</p>
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
                {pageData.form.frequency.daily}
              </button>
              <button type="button" className="h-11 rounded-lg text-sm font-semibold text-primary">
                {pageData.form.frequency.monthly}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {pageData.form.quick_amounts.map((amount, index) => (
                <button key={index} type="button" className="h-10 rounded-lg border border-gray-200 bg-gray-50 text-sm font-semibold text-primary">
                  {amount}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <input className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3" placeholder={pageData.form.fields.donation_amount} />
              <input className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3" placeholder={pageData.form.fields.your_name} />
              <input className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3" placeholder={pageData.form.fields.phone_email} />
              <input className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3" placeholder={pageData.form.fields.donate_on_behalf} />
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {pageData.form.payment_methods.map((method, index) => (
                <label key={index} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-primary">
                  <input type="radio" name="payment-method" />
                  <span>{method}</span>
                </label>
              ))}
            </div>

            <button type="button" className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-green-700 px-5 text-sm font-semibold text-white transition hover:bg-green-800">
              {pageData.form.button}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
