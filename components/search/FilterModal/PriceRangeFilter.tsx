'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onChange: (min: number, max: number) => void;
}

const MIN_LIMIT = 200000;
const MAX_LIMIT = 10000000;
const STEP = 50000;

function formatBadgePrice(val: number): string {
  if (val >= 1000000) {
    const m = (val / 1000000).toFixed(1).replace('.0', '');
    return `$${m}M`;
  }
  return `$${Math.round(val / 1000)}K`;
}

export function PriceRangeFilter({
  minPrice,
  maxPrice,
  onChange,
}: PriceRangeFilterProps) {
  const { t } = useI18n();
  const minPercent = Math.max(
    0,
    Math.min(100, ((minPrice - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100)
  );
  const maxPercent = Math.max(
    0,
    Math.min(100, ((maxPrice - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100)
  );

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), maxPrice - STEP);
    onChange(val, maxPrice);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), minPrice + STEP);
    onChange(minPrice, val);
  };

  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    const num = Number(raw) || 0;
    onChange(num, maxPrice);
  };

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    const num = Number(raw) || 0;
    onChange(minPrice, num);
  };

  return (
    <section>
      <div className="flex justify-between items-end mb-4">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {t('filtersModal.priceRangeLabel')}
        </label>
        <span className="text-sm font-semibold text-[#006655]">
          {formatBadgePrice(minPrice)} – {formatBadgePrice(maxPrice)}
        </span>
      </div>

      {/* Dual Range Slider Container */}
      <div className="relative h-12 flex items-center mb-6 px-2 select-none">
        {/* Background Track */}
        <div className="absolute left-2 right-2 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#006655] transition-all"
            style={{
              marginLeft: `${minPercent}%`,
              width: `${Math.max(0, maxPercent - minPercent)}%`,
            }}
          />
        </div>

        {/* Visual Handles */}
        <div
          className="absolute w-6 h-6 bg-white border-2 border-[#006655] rounded-full shadow-md pointer-events-none hover:scale-110 transition-transform -ml-3 z-10"
          style={{ left: `calc(8px + (100% - 16px) * ${minPercent / 100})` }}
        />
        <div
          className="absolute w-6 h-6 bg-white border-2 border-[#006655] rounded-full shadow-md pointer-events-none hover:scale-110 transition-transform -ml-3 z-10"
          style={{ left: `calc(8px + (100% - 16px) * ${maxPercent / 100})` }}
        />

        {/* Dual Input Range Sliders (transparent interactive layer) */}
        <input
          type="range"
          min={MIN_LIMIT}
          max={MAX_LIMIT}
          step={STEP}
          value={minPrice}
          onChange={handleMinChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 pointer-events-auto"
          aria-label="Minimum price slider"
        />
        <input
          type="range"
          min={MIN_LIMIT}
          max={MAX_LIMIT}
          step={STEP}
          value={maxPrice}
          onChange={handleMaxChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30 pointer-events-auto"
          aria-label="Maximum price slider"
        />
      </div>

      {/* Numerical Input Boxes */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#EEF6F6]/60 p-3 rounded-lg border border-transparent focus-within:border-[#006655]/40 transition-colors">
          <label className="block text-[10px] text-gray-500 uppercase font-medium mb-1">
            {t('filtersModal.minPriceLabel')}
          </label>
          <div className="flex items-center">
            <span className="text-gray-400 mr-1">$</span>
            <input
              type="text"
              value={minPrice.toLocaleString()}
              onChange={handleMinInput}
              className="w-full bg-transparent border-0 p-0 text-[#19322F] font-semibold focus:ring-0 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="bg-[#EEF6F6]/60 p-3 rounded-lg border border-transparent focus-within:border-[#006655]/40 transition-colors">
          <label className="block text-[10px] text-gray-500 uppercase font-medium mb-1">
            {t('filtersModal.maxPriceLabel')}
          </label>
          <div className="flex items-center">
            <span className="text-gray-400 mr-1">$</span>
            <input
              type="text"
              value={maxPrice.toLocaleString()}
              onChange={handleMaxInput}
              className="w-full bg-transparent border-0 p-0 text-[#19322F] font-semibold focus:ring-0 text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
