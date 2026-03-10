import type { Locale } from "@/lib/i18n-config";

function withSlash(path: string) {
  return path.endsWith("/") ? path : `${path}/`;
}

export interface BannerData {
  bg_image: string;
  title: string;
  subtitle: string;
  description: string;
  btn_learn_more: string;
  btn_activities: string;
}

interface BannerProps {
  lang: Locale;
  dictionary: BannerData;
}

export default function Banner({ lang, dictionary }: BannerProps) {
  const bgImage = dictionary.bg_image;

  return (
    <div
      className="relative min-h-[480px] md:min-h-[620px] lg:min-h-[720px] bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* Gradient overlay — dark left, transparent right */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      {/* Centered content */}
      <div className="relative z-20 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-left md:text-left pb-28 md:pb-36">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
          {dictionary.title}
        </h1>

        <p className="mt-4 max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed">
          {dictionary.description}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={withSlash(`/${lang}/about`)}
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white text-sm font-semibold rounded-full hover:brightness-110 transition"
          >
            {dictionary.btn_learn_more}
          </a>
          <a
            href={withSlash(`/${lang}/activities`)}
            className="inline-flex items-center justify-center px-8 py-3 border border-white/60 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition"
          >
            {dictionary.btn_activities}
          </a>
        </div>
      </div>
    </div>
  );
}