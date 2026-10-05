'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import { SearchBar } from './SearchBar';
import { CategoryFilters } from '../Filters/CategoryFilters';

interface HeroSectionProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSearch?: (query: string) => void;
  onOpenFilters?: () => void;
}

export function HeroSection({
  selectedCategory,
  onSelectCategory,
  onSearch,
  onOpenFilters,
}: HeroSectionProps) {
  const { t } = useI18n();

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Main Heading with i18n support */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#19322F] leading-tight">
          {t('hero.titlePrefix')}{' '}
          <span className="relative inline-block">
            <span className="relative z-10 font-medium">
              {t('hero.titleHighlight')}
            </span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-[#006655]/20 -rotate-1 z-0"></span>
          </span>
          {t('hero.titleSuffix')}
        </h1>

        {/* Modular Search Bar */}
        <SearchBar onSearch={onSearch} />

        {/* Category Filters */}
        <CategoryFilters
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          onOpenFilters={onOpenFilters}
        />
      </div>
    </section>
  );
}
