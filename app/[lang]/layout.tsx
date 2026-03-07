import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";
import Header from "@/components/header";
import HtmlLangUpdater from "@/components/html-lang-updater";

// Base URL for canonical/hreflang (set in env or hardcode)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://minhafoundation.org';

// Generate static params for all locales
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Generate metadata dynamically based on locale with hreflang
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const dictionary = await getDictionary(locale);

  // Build hreflang alternates for SEO
  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}`;
  }

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <>
      <HtmlLangUpdater lang={locale} />
      <Header lang={locale} dictionary={dictionary} />
      {children}
    </>
  );
}
