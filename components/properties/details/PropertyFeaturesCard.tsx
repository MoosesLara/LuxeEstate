'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';

interface PropertyFeaturesCardProps {
  area: number;
  beds: number;
  baths: number;
  garages?: number;
}

export function PropertyFeaturesCard({
  area,
  beds,
  baths,
  garages = 2,
}: PropertyFeaturesCardProps) {
  const { t } = useI18n();

  const features = [
    {
      icon: 'square_foot',
      value: area,
      label: t('common.squareMeters'),
    },
    {
      icon: 'bed',
      value: beds,
      label: t('common.bedrooms'),
    },
    {
      icon: 'shower',
      value: baths,
      label: t('common.bathrooms'),
    },
    {
      icon: 'directions_car',
      value: garages,
      label: t('common.garage'),
    },
  ];

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-[#006655]/5">
      <h2 className="text-lg font-semibold mb-6 text-[#19322F]">
        {t('propertyDetails.featuresTitle')}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-5 bg-[#006655]/5 rounded-xl border border-[#006655]/10 hover:bg-[#006655]/10 transition-all group"
          >
            <div className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full aspect-square flex items-center justify-center flex-shrink-0 bg-white text-[#006655] shadow-sm mb-3 group-hover:scale-105 transition-transform">
              <span className="material-icons text-xl">
                {feature.icon}
              </span>
            </div>
            <span className="text-xl font-bold text-[#19322F]">
              {feature.value}
            </span>
            <span className="text-xs uppercase tracking-wider text-[#19322F]/60 mt-1 text-center font-medium">
              {feature.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
