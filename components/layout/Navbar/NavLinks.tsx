'use client';

import React from 'react';
import { MAIN_NAV_ITEMS } from '@/config/navigation.config';
import { useI18n } from '@/lib/i18n';

interface NavLinksProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isMobile?: boolean;
}

export function NavLinks({ activeTab, onTabChange, isMobile = false }: NavLinksProps) {
  const { t } = useI18n();

  const getLabel = (id: string, fallback: string) => {
    switch (id) {
      case 'buy':
        return t('nav.buy');
      case 'rent':
        return t('nav.rent');
      case 'sell':
        return t('nav.sell');
      case 'saved-homes':
        return t('nav.savedHomes');
      default:
        return fallback;
    }
  };

  if (isMobile) {
    return (
      <div className="px-4 space-y-1">
        {MAIN_NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium cursor-pointer transition-colors ${
                isActive
                  ? 'text-[#006655] bg-[#006655]/10'
                  : 'text-[#19322F] hover:bg-black/5'
              }`}
            >
              {getLabel(item.id, item.label)}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-8">
      {MAIN_NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onTabChange(item.id)}
            className={`font-medium text-sm px-1 py-1 transition-all cursor-pointer ${
              isActive
                ? 'text-[#006655] border-b-2 border-[#006655]'
                : 'text-[#19322F]/70 hover:text-[#19322F] hover:border-b-2 hover:border-[#19322F]/20'
            }`}
          >
            {getLabel(item.id, item.label)}
          </button>
        );
      })}
    </div>
  );
}
