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
      {/* ── Pink wave shape (bottom only) ── */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1920 477"
        preserveAspectRatio="none"
        style={{ height: "clamp(200px, 30vw, 477px)" }}
      >
        <path
          d="M1923 476.571H0V282.571C150.872 224.018 215.503 214.181 336.5 238.571C457.497 262.96 440.812 160.607 636 120.071C831.188 79.5339 888.655 219.571 1046 219.571C1203.35 219.571 1401.59 109.84 1542.5 28.0706C1655.23 -37.3447 1816.28 28.4333 1923 55.6897V476.571Z"
          fill="#FFC9C9"
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
