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
  const pageDict = await getDictionary<PageDictionary>(locale, 'login');

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}/login`;
  }

  return {
    title: pageDict.title,
    description: pageDict.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/login`,
      languages,
    },
  };
}

export default async function Login({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const pageDict = await getDictionary<PageDictionary>(locale, 'login');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
          <h1 className="text-2xl font-bold text-primary-text mb-6 text-center">{pageDict.title}</h1>
          <p className="text-secondary-text text-center">{pageDict.content}</p>
        </div>
      </div>
    </div>
  );
}
