import type { Locale } from "@/lib/i18n-config";

interface JoinUsItem {
  id: string;
  label: string;
  href: string;
  color: "primary" | "secondary" | "red" | "lime";
}

export interface JoinUsDictionary {
  title: string;
  subtitle: string;
  items: JoinUsItem[];
}

interface JoinUsProps {
  lang: Locale;
  dictionary: JoinUsDictionary;
}

function withSlash(path: string) {
  return path.endsWith("/") ? path : `${path}/`;
}

/* colour map → Tailwind bg classes */
const bgMap: Record<JoinUsItem["color"], string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  red: "bg-[#DC143C]",
  lime: "bg-[#A3B818]",
};

/* dashed-border colour per card */
const borderMap: Record<JoinUsItem["color"], string> = {
  primary: "border-primary/40",
  secondary: "border-secondary/40",
  red: "border-[#DC143C]/40",
  lime: "border-[#A3B818]/40",
};

/* Flame icon (white) */
function FlameIcon() {
  return (
    <span className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    </span>
  );
}

export default function JoinUs({ lang, dictionary }: JoinUsProps) {
  const { title, subtitle, items } = dictionary;
  const [regular, donor, volunteer, career] = items;

  return (
    <section className="w-full py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-h2 font-bold text-primary-text">{title}</h2>
          <p className="mt-3 max-w-2xl mx-auto text-secondary-text">
            {subtitle}
          </p>
        </div>

        {/* Desktop grid: 2 columns, left = tall card, right = 1 wide + 2 small */}
        <div className="hidden lg:grid grid-cols-2 gap-6" style={{ height: 480 }}>
          {/* Left — Regular Donor (full height) */}
          <div className={`rounded-2xl border-2 border-dashed ${borderMap[regular.color]} p-2`}>
            <a
              href={withSlash(`/${lang}/${regular.href}`)}
              className={`flex flex-col items-center justify-center h-full rounded-xl ${bgMap[regular.color]} text-white hover:brightness-110 transition`}
            >
              <FlameIcon />
              <span className="text-2xl font-bold">{regular.label}</span>
            </a>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Donor Member (wide, ~55% height) */}
            <div className={`rounded-2xl border-2 border-dashed ${borderMap[donor.color]} p-2 flex-[55]`}>
              <a
                href={withSlash(`/${lang}/${donor.href}`)}
                className={`flex flex-col items-center justify-center h-full rounded-xl ${bgMap[donor.color]} text-white hover:brightness-110 transition`}
              >
                <FlameIcon />
                <span className="text-2xl font-bold">{donor.label}</span>
              </a>
            </div>

            {/* Bottom row: Volunteer + Career (each ~45% height) */}
            <div className="flex gap-6 flex-[45]">
              <div className={`rounded-2xl border-2 border-dashed ${borderMap[volunteer.color]} p-2 flex-1`}>
                <a
                  href={withSlash(`/${lang}/${volunteer.href}`)}
                  className={`flex flex-col items-center justify-center h-full rounded-xl ${bgMap[volunteer.color]} text-white hover:brightness-110 transition`}
                >
                  <FlameIcon />
                  <span className="text-xl font-bold">{volunteer.label}</span>
                </a>
              </div>
              <div className={`rounded-2xl border-2 border-dashed ${borderMap[career.color]} p-2 flex-1`}>
                <a
                  href={withSlash(`/${lang}/${career.href}`)}
                  className={`flex flex-col items-center justify-center h-full rounded-xl ${bgMap[career.color]} text-white hover:brightness-110 transition`}
                >
                  <FlameIcon />
                  <span className="text-xl font-bold">{career.label}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet: stacked 2-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
          {items.map((item) => (
            <div key={item.id} className={`rounded-2xl border-2 border-dashed ${borderMap[item.color]} p-2`}>
              <a
                href={withSlash(`/${lang}/${item.href}`)}
                className={`flex flex-col items-center justify-center h-48 rounded-xl ${bgMap[item.color]} text-white hover:brightness-110 transition`}
              >
                <FlameIcon />
                <span className="text-xl font-bold">{item.label}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
