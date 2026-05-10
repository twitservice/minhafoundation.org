import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary, getCommonDictionary } from "@/lib/get-dictionary";
import Breadcrumb from "@/components/breadcrumb";
import { resolveMetaImg } from "@/lib/meta";
import VolunteerApplicationForm from "@/components/volunteer-application/volunteer-application-form";

interface VolunteerApplicationPageData {
  title: string;
  description: string;
  meta_img?: string;
  form: {
    title: string;
    name_label: string;
    name_placeholder: string;
    email_label: string;
    email_placeholder: string;
    phone_label: string;
    phone_placeholder: string;
    interest_label: string;
    interest_placeholder: string;
    interest_options: string[];
    message_label: string;
    message_placeholder: string;
    note: string;
    button: string;
    captcha_label: string;
    captcha_required_message: string;
    captcha_missing_site_key: string;
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
    getDictionary<VolunteerApplicationPageData>(locale, 'volunteer-application'),
    getCommonDictionary(locale),
  ]);
  const metaImg = resolveMetaImg(pageData.meta_img, commonDict.images.meta_img, baseUrl);

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}/volunteer-application`;
  }

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/volunteer-application`,
      languages,
    },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `${baseUrl}/${locale}/volunteer-application`,
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

export default async function VolunteerApplicationPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const [pageData, commonDict] = await Promise.all([
    getDictionary<VolunteerApplicationPageData>(locale, 'volunteer-application'),
    getCommonDictionary(locale),
  ]);

  return (
    <>
      <Breadcrumb breadcrumbImg={commonDict.images.breadcrumb} breadcrumbTitle={pageData.title} />
      <div className="bg-background">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold text-primary">{pageData.form.title}</h2>
            <VolunteerApplicationForm form={pageData.form} />
          </section>
        </div>
      </div>
    </>
  );
}