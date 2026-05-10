import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary, getCommonDictionary } from "@/lib/get-dictionary";
import { resolveMetaImg } from "@/lib/meta";

interface UserLoginData {
  title: string;
  description: string;
  meta_img?: string;
  heading: string;
  phone_email_label: string;
  phone_email_placeholder: string;
  button: string;
  image_url: string;
  image_alt: string;
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
    getDictionary<UserLoginData>(locale, "user-login"),
    getCommonDictionary(locale),
  ]);
  const metaImg = resolveMetaImg(pageData.meta_img, commonDict.images.meta_img, baseUrl);

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}/user/login`;
  }

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/user/login`,
      languages,
    },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `${baseUrl}/${locale}/user/login`,
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

export default async function UserLoginPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const pageData = await getDictionary<UserLoginData>(locale, "user-login");

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <section className="p-8 sm:p-12 lg:p-14">
          <h2 className="text-5xl font-bold text-primary">{pageData.heading}</h2>

          <div className="mt-8 max-w-xl space-y-3">
            <label htmlFor="phone-email" className="block text-lg font-semibold text-primary">
              {pageData.phone_email_label}
            </label>
            <input
              id="phone-email"
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-secondary-text"
              placeholder={pageData.phone_email_placeholder}
            />
            <button
              type="button"
              className="mt-4 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white"
            >
              <span>{pageData.button}</span>
              <span aria-hidden>→</span>
            </button>
          </div>
        </section>

        <section className="bg-[#f6eaea] p-6 sm:p-8">
          <img src={pageData.image_url} alt={pageData.image_alt} className="h-full w-full rounded-2xl object-cover" />
        </section>
      </div>
    </div>
  );
}
