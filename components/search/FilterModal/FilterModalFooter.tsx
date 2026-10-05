'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';

interface FilterModalFooterProps {
  onClear: () => void;
  onApply: () => void;
  resultCount?: number;
}

export function FilterModalFooter({
  onClear,
  onApply,
  resultCount = 124,
}: FilterModalFooterProps) {
  const { t } = useI18n();

  return (
    <footer className="bg-white border-t border-gray-100 px-8 py-6 sticky bottom-0 z-30 flex items-center justify-between">
      <button
        type="button"
        onClick={onClear}
        className="text-sm font-medium text-gray-500 hover:text-[#19322F] transition-colors underline decoration-gray-300 underline-offset-4 cursor-pointer"
      >
        {t('filtersModal.clearAll')}
      </button>

      <button
        type="button"
        onClick={onApply}
        className="bg-[#006655] hover:bg-[#005544] text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-[#006655]/30 transition-all hover:shadow-[#006655]/40 flex items-center gap-2 transform active:scale-95 cursor-pointer"
      >
        <span>
          {resultCount === 1
            ? t('filtersModal.showHomeButtonSingle', { count: resultCount })
            : t('filtersModal.showHomesButton', { count: resultCount })}
        </span>
        <span className="material-icons text-sm">arrow_forward</span>
      </button>
    </footer>
  );
}
