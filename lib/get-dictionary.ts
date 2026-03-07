import 'server-only';
import fs from 'fs';
import path from 'path';
import type { Locale } from './i18n-config';

// Dictionary type - extend this as you add more translations
export interface Dictionary {
  metadata: {
    title: string;
    description: string;
  };
  header: {
    home: string;
    about: string;
    contact: string;
  };
  home: {
    banner: {
      title: string;
      subtitle: string;
    };
    heading: string;
  };
  about: {
    title: string;
    description: string;
    content: string;
  };
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
