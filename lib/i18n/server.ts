import { cookies } from 'next/headers';
import { Locale, DEFAULT_LOCALE, LOCALES } from '@/config/i18n.config';
import { LOCALE_COOKIE_NAME } from './cookies';

/**
 * Retrieves the preferred locale from incoming request cookies on the server.
 */
export async function getServerLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const saved = cookieStore.get(LOCALE_COOKIE_NAME)?.value as Locale;
    if (saved && LOCALES.includes(saved)) {
      return saved;
    }
  } catch {
    // Fallback when called outside of active request
  }
  return DEFAULT_LOCALE;
}
