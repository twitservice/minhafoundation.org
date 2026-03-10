import type { Locale } from "@/lib/i18n-config";

export interface SubscriberDictionary {
  title: string;
  description: string;
  placeholder: string;
  button: string;
}

interface SubscriberSectionProps {
  lang: Locale;
  dictionary: SubscriberDictionary;
}

export default function SubscriberSection({ lang, dictionary }: SubscriberSectionProps) {
  const { title, description, placeholder, button } = dictionary;

  return (
    <section className="w-full py-12 bg-white">
      <div className="mx-auto w-11/12 lg:w-8/12">
        {/* Green card with decorative circles */}
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 sm:px-12 sm:py-16 text-center">
          {/* Decorative dark circles */}
          <span
            aria-hidden="true"
            className="absolute -top-16 -left-16 w-52 h-52 rounded-full bg-black/10"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-black/10"
          />

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
            <p className="mt-3 max-w-lg mx-auto text-white/80 text-sm sm:text-base leading-relaxed">
              {description}
            </p>

            {/* Email form */}
            <form
              onSubmit={undefined}
              className="mt-8 flex items-center max-w-xl mx-auto bg-white rounded-full overflow-hidden shadow-lg"
            >
              <input
                type="email"
                name="email"
                required
                placeholder={placeholder}
                className="flex-1 px-6 py-4 text-sm text-gray-700 outline-none bg-transparent placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="px-6 sm:px-8 py-4 bg-secondary text-white text-sm font-semibold rounded-full mr-1 hover:brightness-110 transition cursor-pointer whitespace-nowrap"
              >
                {button}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
