'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';

interface LocationFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function LocationFilter({ value, onChange }: LocationFilterProps) {
  const { t } = useI18n();

  return (
    <section>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        {t('filtersModal.locationLabel')}
      </label>
      <div className="relative group">
        <span className="material-icons absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#006655] transition-colors">
          location_on
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('filtersModal.locationPlaceholder')}
          className="w-full pl-12 pr-4 py-3 bg-[#EEF6F6]/60 border-0 rounded-lg text-[#19322F] placeholder-gray-400 focus:ring-2 focus:ring-[#006655] focus:bg-white transition-all shadow-sm text-sm font-medium"
        />
      </div>
    </section>
  );
}
