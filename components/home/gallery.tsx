"use client";

import { useState, useCallback, useEffect } from "react";
import type { Locale } from "@/lib/i18n-config";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
}

export interface GalleryDictionary {
  title: string;
  subtitle: string;
  see_more: string;
  items: GalleryItem[];
}

interface GalleryProps {
  lang: Locale;
  dictionary: GalleryDictionary;
}

function withSlash(path: string) {
  return path.endsWith("/") ? path : `${path}/`;
}

/*
 * 4-column layout, 2 images per column with specific height splits.
 * Col 1: 50/50  |  Col 2: 35/65  |  Col 3: 70/30  |  Col 4: 40/60
 * Each column has the same total height (100%).
 * Mobile: 2-col grid with equal rows. Desktop: flex columns with % heights.
 */
const COLUMNS: { topPct: number; bottomPct: number }[] = [
  { topPct: 50, bottomPct: 50 },
  { topPct: 40, bottomPct: 60 },
  { topPct: 60, bottomPct: 40 },
  { topPct: 40, bottomPct: 60 },
];
const COLUMN_HEIGHT = 520; // px — fixed total height on desktop

/* ── Lightbox ── */
function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];

  /* keyboard navigation */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition cursor-pointer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition cursor-pointer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition cursor-pointer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Image */}
      <img
        src={item.src}
        alt={item.alt}
        className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Counter */}
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
        {index + 1} / {items.length}
      </span>
    </div>
  );
}

/* ── Gallery Component ── */
export default function Gallery({ lang, dictionary }: GalleryProps) {
  const { title, subtitle, see_more, items } = dictionary;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(
    () => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + items.length) % items.length : null)),
    [items.length]
  );
  const showNext = useCallback(
    () => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % items.length : null)),
    [items.length]
  );

  return (
    <>
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
                href={withSlash(`/${lang}/gallery`)}
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white text-sm font-medium rounded-full hover:brightness-95 transition"
              >
                {see_more} <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Mobile: 2-col equal grid */}
          <div className="grid grid-cols-2 gap-3 lg:hidden">
            {items.slice(0, 8).map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openLightbox(idx)}
                className="relative rounded-2xl overflow-hidden bg-[#374151] group cursor-pointer h-[180px] sm:h-[220px]"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </button>
            ))}
          </div>

          {/* Desktop: 4-column flex with percentage heights */}
          <div className="hidden lg:flex gap-4" style={{ height: COLUMN_HEIGHT }}>
            {COLUMNS.map((col, colIdx) => {
              const topItem = items[colIdx];
              const bottomItem = items[colIdx + 4];
              if (!topItem || !bottomItem) return null;
              const gap = 16; // gap in px
              const topH = `calc(${col.topPct}% - ${gap / 2}px)`;
              const bottomH = `calc(${col.bottomPct}% - ${gap / 2}px)`;
              return (
                <div key={colIdx} className="flex flex-col gap-4 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => openLightbox(colIdx)}
                    className="relative rounded-2xl overflow-hidden bg-[#374151] group cursor-pointer"
                    style={{ height: topH }}
                  >
                    <img
                      src={topItem.src}
                      alt={topItem.alt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openLightbox(colIdx + 4)}
                    className="relative rounded-2xl overflow-hidden bg-[#374151] group cursor-pointer"
                    style={{ height: bottomH }}
                  >
                    <img
                      src={bottomItem.src}
                      alt={bottomItem.alt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </>
  );
}
