"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from "../assets/img/logo.png";
import type { Locale } from "@/lib/i18n-config";
import type { CommonDictionary } from "@/lib/get-dictionary";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./language-switcher";

/** Ensure path ends with trailing slash */
function withSlash(path: string) {
  return path.endsWith('/') ? path : `${path}/`;
}

interface HeaderProps {
    lang: Locale;
    dictionary: CommonDictionary;
}

export default function Header({ lang, dictionary }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Check if current path matches menu item
    const isActive = (url: string) => {
        const fullPath = `/${lang}${url === '/' ? '' : url}`;
        return pathname === fullPath || (url === '/' && pathname === `/${lang}`);
    };

    return (
        <>
            <header className="absolute top-0 md:top-8 left-1/2 -translate-x-1/2 w-full md:w-10/12 z-50 bg-background shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <a href={withSlash(`/${lang}`)}>
                                <Image src={Logo} alt="Minha Foundation" width={70} height={70} className="w-auto h-14" />
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-1">
                            {dictionary.header.menu.map((item, index) => (
                                <a
                                    key={index}
                                    href={withSlash(`/${lang}${item.url === '/' ? '' : item.url}`)}
                                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                                        isActive(item.url)
                                            ? 'text-primary border-b-2 border-primary'
                                            : 'text-primary-text hover:text-primary'
                                    }`}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>

                        {/* Desktop Right Section */}
                        <div className="hidden lg:flex items-center space-x-3">
                            {/* Login Icon */}
                            <a
                                href={withSlash(`/${lang}/login`)}
                                className="w-10 h-10 rounded-full border border-secondary-light flex items-center justify-center text-secondary-text hover:bg-secondary-light transition-colors"
                                title={dictionary.header.login}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </a>

                            {/* Donate Button */}
                            <a
                                href={withSlash(`/${lang}/donate`)}
                                className="px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary/90 transition-colors"
                            >
                                {dictionary.header.donate}
                            </a>

                            {/* Language Switcher */}
                            <LanguageSwitcher currentLang={lang} variant="desktop" />
                        </div>

                        {/* Mobile Right Section */}
                        <div className="flex lg:hidden items-center space-x-2">
                            {/* Donate Button - Mobile */}
                            <a
                                href={withSlash(`/${lang}/donate`)}
                                className="px-4 py-2 bg-primary text-white text-xs font-medium rounded-full hover:bg-primary/90 transition-colors"
                            >
                                {dictionary.header.donate}
                            </a>

                            {/* Language Switcher - Mobile */}
                            <LanguageSwitcher currentLang={lang} variant="mobile" />

                            {/* Hamburger Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-md text-primary-text hover:bg-gray-100 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-background border-t border-border">
                        <nav className="px-4 py-4 space-y-2">
                            {dictionary.header.menu.map((item, index) => (
                                <a
                                    key={index}
                                    href={withSlash(`/${lang}${item.url === '/' ? '' : item.url}`)}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                        isActive(item.url)
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-primary-text hover:bg-gray-100'
                                    }`}
                                >
                                    {item.name}
                                </a>
                            ))}
                            <div className="pt-4 border-t border-border">
                                <a
                                    href={withSlash(`/${lang}/login`)}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center px-4 py-3 text-sm font-medium text-primary-text hover:bg-gray-100 rounded-lg"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    {dictionary.header.login}
                                </a>
                            </div>
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
}
