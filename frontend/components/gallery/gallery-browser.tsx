"use client";

import { useEffect, useMemo, useState } from "react";

export interface GalleryCategory {
  slug: string;
  name: string;
}

export interface GalleryImageItem {
  title: string;
  alt: string;
  image_url: string;
  category_slug: string;
}

export interface GalleryVideoItem {
  title: string;
  alt: string;
  thumbnail_url: string;
  video_url: string;
  category_slug: string;
}

export interface GalleryCollection<TItem> {
  all_label: string;
  categories: GalleryCategory[];
  items: TItem[];
}

export interface GalleryTabs {
  images: string;
  videos: string;
}

export interface GalleryBrowserData {
  tabs: GalleryTabs;
  images: GalleryCollection<GalleryImageItem>;
  videos: GalleryCollection<GalleryVideoItem>;
}

interface GalleryBrowserProps {
  data: GalleryBrowserData;
}

export default function GalleryBrowser({ data }: GalleryBrowserProps) {
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImageItem | null>(null);

  const currentCollection = useMemo(
    () => (activeTab === "images" ? data.images : data.videos),
    [activeTab, data.images, data.videos]
  );

  useEffect(() => {
    setActiveCategory("all");
  }, [activeTab]);

  useEffect(() => {
    if (!selectedImage) {
      document.body.style.overflow = "";
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") {
      return currentCollection.items;
    }

    return currentCollection.items.filter((item) => item.category_slug === activeCategory);
  }, [activeCategory, currentCollection]);

  return (
    <div className="space-y-10">
      <div className="flex justify-center">
        <div className="inline-flex rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab("images")}
            className={`min-w-32 rounded-xl px-8 py-3 text-lg font-semibold transition ${
              activeTab === "images" ? "bg-green-100 text-primary" : "text-primary hover:bg-gray-50"
            }`}
          >
            {data.tabs.images}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("videos")}
            className={`min-w-32 rounded-xl px-8 py-3 text-lg font-semibold transition ${
              activeTab === "videos" ? "bg-green-100 text-primary" : "text-primary hover:bg-gray-50"
            }`}
          >
            {data.tabs.videos}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="h-fit rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`flex w-full items-center border-l-2 px-4 py-4 text-left text-lg font-semibold transition ${
              activeCategory === "all"
                ? "border-green-500 text-primary"
                : "border-transparent text-primary/90 hover:bg-gray-50"
            }`}
          >
            {currentCollection.all_label}
          </button>

          {currentCollection.categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setActiveCategory(category.slug)}
              className={`flex w-full items-center border-t border-dashed border-gray-200 border-l-2 px-4 py-4 text-left text-lg font-semibold transition ${
                activeCategory === category.slug
                  ? "border-l-green-500 text-primary"
                  : "border-l-transparent text-primary/90 hover:bg-gray-50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </aside>

        {activeTab === "images" ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {(filteredItems as GalleryImageItem[]).map((item) => (
              <article key={`${item.category_slug}-${item.title}`} className="space-y-3">
                <button
                  type="button"
                  onClick={() => setSelectedImage(item)}
                  className="block w-full overflow-hidden rounded-3xl bg-[#344766] text-left shadow-sm"
                >
                  <img
                    src={item.image_url}
                    alt={item.alt}
                    className="aspect-[4/2.7] w-full object-cover transition duration-300 hover:scale-[1.02]"
                  />
                </button>
                <h3 className="px-1 text-xl font-semibold text-primary">{item.title}</h3>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {(filteredItems as GalleryVideoItem[]).map((item) => (
              <a
                key={`${item.category_slug}-${item.title}`}
                href={item.video_url}
                target="_blank"
                rel="noreferrer"
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative overflow-hidden bg-[#344766]">
                  <img src={item.thumbnail_url} alt={item.alt} className="aspect-[4/2.7] w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                    <span className="inline-flex h-18 w-18 items-center justify-center rounded-full bg-rose-500/90 text-white shadow-lg">
                      <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-current" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="line-clamp-2 text-2xl font-semibold text-primary">{item.title}</h3>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {selectedImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/65 text-2xl text-white transition hover:bg-black/80"
              aria-label="Close image preview"
            >
              ×
            </button>

            <img
              src={selectedImage.image_url}
              alt={selectedImage.alt}
              className="max-h-[80vh] w-full bg-[#344766] object-contain"
            />

            <div className="border-t border-gray-200 bg-white px-6 py-4">
              <h3 className="text-2xl font-semibold text-primary">{selectedImage.title}</h3>
              <p className="mt-1 text-secondary-text">{selectedImage.alt}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}