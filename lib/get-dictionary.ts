import 'server-only';
import fs from 'fs';
import path from 'path';
import type { Locale } from './i18n-config';

// Menu item type
export interface MenuItem {
  name: string;
  url: string;
}

// Page content type (reusable for all pages)
export interface PageContent {
  title: string;
  description: string;
  content: string;
}

// Dictionary type - extend this as you add more translations
export interface Dictionary {
  metadata: {
    title: string;
    description: string;
  };
  header: {
    donate: string;
    login: string;
    menu: MenuItem[];
  };
  home: {
    banner: {
      title: string;
      subtitle: string;
    };
    heading: string;
  };
  about: PageContent;
  activities: PageContent;
  gallery: PageContent;
  connect: PageContent;
  blogs: PageContent;
  notice: PageContent;
  contact: PageContent;
  common: {
    loading: string;
    error: string;
  };
}

// Cache for dictionaries to avoid re-reading files
const dictionaries: Record<string, Dictionary> = {};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  // Return cached dictionary if available
  if (dictionaries[locale]) {
    return dictionaries[locale];
  }

  // Read from public/cdn/dictionaries during build time
  const filePath = path.join(process.cwd(), 'public', 'cdn', 'dictionaries', `${locale}.json`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const dictionary: Dictionary = JSON.parse(fileContents);

  // Cache the dictionary
  dictionaries[locale] = dictionary;

  return dictionary;
}
