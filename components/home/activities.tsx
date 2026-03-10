"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { Locale } from "@/lib/i18n-config";

interface ActivityItem {
  id: string;
  badge: string;
  image: string;
  title: string;
  description: string;
}

export interface ActivitiesDictionary {
  title: string;
  subtitle: string;
  explore_all: string;
  see_details: string;
  items: ActivityItem[];
}

interface ActivitiesProps {
  lang: Locale;
  dictionary: ActivitiesDictionary;
}

/** Ensure path ends with trailing slash */
function withSlash(path: string) {
  return path.endsWith("/") ? path : `${path}/`;
}

export default function Activities({ lang, dictionary }: ActivitiesProps) {
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

  const { title, subtitle, explore_all, see_details, items } = dictionary;

  return (
    <section className="w-full py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-h2 font-bold text-primary-text">{title}</h2>
          <p className="mt-3 max-w-2xl mx-auto text-secondary-text">
            {subtitle}
          </p>
          <div className="mt-6">
            <a
              href={withSlash(`/${lang}/activities`)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white text-sm font-medium rounded-full hover:brightness-95 transition"
            >
              {explore_all} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Carousel wrapper */}
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
                  <article className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden flex flex-col h-full">
                    {/* Image */}
                    <div className="relative aspect-[4/3] bg-slate-700 overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-16 h-16 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-1">
                      {/* Badge */}
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary mb-2">
                        <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                          <rect x="3" width="4" height="12" rx="1" />
                          <rect y="3" width="10" height="4" rx="1" />
                        </svg>
                        {item.badge}
                      </span>

                      <h3 className="text-lg font-bold text-primary-text leading-snug">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm text-secondary-text line-clamp-2 flex-1">
                        {item.description}
                      </p>

                      {/* CTA */}
                      <a
                        href={withSlash(`/${lang}/activities`)}
                        className="mt-4 block w-full text-center py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:brightness-95 transition"
                      >
                        {see_details} <span aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
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
