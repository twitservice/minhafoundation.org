"use client";

import { usePathname } from "next/navigation";

export interface UserTabItem {
  label: string;
  href: string;
}

interface UserTabsProps {
  tabs: UserTabItem[];
}

export default function UserTabs({ tabs }: UserTabsProps) {
  const pathname = usePathname();

  const normalizePath = (value: string) => {
    if (value.length > 1 && value.endsWith("/")) {
      return value.slice(0, -1);
    }

    return value;
  };

  const currentPath = normalizePath(pathname);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
        {tabs.map((tab) => {
          const tabPath = normalizePath(tab.href);
          const isActive = currentPath === tabPath;

          return (
            <a
              key={tab.href}
              href={tab.href}
              className={`inline-flex h-11 items-center justify-center rounded-lg px-4 text-sm font-semibold transition ${
                isActive
                  ? "bg-primary text-white"
                  : "text-primary hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
