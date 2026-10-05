'use client';

import React from 'react';
import { Property } from '@/types/property.types';
import { FeaturedPropertyCard } from '@/components/properties/cards/FeaturedPropertyCard';
import { Icon } from '@/components/ui/Icon';
import { useI18n } from '@/lib/i18n';

interface FeaturedSectionProps {
  properties: Property[];
  onSelectProperty?: (property: Property) => void;
  onToggleFavorite?: (propertyId: string, isFavorite: boolean) => void;
}

export function FeaturedSection({
  properties,
  onSelectProperty,
  onToggleFavorite,
}: FeaturedSectionProps) {
  const { t } = useI18n();

  return (
    <section className="mb-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light text-[#19322F]">
            {t('featured.title')}
          </h2>
          <p className="text-[#5C706D] mt-1 text-sm">
            {t('featured.subtitle')}
          </p>
        </div>
        <button
          type="button"
          className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#006655] hover:opacity-70 transition-opacity cursor-pointer"
        >
          <span>{t('featured.viewAllButton')}</span>
          <Icon name="arrow_forward" className="text-sm" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {properties.map((property) => (
          <FeaturedPropertyCard
            key={property.id}
            property={property}
            onSelect={onSelectProperty}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}
