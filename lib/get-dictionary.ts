import 'server-only';
import fs from 'fs';
import path from 'path';
import type { Locale } from './i18n-config';

// Menu item type
export interface MenuItem {
  name: string;
  url: string;
}

// Common dictionary (header, metadata, shared content)
export interface CommonDictionary {
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
}

// Home page dictionary
export interface HomeDictionary {
  title: string;
  description: string;
  banner: {
    title: string;
    subtitle: string;
  };
  heading: string;
}

// Generic page dictionary (about, activities, gallery, etc.)
export interface PageDictionary {
  title: string;
  description: string;
  content: string;
}

// Page type union
export type PageName = 'common' | 'home' | 'about' | 'activities' | 'gallery' | 'connect' | 'blogs' | 'notice' | 'contact' | 'donate' | 'login';

// Cache for page dictionaries to avoid re-reading files
const dictionaryCache: Record<string, unknown> = {};

// Get page-specific dictionary
export async function getDictionary<T = PageDictionary>(
  locale: Locale,
  page: PageName
): Promise<T> {
  const cacheKey = `${locale}/${page}`;
  
  // Return cached dictionary if available
  if (dictionaryCache[cacheKey]) {
    return dictionaryCache[cacheKey] as T;
  }

  // Read from public/cdn/dictionaries/[lang]/[page].json during build time
  const filePath = path.join(process.cwd(), 'public', 'cdn', 'dictionaries', locale, `${page}.json`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const dictionary = JSON.parse(fileContents) as T;

  // Cache the dictionary
  dictionaryCache[cacheKey] = dictionary;

  return dictionary;
}

// Convenience function to get common dictionary
export async function getCommonDictionary(locale: Locale): Promise<CommonDictionary> {
  return getDictionary<CommonDictionary>(locale, 'common');
}

// Convenience function to get home dictionary
export async function getHomeDictionary(locale: Locale): Promise<HomeDictionary> {
  return getDictionary<HomeDictionary>(locale, 'home');
}
