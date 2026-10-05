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
            className="flex flex-col items-center justify-center p-4 bg-[#006655]/5 rounded-lg border border-[#006655]/10 hover:bg-[#006655]/10 transition-colors"
          >
            <span className="material-icons text-[#006655] text-2xl mb-2">
              {feature.icon}
            </span>
            <span className="text-xl font-bold text-[#19322F]">
              {feature.value}
            </span>
            <span className="text-xs uppercase tracking-wider text-[#19322F]/50 mt-1 text-center font-medium">
              {feature.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
