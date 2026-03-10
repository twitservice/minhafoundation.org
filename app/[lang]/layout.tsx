import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getCommonDictionary } from "@/lib/get-dictionary";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
  const commonDict = await getCommonDictionary(locale);

  // Build hreflang alternates for SEO
  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}`;
  }

  return {
    title: commonDict.metadata.title,
    description: commonDict.metadata.description,
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
  const commonDict = await getCommonDictionary(locale);

  return (
    <>
      {/* Ensure the client-side html lang matches the route locale */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = '${locale}';`
        }}
      />

      <Header lang={locale} dictionary={commonDict} />
      {children}
      <Footer lang={locale} dictionary={commonDict} />
    </>
  );
}
