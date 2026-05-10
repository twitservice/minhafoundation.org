"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { Locale } from "@/lib/i18n-config";

interface FundItem {
  id: string;
  title: string;
  description: string;
}

export interface DonationFundsDictionary {
  title: string;
  subtitle: string;
  all_funds: string;
  donate_btn: string;
  items: FundItem[];
}

interface DonationFundsProps {
  lang: Locale;
  dictionary: DonationFundsDictionary;
}

function withSlash(path: string) {
  return path.endsWith("/") ? path : `${path}/`;
}

/* Fire / flame icon matching the screenshot */
const FlameIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-secondary"
  >
    <path
      d="M12 2C12 2 7 7 7 11.5C7 14.538 9.462 17 12.5 17C15.538 17 18 14.538 18 11.5C18 8.5 15 5 12 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 19C9.5 19 10 20 12.5 20C15 20 15.5 19 15.5 19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function DonationFunds({ lang, dictionary }: DonationFundsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 640px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 4 },
    },
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const { title, subtitle, all_funds, donate_btn, items } = dictionary;

  return (
    <section className="w-full py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-h2 font-bold text-primary-text">{title}</h2>
          <p className="mt-3 max-w-2xl mx-auto text-secondary-text">
            {subtitle}
          </p>
          <div className="mt-6">
            <a
              href={withSlash(`/${lang}/donate`)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white text-sm font-medium rounded-full hover:brightness-95 transition"
            >
              {all_funds} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Prev arrow */}
          <button
            onClick={scrollPrev}
            aria-label="Previous"
            className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-secondary-light flex items-center justify-center text-secondary hover:brightness-90 transition shadow"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={scrollNext}
            aria-label="Next"
            className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-secondary-light flex items-center justify-center text-secondary hover:brightness-90 transition shadow"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Embla viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-8px)] lg:flex-[0_0_calc(25%-12px)]"
                >
                  <article className="rounded-2xl border border-gray-100 bg-background p-6 shadow-sm flex flex-col items-center text-center h-full">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-full bg-secondary-light/40 flex items-center justify-center mb-5">
                      <FlameIcon />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-primary-text mb-3">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-secondary-text leading-relaxed flex-1 mb-5">
                      {item.description}
                    </p>

                    {/* CTA */}
                    <a
                      href={withSlash(`/${lang}/donate`)}
                      className="block w-full text-center py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:brightness-95 transition"
                    >
                      {donate_btn}
                    </a>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
