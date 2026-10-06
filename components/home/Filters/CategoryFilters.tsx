'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Icon } from '@/components/ui/Icon';
import { PROPERTY_CATEGORIES } from '@/config/navigation.config';
import { useI18n } from '@/lib/i18n';

interface CategoryFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenFilters?: () => void;
}

export function CategoryFilters({
  selectedCategory,
  onSelectCategory,
  onOpenFilters,
}: CategoryFiltersProps) {
  const { t } = useI18n();

  const getCategoryLabel = (id: string, fallback: string) => {
    switch (id) {
      case 'all':
        return t('categories.all');
      case 'house':
        return t('categories.house');
      case 'apartment':
        return t('categories.apartment');
      case 'villa':
        return t('categories.villa');
      case 'penthouse':
        return t('categories.penthouse');
      default:
        return fallback;
    }
  };

  return (
    <div className="flex items-center justify-start sm:justify-center gap-2.5 sm:gap-3 overflow-x-auto hide-scroll py-2 px-2 sm:px-4 max-w-full w-full">
      {PROPERTY_CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat.id;
        return (
          <motion.button
            key={cat.id}
            type="button"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={() => onSelectCategory(cat.id)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              isActive
                ? 'bg-[#19322F] text-white shadow-lg shadow-[#19322F]/15 ring-2 ring-[#19322F]/20'
                : 'bg-white border border-[#19322F]/5 text-[#5C706D] hover:text-[#19322F] hover:border-[#006655]/40 hover:bg-[#006655]/5 shadow-sm'
            }`}
          >
            {getCategoryLabel(cat.id, cat.label)}
          </motion.button>
        );
      })}

      <div className="w-px h-6 bg-[#19322F]/10 mx-2" aria-hidden="true" />

      <motion.button
        type="button"
        whileHover={{ scale: 1.04, backgroundColor: 'rgba(0,0,0,0.05)' }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        onClick={onOpenFilters}
        className="whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-full text-[#19322F] font-medium text-sm transition-colors cursor-pointer border border-[#19322F]/10 bg-white shadow-sm"
      >
        <Icon name="tune" className="text-base text-[#19322F]" />
        <span>{t('categories.filtersButton')}</span>
      </motion.button>
    </div>
  );
}
