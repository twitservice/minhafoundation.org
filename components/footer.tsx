import Image from "next/image";
import Link from "next/link";
import type { CommonDictionary } from "@/lib/get-dictionary";


interface FooterProps {
  lang: string;
  dictionary: CommonDictionary;
}

/* ── SVG social icons keyed by icon field in JSON ── */
const socialIcons: Record<string, React.ReactNode> = {
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  ),
};

/* ── Contact icons ── */
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

export default function Footer({ lang, dictionary }: FooterProps) {
  const { footer, images: footer_images } = dictionary;

  return (
    <footer className="relative bg-background-light overflow-hidden">
      {/* ── Background mask image (bottom-right, behind content) ── */}
      <div className="pointer-events-none select-none absolute bottom-0 right-0 z-0 w-70 md:max-w-90 lg:w-120 opacity-30 lg:opacity-40">
        <Image
          src={footer_images.footerBg}
          alt=""
          aria-hidden="true"
          width={480}
          height={480}
          className="object-contain object-bottom-right"
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 480px"
          priority={false}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        {/* Grid: 1 col mobile → 2 col tablet → 5 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr] gap-8 lg:gap-6">
          {/* ── Col 1: Logo + About + Social ── */}
          <div className="flex flex-col gap-4">
            <Link href={`/${lang}`} className="inline-block">
              <Image
                src={footer_images.logo}
                alt="Minha Foundation"
                width={100}
                height={100}
                className="w-auto h-20 object-contain"
                priority
              />
            </Link>
            <p className="text-secondary-text text-sm leading-relaxed max-w-xs">
              {footer.about_text}
            </p>
            <div className="flex items-center gap-3 mt-1">
              {footer.social_links.map((social) => (
                <a
                  key={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-white hover:opacity-80 transition-opacity"
                >
                  {socialIcons[social.icon]}
                </a>
              ))}
            </div>
          </div>

          {/* ── Cols 2-4: Quick link sections (Menu / Connect / Others) ── */}
          {footer.quick_links.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h3 className="text-primary-text font-semibold text-base">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.url + link.name}>
                    <Link
                      href={`/${lang}${link.url}`}
                      className="text-secondary-text text-sm hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ── Col 5: Contact ── */}
          <div className="flex flex-col gap-3">
            <h3 className="text-primary-text font-semibold text-base">
              Contact
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2 text-secondary-text text-sm">
                <PhoneIcon />
                <span>{footer.contact_info.phone}</span>
              </li>
              <li className="flex items-start gap-2 text-secondary-text text-sm">
                <EmailIcon />
                <span>{footer.contact_info.email}</span>
              </li>
              <li className="flex items-start gap-2 text-secondary-text text-sm">
                <LocationIcon />
                <span>{footer.contact_info.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Copyright bar ── */}
        <div className="mt-10 border-t border-border pt-4 pb-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-secondary-text text-xs">
          <span>{footer.copyright_text}</span>
          {/* <a
            href="https://asifulmamun.info.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-colors"
          >
            Report any problem @asifulmamun
          </a> */}
        </div>
      </div>
    </footer>
  );
}