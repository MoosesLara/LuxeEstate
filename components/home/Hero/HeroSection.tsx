'use client';

import React from 'react';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { useI18n } from '@/lib/i18n';
import { SearchBar } from './SearchBar';
import { CategoryFilters } from '../Filters/CategoryFilters';

interface HeroSectionProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSearch?: (query: string) => void;
  onOpenFilters?: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: 'easeOut',
    },
  },
};

export function HeroSection({
  selectedCategory,
  onSelectCategory,
  onSearch,
  onOpenFilters,
}: HeroSectionProps) {
  const { t } = useI18n();

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-12 md:py-16"
    >
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Main Heading with i18n support & animated highlight underline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-[#19322F] leading-tight"
        >
          {t('hero.titlePrefix')}{' '}
          <span className="relative inline-block">
            <span className="relative z-10 font-medium">
              {t('hero.titleHighlight')}
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.65, ease: 'easeOut' }}
              className="absolute bottom-2 left-0 w-full h-3 bg-[#006655]/20 -rotate-1 z-0 origin-left"
            />
          </span>
          {t('hero.titleSuffix')}
        </motion.h1>

        {/* Modular Search Bar with animated container */}
        <motion.div variants={itemVariants}>
          <SearchBar onSearch={onSearch} />
        </motion.div>

        {/* Category Filters with animated container */}
        <motion.div variants={itemVariants}>
          <CategoryFilters
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            onOpenFilters={onOpenFilters}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
