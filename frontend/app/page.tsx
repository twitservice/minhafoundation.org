"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { i18n } from '@/lib/i18n-config';

// Root page redirects based on localStorage preference or default locale
export default function RootPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for saved language preference (hydration-safe)
    const savedLang = localStorage.getItem('lang');
    
    // Validate saved language is a valid locale
    const targetLang = savedLang && i18n.locales.includes(savedLang as typeof i18n.locales[number])
      ? savedLang
      : i18n.defaultLocale;
    
    // Save to localStorage if not already set
    if (!savedLang) {
      localStorage.setItem('lang', i18n.defaultLocale);
    }
    
    // Redirect to the target language
    router.replace(`/${targetLang}`);
    setIsLoading(false);
  }, [router]);

  // Show minimal loading state during redirect
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return null;
}
