'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MarketFilterType } from '@/types/filter.types';
import { useI18n } from '@/lib/i18n';

export type MarketTabType = MarketFilterType;

interface MarketFilterTabsProps {
  activeTab: MarketTabType;
  onTabChange: (tab: MarketTabType) => void;
  className?: string;
}

export function MarketFilterTabs({
  activeTab,
  onTabChange,
  className = '',
}: MarketFilterTabsProps) {
  const { t } = useI18n();

  const tabs: { id: MarketTabType; label: string }[] = [
    { id: 'all', label: t('market.tabAll') },
    { id: 'sale', label: t('market.tabSale') },
    { id: 'rent', label: t('market.tabRent') },
  ];

  return (
    <div className={`flex w-full sm:w-auto bg-white p-1 rounded-xl shadow-sm border border-[#19322F]/5 relative ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 sm:flex-initial text-center whitespace-nowrap relative px-4 py-2 sm:py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer select-none ${
              isActive ? 'text-white' : 'text-[#5C706D] hover:text-[#19322F]'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeMarketTabPill"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                className="absolute inset-0 bg-[#19322F] rounded-lg shadow-sm"
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
