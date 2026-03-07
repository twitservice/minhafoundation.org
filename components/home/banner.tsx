import type { Locale } from "@/lib/i18n-config";
import type { HomeDictionary } from "@/lib/get-dictionary";

interface BannerProps {
  lang: Locale;
  dictionary: HomeDictionary;
}

export default function Banner({ lang: _lang, dictionary }: BannerProps) {
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;
  const bgImage = `${cdnUrl}/assets/img/minhafoundation-slider-01.webp`;

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