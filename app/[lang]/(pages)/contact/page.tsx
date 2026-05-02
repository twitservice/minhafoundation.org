import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary, getCommonDictionary } from "@/lib/get-dictionary";
import Breadcrumb from "@/components/breadcrumb";
import { resolveMetaImg } from "@/lib/meta";

interface ContactPageData {
  title: string;
  description: string;
  meta_img?: string;
  form: {
    title: string;
    name_label: string;
    name_placeholder: string;
    email_label: string;
    email_placeholder: string;
    subject_label: string;
    subject_placeholder: string;
    message_label: string;
    message_placeholder: string;
    note: string;
    button: string;
  };
  location: {
    title: string;
    map_image: string;
    map_alt: string;
    phone_label: string;
    phone: string;
    email_label: string;
    email: string;
    address_label: string;
    address: string;
  };
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
    getDictionary<ContactPageData>(locale, 'contact'),
    getCommonDictionary(locale),
  ]);
  const metaImg = resolveMetaImg(pageData.meta_img, commonDict.images.meta_img, baseUrl);

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}/contact`;
  }

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages,
    },
      openGraph: {
        title: pageData.title,
        description: pageData.description,
        url: `${baseUrl}/${locale}/contact`,
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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const [pageData, commonDict] = await Promise.all([
    getDictionary<ContactPageData>(locale, 'contact'),
    getCommonDictionary(locale),
  ]);

  return (
    <>
      <Breadcrumb breadcrumbImg={commonDict.images.breadcrumb} breadcrumbTitle={pageData.title} />
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold text-primary">{pageData.form.title}</h2>

              <form className="mt-6 space-y-4" action="#" method="post">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary" htmlFor="name">
                    {pageData.form.name_label}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={pageData.form.name_placeholder}
                    className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-primary placeholder:text-gray-400 focus:border-green-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary" htmlFor="email">
                    {pageData.form.email_label}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={pageData.form.email_placeholder}
                    className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-primary placeholder:text-gray-400 focus:border-green-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary" htmlFor="subject">
                    {pageData.form.subject_label}
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder={pageData.form.subject_placeholder}
                    className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-primary placeholder:text-gray-400 focus:border-green-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary" htmlFor="message">
                    {pageData.form.message_label}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={pageData.form.message_placeholder}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-primary placeholder:text-gray-400 focus:border-green-600 focus:outline-none"
                  />
                </div>

                <p className="text-xs text-secondary-text">{pageData.form.note}</p>

                <button
                  type="submit"
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-green-700 px-5 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  <span>{pageData.form.button}</span>
                  <span aria-hidden>→</span>
                </button>
              </form>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold text-primary">{pageData.location.title}</h2>

              <div className="mt-6 overflow-hidden rounded-xl border border-gray-100">
                <img
                  src={pageData.location.map_image}
                  alt={pageData.location.map_alt}
                  className="h-67.5 w-full object-cover"
                />
              </div>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
                      <path d="M6.62 10.79a15.09 15.09 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24 11.36 11.36 0 0 0 3.55.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.55 1 1 0 0 1-.24 1Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary">{pageData.location.phone_label}</p>
                    <p className="text-secondary-text">{pageData.location.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
                      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 3.2-8 5-8-5V6l8 5 8-5Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary">{pageData.location.email_label}</p>
                    <p className="text-secondary-text">{pageData.location.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
                      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary">{pageData.location.address_label}</p>
                    <p className="text-secondary-text">{pageData.location.address}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
