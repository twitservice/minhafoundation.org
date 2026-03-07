import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary, type PageDictionary } from "@/lib/get-dictionary";

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
  const pageDict = await getDictionary<PageDictionary>(locale, 'activities');

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}/activities`;
  }

  return {
    title: pageDict.title,
    description: pageDict.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/activities`,
      languages,
    },
  };
}

export default async function Activities({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const pageDict = await getDictionary<PageDictionary>(locale, 'activities');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-primary-text mb-8">{pageDict.title}</h1>
        <p className="text-secondary-text">{pageDict.content}</p>
      </div>
    </div>
  );
}
