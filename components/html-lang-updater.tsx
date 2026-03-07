"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n-config";

interface HtmlLangUpdaterProps {
  lang: Locale;
}

export default function HtmlLangUpdater({ lang }: HtmlLangUpdaterProps) {
  useEffect(() => {
    // Update the html lang attribute based on current locale
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
