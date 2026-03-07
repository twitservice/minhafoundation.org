import type { Locale } from "@/lib/i18n-config";
import type { HomeDictionary } from "@/lib/get-dictionary";

interface BannerProps {
  lang: Locale;
  dictionary: HomeDictionary;
}

export default function Banner({ lang: _lang, dictionary }: BannerProps) {
  const bgImage = `${dictionary.banner.bg_image}`;

  return (
    <section 
      className="relative h-[500px] bg-cover bg-center" 
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{ 
          background: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.2) 100%)' 
        }}
      />
      {/* Content */}
      <div className="relative z-20">
        <h1 className="text-white">{dictionary.banner.title}</h1>
        <p className="text-white">{dictionary.banner.subtitle}</p>
      </div>
    </section>
  );
}