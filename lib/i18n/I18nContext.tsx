'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Locale, DEFAULT_LOCALE, SUPPORTED_LOCALES, LocaleConfig } from '@/config/i18n.config';
import { Dictionary } from '@/types/i18n.types';
import { getDictionarySync, translateKey } from './dictionaries';
import { setLocaleCookie, getLocaleCookie } from './cookies';

interface I18nContextValue {
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
  dict: Dictionary;
  t: (key: string, params?: Record<string, string | number>) => string;
  supportedLocales: Record<Locale, LocaleConfig>;
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  children: React.ReactNode;
  initialLocale?: Locale;
}

export function I18nProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Sync with cookie on initial client mount if available
  useEffect(() => {
    const saved = getLocaleCookie();
    if (saved && saved !== locale) {
      setLocaleState(saved);
    }
  }, []);

  // Update HTML lang attribute whenever locale changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleCookie(newLocale);
    setLocaleState(newLocale);
  };

  const dict = useMemo(() => getDictionarySync(locale), [locale]);

  const t = useMemo(() => {
    return (key: string, params?: Record<string, string | number>) => {
      return translateKey(dict, key, params);
    };
  }, [dict]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      dict,
      t,
      supportedLocales: SUPPORTED_LOCALES,
    }),
    [locale, dict, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * Hook to access i18n translations, active locale, and language switcher.
 */
export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    // Graceful fallback for components rendered outside provider
    const fallbackDict = getDictionarySync(DEFAULT_LOCALE);
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      dict: fallbackDict,
      t: (key: string, params?: Record<string, string | number>) =>
        translateKey(fallbackDict, key, params),
      supportedLocales: SUPPORTED_LOCALES,
    };
  }
  return context;
}
