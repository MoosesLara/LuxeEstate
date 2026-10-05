import { Locale, DEFAULT_LOCALE } from '@/config/i18n.config';
import { Dictionary } from '@/types/i18n.types';

import es from '@/locales/es.json';
import en from '@/locales/en.json';
import fr from '@/locales/fr.json';

/**
 * Registry of active language dictionaries.
 * To add a new language:
 * 1. Add code to LOCALES in config/i18n.config.ts
 * 2. Create locales/[code].json
 * 3. Import and register here
 */
export const DICTIONARIES: Record<Locale, Dictionary> = {
  es: es as unknown as Dictionary,
  en: en as unknown as Dictionary,
  fr: fr as unknown as Dictionary,
};

/**
 * Helper to retrieve nested values by dot notation (e.g. 'hero.titlePrefix')
 * and interpolate variables (e.g. '{count}').
 */
export function translateKey(
  dict: Dictionary,
  key: string,
  params?: Record<string, string | number>
): string {
  const segments = key.split('.');
  let current: unknown = dict;

  for (const segment of segments) {
    if (current && typeof current === 'object' && segment in current) {
      current = (current as Record<string, unknown>)[segment];
    } else {
      // Fallback to English dictionary if key not found
      let fallbackCurrent: unknown = DICTIONARIES.en;
      for (const fbSegment of segments) {
        if (fallbackCurrent && typeof fallbackCurrent === 'object' && fbSegment in fallbackCurrent) {
          fallbackCurrent = (fallbackCurrent as Record<string, unknown>)[fbSegment];
        } else {
          return key;
        }
      }
      current = fallbackCurrent;
      break;
    }
  }

  if (typeof current !== 'string') {
    return key;
  }

  if (!params) {
    return current;
  }

  // Interpolate parameters like {count}, {start}, {end}, {payment}
  let result = current;
  for (const [pKey, pVal] of Object.entries(params)) {
    result = result.replace(new RegExp(`\\{${pKey}\\}`, 'g'), String(pVal));
  }
  return result;
}

/**
 * Returns the dictionary for the specified locale synchronously.
 */
export function getDictionarySync(locale: string = DEFAULT_LOCALE): Dictionary {
  const normalized = (locale in DICTIONARIES ? locale : DEFAULT_LOCALE) as Locale;
  return DICTIONARIES[normalized] || DICTIONARIES[DEFAULT_LOCALE];
}

/**
 * Asynchronous dictionary loader (Next.js Server Components pattern).
 */
export async function getDictionary(locale: string = DEFAULT_LOCALE): Promise<Dictionary> {
  return getDictionarySync(locale);
}
