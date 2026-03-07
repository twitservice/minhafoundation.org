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
      className="h-[500px] bg-cover bg-center" 
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <h1 className="text-white">{dictionary.banner.title}</h1>
      <p className="text-white">{dictionary.banner.subtitle}</p>
    </section>
  );
}