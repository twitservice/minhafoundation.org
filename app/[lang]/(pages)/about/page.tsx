import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n-config";
import { getDictionary, getCommonDictionary } from "@/lib/get-dictionary";
import Breadcrumb from "@/components/breadcrumb";
import PolicyTabs from "@/components/about/policy-tabs";

interface AboutPageData {
  title: string;
  description: string;
  content: string;
  image_url?: string;
  intro?: {
    title: string;
    description: string;
    image_url: string;
  };
  principles?: {
    title: string;
    subtitle: string;
    blocks: {
      title: string;
      description: string;
      points: string[];
      image_url: string;
    }[];
  };
  services?: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  policy?: {
    title: string;
    subtitle: string;
    tabs: {
      label: string;
      points: string[];
    }[];
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
  const pageData = await getDictionary<AboutPageData>(locale, 'about');

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${baseUrl}/${loc}/about`;
  }

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/about`,
      languages,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const [pageData, commonDict] = await Promise.all([
    getDictionary<AboutPageData>(locale, 'about'),
    getCommonDictionary(locale),
  ]);

  const intro = pageData.intro ?? {
    title: pageData.title,
    description: pageData.content,
    image_url: pageData.image_url || "https://placehold.co/1600x900/344766/344766",
  };

  const fallbackPoint = "It is a non-political and human welfare oriented non-government .";
  const principles = pageData.principles ?? {
    title: "Principles and Values",
    subtitle: pageData.description,
    blocks: [
      {
        title: "Minha Foundation",
        description: pageData.content,
        points: [fallbackPoint, fallbackPoint, fallbackPoint, fallbackPoint, fallbackPoint],
        image_url: "https://placehold.co/1000x700/344766/344766",
      },
      {
        title: "Minha Foundation",
        description: pageData.content,
        points: [fallbackPoint, fallbackPoint, fallbackPoint, fallbackPoint, fallbackPoint],
        image_url: "https://placehold.co/1000x700/344766/344766",
      },
    ],
  };
  
  return (
    <>
      <Breadcrumb breadcrumbImg={commonDict.images.breadcrumb} breadcrumbTitle={pageData.title} />
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
              {intro.title}
            </h2>
            <p className="mx-auto mt-4 max-w-5xl text-lg font-semibold leading-8 text-secondary-text">
              {intro.description}
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-3xl bg-[#344766] sm:mt-10">
            <div className="aspect-16/7 w-full">
              <img
                src={intro.image_url}
                alt={intro.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background-light">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
                {principles.title}
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-secondary-text">
                {principles.subtitle}
              </p>
            </div>

            <div className="mt-10 space-y-10">
              {principles.blocks.slice(0, 2).map((block, index) => {
                const imageFirst = index % 2 === 0;

                return (
                  <div key={`${block.title}-${index}`} className="grid items-center gap-7 md:grid-cols-2 md:gap-10">
                    <div className={imageFirst ? "order-1" : "order-2 md:order-2"}>
                      <div className="aspect-4/3 overflow-hidden rounded-2xl bg-[#344766]">
                        <img
                          src={block.image_url || "https://placehold.co/1000x700/344766/344766"}
                          alt={block.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <div className={imageFirst ? "order-2" : "order-1 md:order-1"}>
                      <h3 className="text-4xl font-extrabold text-primary">{block.title}</h3>
                      <p className="mt-3 text-lg leading-8 text-secondary-text">{block.description}</p>

                      <ul className="mt-6 space-y-3">
                        {block.points?.map((point, pointIndex) => (
                          <li key={`${point}-${pointIndex}`} className="flex items-start gap-3 text-lg text-primary">
                            <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1c7d3f]">
                              <svg
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                aria-hidden="true"
                              >
                                <path
                                  d="M5 10.5L8.2 13.5L15 6.5"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {pageData.services && (
        <div className="bg-background">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
                {pageData.services.title}
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-secondary-text">
                {pageData.services.subtitle}
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pageData.services.items.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 text-rose-500"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.545 3.75 3.75 0 0 1 3.255 3.717Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                  <p className="mt-2 text-base leading-7 text-secondary-text">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {pageData.policy && (
        <div className="bg-background-light">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
                {pageData.policy.title}
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-secondary-text">
                {pageData.policy.subtitle}
              </p>
            </div>
            <div className="mt-8">
              <PolicyTabs tabs={pageData.policy.tabs} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
