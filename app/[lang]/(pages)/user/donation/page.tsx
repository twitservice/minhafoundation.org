import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary, getCommonDictionary } from "@/lib/get-dictionary";
import { resolveMetaImg } from "@/lib/meta";

interface DonationRow {
  transaction_no: string;
  donation_time: string;
  fund: string;
  amount: string;
  payment_method: string;
  receipt: string;
  download_again: string;
}

interface UserDonationData {
  title: string;
  description: string;
  meta_img?: string;
  heading: string;
  intro: string;
  sort: {
    newest: string;
    oldest: string;
  };
  table: {
    transaction_no: string;
    donation_time: string;
    fund: string;
    amount: string;
    payment_method: string;
    receipt: string;
    download_again: string;
  };
  rows: DonationRow[];
  pagination: {
    previous: string;
    next: string;
    pages: number[];
    current: number;
  };
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
    getDictionary<UserDonationData>(locale, "user-donation"),
    getCommonDictionary(locale),
  ]);
  const metaImg = resolveMetaImg(pageData.meta_img, commonDict.images.meta_img, baseUrl);

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}/user/donation`;
  }

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/user/donation`,
      languages,
    },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `${baseUrl}/${locale}/user/donation`,
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

export default async function UserDonationPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const pageData = await getDictionary<UserDonationData>(locale, "user-donation");

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-7xl font-bold text-primary">{pageData.heading}</h2>
        <p className="mx-auto mt-3 max-w-4xl text-secondary-text">{pageData.intro}</p>
      </div>

      <div className="flex justify-end">
        <select className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-primary">
          <option>{pageData.sort.newest}</option>
          <option>{pageData.sort.oldest}</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px]">
            <thead className="bg-rose-100 text-left">
              <tr>
                <th className="px-5 py-4 font-semibold text-primary">{pageData.table.transaction_no}</th>
                <th className="px-5 py-4 font-semibold text-primary">{pageData.table.donation_time}</th>
                <th className="px-5 py-4 font-semibold text-primary">{pageData.table.fund}</th>
                <th className="px-5 py-4 font-semibold text-primary">{pageData.table.amount}</th>
                <th className="px-5 py-4 font-semibold text-primary">{pageData.table.payment_method}</th>
                <th className="px-5 py-4 font-semibold text-primary">{pageData.table.receipt}</th>
                <th className="px-5 py-4 font-semibold text-primary">{pageData.table.download_again}</th>
              </tr>
            </thead>
            <tbody>
              {pageData.rows.map((row, index) => (
                <tr key={`${row.transaction_no}-${index}`} className="border-t border-gray-200">
                  <td className="px-5 py-4 text-primary">{row.transaction_no}</td>
                  <td className="px-5 py-4 text-primary">{row.donation_time}</td>
                  <td className="px-5 py-4 text-primary">{row.fund}</td>
                  <td className="px-5 py-4 font-semibold text-green-700">{row.amount}</td>
                  <td className="px-5 py-4 text-primary">{row.payment_method}</td>
                  <td className="px-5 py-4">
                    <button type="button" className="inline-flex h-9 items-center justify-center rounded-full border border-green-700 px-4 text-sm font-semibold text-green-700">
                      {row.receipt}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <a href="#" className="text-sm font-semibold text-green-700">
                      {row.download_again}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button type="button" className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-gray-200 bg-white px-2 text-sm text-secondary-text">
          {pageData.pagination.previous}
        </button>
        {pageData.pagination.pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={`inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-sm ${
              pageNumber === pageData.pagination.current
                ? "border-green-700 bg-green-700 text-white"
                : "border-gray-200 bg-white text-secondary-text"
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button type="button" className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-gray-200 bg-white px-2 text-sm text-secondary-text">
          {pageData.pagination.next}
        </button>
      </div>
    </div>
  );
}
