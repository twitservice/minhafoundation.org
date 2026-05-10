import type { Locale } from "@/lib/i18n-config";

interface Logo {
  src: string;
  alt: string;
}

export interface OurConnectionDictionary {
  title: string;
  subtitle: string;
  logos: Logo[];
}

interface OurConnectionProps {
  lang: Locale;
  dictionary: OurConnectionDictionary;
}

export default function OurConnection({ lang, dictionary }: OurConnectionProps) {
  const { title, subtitle, logos } = dictionary;

  return (
    <section className="w-full py-16 bg-background-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-h2 font-bold text-primary-text">{title}</h2>
          <p className="mt-3 max-w-2xl mx-auto text-secondary-text italic">
            {subtitle}
          </p>
        </div>

        {/* Logos row */}
        <div className="flex items-center justify-center gap-10 sm:gap-16 lg:gap-24 flex-wrap">
          {logos.map((logo, idx) => (
            <img
              key={idx}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
