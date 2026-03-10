import type { Locale } from "@/lib/i18n-config";

export interface SpecialActivitiesDictionary {
  heading_prefix: string;
  heading_highlight: string;
  heading_suffix: string;
  description: string;
  video_url: string;
  learn_more: string;
}

interface SpecialActivitiesProps {
  lang: Locale;
  dictionary: SpecialActivitiesDictionary;
}

export default function SpecialActivities({
  lang: _lang,
  dictionary,
}: SpecialActivitiesProps) {
  const {
    heading_prefix,
    heading_highlight,
    heading_suffix,
    description,
    video_url,
  } = dictionary;

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* ── Pink wave shape (top) ── */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: "220px" }}
      >
        <path
          d="M0,320 C180,220 360,280 540,240 C720,200 900,100 1080,160 C1200,200 1340,280 1440,260 L1440,0 L0,0 Z"
          fill="var(--secondary-light)"
          fillOpacity="0.35"
        />
      </svg>

      {/* ── Pink wave shape (bottom) with blob extending right ── */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        style={{ height: "340px" }}
      >
        <path
          d="M0,400 L0,200 C120,280 300,100 500,180 C700,260 850,120 1020,80 C1190,40 1340,160 1440,120 L1440,400 Z"
          fill="var(--secondary-light)"
          fillOpacity="0.35"
        />
        {/* Extra blob on the right */}
        <ellipse
          cx="1380"
          cy="280"
          rx="200"
          ry="180"
          fill="var(--secondary-light)"
          fillOpacity="0.3"
        />
      </svg>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {/* Top row: heading + description */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
          {/* Heading */}
          <h2 className="text-h3 sm:text-h2 font-bold text-primary-text max-w-lg leading-tight">
            {heading_prefix}{" "}
            <span className="text-secondary">{heading_highlight}</span>
            <br />
            {heading_suffix}
          </h2>

          {/* Description */}
          <p className="max-w-md text-secondary-text leading-relaxed lg:pt-2">
            {description}
          </p>
        </div>

        {/* Video placeholder */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#374151] shadow-xl"
             style={{ aspectRatio: "16 / 9", maxHeight: "727px" }}>
          {video_url ? (
            <iframe
              src={video_url}
              title="Special Activities"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            /* Placeholder play button */
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                aria-label="Play video"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary flex items-center justify-center shadow-lg hover:brightness-110 transition"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
