import 'server-only';
import fs from 'fs';
import path from 'path';
import type { Locale } from './i18n-config';

// Menu item type (shared for header)
export interface MenuItem {
  name: string;
  url: string;
}

// Social link type (shared for footer)
export interface SocialLink {
  name: string;
  url: string;
  icon: string; // icon key: 'facebook' | 'twitter' | 'instagram' | 'linkedin'
}

// Contact info type (shared for footer)
export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
}

// Quick links section type (footer columns)
export interface QuickLinkSection {
  title: string;
  links: MenuItem[];
}

// Common dictionary (header, footer, metadata, shared content)
export interface CommonDictionary {
  images: {
    logo: string;
    footerBg: string;
    favicon: string;
    ogImage: string;
    breadcrumb: string;
  };
  metadata: {
    title: string;
    description: string;
  };
  header: {
    donate: string;
    login: string;
    menu: MenuItem[];
  };
  common: {
    loading: string;
    error: string;
  };
  footer: {
    about_text: string;
    quick_links: QuickLinkSection[];
    contact_info: ContactInfo;
    social_links: SocialLink[];
    copyright_text: string;
  };
}

// Cache for dictionaries to avoid re-reading files
const dictionaryCache: Record<string, unknown> = {};

/**
 * Generic dictionary loader for page-specific JSON files.
 * Each page defines its own interface and passes it as the type parameter.
 * 
 * @example
 * // In your page.tsx:
 * interface AboutPageData {
 *   title: string;
 *   description: string;
 *   content: string;
 * }
 * const data = await getDictionary<AboutPageData>(locale, 'about');
 */
export async function getDictionary<T>(
  locale: Locale,
  page: string
): Promise<T> {
  const cacheKey = `${locale}/${page}`;
  
  if (dictionaryCache[cacheKey]) {
    return dictionaryCache[cacheKey] as T;
  }

  const filePath = path.join(process.cwd(), 'public', 'cdn', 'dictionaries', locale, `${page}.json`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const dictionary = JSON.parse(fileContents) as T;

  dictionaryCache[cacheKey] = dictionary;

  return dictionary;
}

// Convenience function for common dictionary (used by layout)
export async function getCommonDictionary(locale: Locale): Promise<CommonDictionary> {
  return getDictionary<CommonDictionary>(locale, 'common');
}
