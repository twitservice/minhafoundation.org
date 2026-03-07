import type { Locale } from "@/lib/i18n-config";


export interface BannerData {
  bg_image: string;
  title: string;
  subtitle: string;
}


interface BannerProps {
  lang: Locale;
  dictionary: BannerData; 
}

export default function Banner({ lang: _lang, dictionary }: BannerProps) {
  const bgImage = `${dictionary.bg_image}`;

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
        <h1 className="text-primary">{dictionary.title}</h1>
        <p className="text-white">{dictionary.subtitle}</p>
      </div>
    </section>
  );
}