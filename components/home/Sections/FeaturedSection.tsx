'use client';

import React from 'react';
import { motion } from 'motion/react';
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex items-end justify-between mb-8"
      >
        <div>
          <h2 className="text-2xl font-light text-[#19322F]">
            {t('featured.title')}
          </h2>
          <p className="text-[#5C706D] mt-1 text-sm">
            {t('featured.subtitle')}
          </p>
        </div>
        <motion.button
          type="button"
          whileHover={{ x: 3 }}
          className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#006655] hover:opacity-80 transition-opacity cursor-pointer group"
        >
          <span>{t('featured.viewAllButton')}</span>
          <Icon name="arrow_forward" className="text-sm transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {properties.map((property, idx) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.65,
              delay: idx * 0.15,
              ease: 'easeOut',
            }}
          >
            <FeaturedPropertyCard
              property={property}
              onSelect={onSelectProperty}
              onToggleFavorite={onToggleFavorite}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
