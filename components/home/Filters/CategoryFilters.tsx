'use client';

import React from 'react';
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
    <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scroll py-2 px-4 -mx-4">
      {PROPERTY_CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              isActive
                ? 'bg-[#19322F] text-white shadow-lg shadow-[#19322F]/10 hover:-translate-y-0.5'
                : 'bg-white border border-[#19322F]/5 text-[#5C706D] hover:text-[#19322F] hover:border-[#006655]/50 hover:bg-[#006655]/5'
            }`}
          >
            {getCategoryLabel(cat.id, cat.label)}
          </button>
        );
      })}

      <div className="w-px h-6 bg-[#19322F]/10 mx-2" aria-hidden="true" />

      <button
        type="button"
        onClick={onOpenFilters}
        className="whitespace-nowrap flex items-center gap-1 px-4 py-2 rounded-full text-[#19322F] font-medium text-sm hover:bg-black/5 transition-colors cursor-pointer"
      >
        <Icon name="tune" className="text-base text-[#19322F]" />
        <span>{t('categories.filtersButton')}</span>
      </button>
    </div>
  );
}
