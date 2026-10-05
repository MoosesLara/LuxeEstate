'use client';

import React from 'react';
import { MarketFilterType } from '@/types/filter.types';
import { useI18n } from '@/lib/i18n';

export type MarketTabType = MarketFilterType;

interface MarketFilterTabsProps {
  activeTab: MarketTabType;
  onTabChange: (tab: MarketTabType) => void;
}

export function MarketFilterTabs({
  activeTab,
  onTabChange,
}: MarketFilterTabsProps) {
  const { t } = useI18n();

  return (
    <div className="flex bg-white p-1 rounded-lg shadow-sm border border-[#19322F]/5">
      <button
        type="button"
        onClick={() => onTabChange('all')}
        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
          activeTab === 'all'
            ? 'bg-[#19322F] text-white shadow-sm'
            : 'text-[#5C706D] hover:text-[#19322F]'
        }`}
      >
        {t('market.tabAll')}
      </button>
      <button
        type="button"
        onClick={() => onTabChange('sale')}
        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
          activeTab === 'sale'
            ? 'bg-[#19322F] text-white shadow-sm'
            : 'text-[#5C706D] hover:text-[#19322F]'
        }`}
      >
        {t('market.tabSale')}
      </button>
      <button
        type="button"
        onClick={() => onTabChange('rent')}
        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
          activeTab === 'rent'
            ? 'bg-[#19322F] text-white shadow-sm'
            : 'text-[#5C706D] hover:text-[#19322F]'
        }`}
      >
        {t('market.tabRent')}
      </button>
    </div>
  );
}
