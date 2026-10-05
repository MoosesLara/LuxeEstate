export const LOCALES = ['es', 'en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';

export interface LocaleConfig {
  code: Locale;
  name: string;
  localName: string;
  flag: string;
}

export const SUPPORTED_LOCALES: Record<Locale, LocaleConfig> = {
  es: {
    code: 'es',
    name: 'Spanish',
    localName: 'Español',
    flag: '🇪🇸',
  },
  en: {
    code: 'en',
    name: 'English',
    localName: 'English',
    flag: '🇺🇸',
  },
  fr: {
    code: 'fr',
    name: 'French',
    localName: 'Français',
    flag: '🇫🇷',
  },
};
