import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/i18n-config";
import UserTabs, { type UserTabItem } from "@/components/user/user-tabs";

interface UserLayoutData {
  title: string;
  tabs: {
    login: string;
    dashboard: string;
    donation: string;
  };
}

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const pageData = await getDictionary<UserLayoutData>(locale, "user");

  const tabs: UserTabItem[] = [
    { label: pageData.tabs.login, href: `/${locale}/user/login` },
    { label: pageData.tabs.dashboard, href: `/${locale}/user/dashboard` },
    { label: pageData.tabs.donation, href: `/${locale}/user/donation` },
  ];

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-primary">{pageData.title}</h1>
        </div>
        <UserTabs tabs={tabs} />
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
