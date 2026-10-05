'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Icon } from '@/components/ui/Icon';
import { useI18n } from '@/lib/i18n';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  onSearch,
  placeholder,
  className = '',
}: SearchBarProps) {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');

  const effectivePlaceholder = placeholder || t('hero.searchPlaceholder');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative group max-w-2xl mx-auto ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
        <Icon
          name="search"
          className="text-[#5C706D] text-2xl group-focus-within:text-[#006655] transition-colors"
        />
      </div>
      <input
        type="text"
        autoComplete="off"
        spellCheck={false}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={effectivePlaceholder}
        className="block w-full pl-14 pr-28 py-4 rounded-full border-none bg-white text-[#19322F] shadow-soft placeholder-[#5C706D]/60 focus:ring-2 focus:ring-[#006655] focus:outline-none transition-all text-base md:text-lg"
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.03, backgroundColor: '#005547' }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="absolute inset-y-2 right-2 px-6 bg-[#006655] text-white font-medium rounded-full transition-shadow flex items-center justify-center shadow-lg shadow-[#006655]/20 cursor-pointer"
      >
        {t('hero.searchButton')}
      </motion.button>
    </form>
  );
}
