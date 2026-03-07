import 'server-only';
import fs from 'fs';
import path from 'path';
import type { Locale } from './i18n-config';

// Menu item type (shared for header)
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
