"use client";

import { useRouter, usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n-config";

interface LanguageSwitcherProps {
    currentLang: Locale;
    variant?: 'desktop' | 'mobile';
}

export default function LanguageSwitcher({ currentLang, variant = 'desktop' }: LanguageSwitcherProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleLanguageChange = (newLang: Locale) => {
        // Save language preference to localStorage
        localStorage.setItem('lang', newLang);
        
        // Navigate to the new language route
        const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
        router.push(newPath);
    };

    const isDesktop = variant === 'desktop';
    const buttonBaseClasses = isDesktop
        ? 'px-3 py-1.5 text-sm font-medium transition-colors'
        : 'px-2 py-1 text-xs font-medium transition-colors';

    return (
        <div className="flex items-center border border-border rounded-full overflow-hidden">
            <button
                onClick={() => handleLanguageChange('en')}
                className={`${buttonBaseClasses} ${
                    currentLang === 'en' 
                        ? 'bg-primary text-white' 
                        : 'text-secondary-text hover:bg-gray-100'
                }`}
            >
                EN
            </button>
            <button
                onClick={() => handleLanguageChange('bn')}
                className={`${buttonBaseClasses} ${
                    currentLang === 'bn' 
                        ? 'bg-primary text-white' 
                        : 'text-secondary-text hover:bg-gray-100'
                }`}
            >
                BN
            </button>
        </div>
    );
}
