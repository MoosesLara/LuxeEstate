'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useI18n, Locale } from '@/lib/i18n';
import { FlagIcon } from './FlagIcon';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'navbar' | 'compact' | 'footer';
}

export function LanguageSelector({
  className = '',
  variant = 'navbar',
}: LanguageSelectorProps) {
  const { locale, setLocale, supportedLocales } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentConfig = supportedLocales[locale] || supportedLocales.es;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (code: Locale) => {
    setLocale(code);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer shadow-sm select-none ${
          isOpen
            ? 'bg-[#006655]/10 border-[#006655] text-[#006655]'
            : 'bg-white/90 border-[#19322F]/10 hover:border-[#006655] text-[#19322F]'
        } ${variant === 'footer' ? 'text-xs' : 'text-xs font-semibold'}`}
      >
        <FlagIcon locale={currentConfig.code} size={18} />
        <span className="uppercase tracking-wider font-semibold text-[#19322F]">
          {currentConfig.code}
        </span>
        <span
          className={`material-icons text-[14px] text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#006655]' : ''
          }`}
        >
          expand_more
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#006655]/10 py-1.5 z-50 animate-fadeIn"
        >
          <div className="px-3 py-1.5 border-b border-gray-100 text-[10px] uppercase font-bold tracking-wider text-gray-400">
            Language / Idioma / Langue
          </div>
          {Object.values(supportedLocales).map((item) => {
            const isSelected = item.code === locale;
            return (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(item.code as Locale)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-left text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#006655]/10 text-[#006655] font-bold'
                    : 'text-[#19322F] hover:bg-[#EEF6F6]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FlagIcon locale={item.code} size={20} />
                  <span className="font-medium">{item.localName}</span>
                </div>
                {isSelected && (
                  <span className="material-icons text-sm text-[#006655]">
                    check
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

