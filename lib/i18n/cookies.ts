import { Locale, DEFAULT_LOCALE, LOCALES } from '@/config/i18n.config';

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/**
 * Saves the user's selected language in a persistent cookie (client-side).
 */
export function setLocaleCookie(locale: Locale): void {
  if (typeof document === 'undefined') return;

  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
}

/**
 * Reads the user's saved language cookie (client-side).
 */
export function getLocaleCookie(): Locale {
  if (typeof document === 'undefined') return DEFAULT_LOCALE;

  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${LOCALE_COOKIE_NAME}=`));

  if (match) {
    const value = match.split('=')[1] as Locale;
    if (LOCALES.includes(value)) {
      return value;
    }
  }

  return DEFAULT_LOCALE;
}
