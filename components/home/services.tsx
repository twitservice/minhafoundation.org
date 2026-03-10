import type { Locale } from "@/lib/i18n-config";

interface ServiceItem {
  id?: string;
  title: string;
  description: string;
}

interface ServicesDictionary {
  header: {
    title: string;
    subtitle?: string;
    snapshot_image?: string;
  };
  items: ServiceItem[];
}

interface ServicesProps {
  lang: Locale;
  dictionary: ServicesDictionary;
}

export default function Services({ lang: _lang, dictionary }: ServicesProps) {
  const { header, items } = dictionary || { header: { title: "" }, items: [] };

  return (
    <section className="w-full relative z-10 py-12 bg-white">
      <div className="mx-auto max-w-10/12 px-4 sm:px-6 lg:px-8">
        {/* Header + snapshot */}
        <div className="relative text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary">{header.title}</h2>
          {header.subtitle && (
            <p className="mt-2 max-w-2xl mx-auto text-gray-600">{header.subtitle}</p>
          )}
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {items.map((it) => (
            <article key={it.id ?? it.title} className="rounded-2xl bg-background p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-secondary-light flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C12 2 7 7 7 11.5C7 14.5376 9.46243 17 12.5 17C15.5376 17 18 14.5376 18 11.5C18 8.5 15 5 12 2Z" stroke="#8B0836" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9.5 19C9.5 19 10 20 12.5 20C15 20 15.5 19 15.5 19" stroke="#8B0836" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-text">{it.title}</h3>
                  <p className="mt-2 text-gray-600 text-body">{it.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
