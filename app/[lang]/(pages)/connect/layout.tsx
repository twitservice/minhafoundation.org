import { getCommonDictionary, getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/i18n-config";
import Breadcrumb from "@/components/breadcrumb";
import ConnectTabs, { type ConnectTabItem } from "@/components/connect/connect-tabs";

interface ConnectLayoutData {
  title: string;
  description: string;
  intro: string;
  tabs: {
    donor: string;
    member: string;
    voluntar: string;
    career: string;
  };
}

export default async function ConnectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const [connectData, commonDict] = await Promise.all([
    getDictionary<ConnectLayoutData>(locale, "connect"),
    getCommonDictionary(locale),
  ]);

  const tabs: ConnectTabItem[] = [
    { label: connectData.tabs.donor, href: `/${locale}/connect/donor` },
    { label: connectData.tabs.member, href: `/${locale}/connect/member` },
    { label: connectData.tabs.voluntar, href: `/${locale}/connect/volunteer` },
    { label: connectData.tabs.career, href: `/${locale}/connect/career` },
  ];

  return (
    <>
      <Breadcrumb breadcrumbImg={commonDict.images.breadcrumb} breadcrumbTitle={connectData.title} />
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-bold leading-tight text-primary">{connectData.title}</h1>
              <p className="mt-3 max-w-4xl text-secondary-text">{connectData.intro}</p>
            </div>
            <ConnectTabs tabs={tabs} />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
