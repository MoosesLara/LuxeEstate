'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Property } from '@/types/property.types';
import { MarketFilterType } from '@/types/filter.types';
import { PropertyCard } from '@/components/properties/cards/PropertyCard';
import { MarketFilterTabs } from '../Filters/MarketFilterTabs';
import { Pagination } from '@/components/ui/Pagination';
import { useI18n } from '@/lib/i18n';

interface PaginationInfo {
  total: number;
  page: number;
  totalPages: number;
  pageSize: number;
}

interface MarketSectionProps {
  properties: Property[];
  pagination: PaginationInfo;
  activeFilter: MarketFilterType;
  onTabChange?: (tab: MarketFilterType) => void;
  onPageChange?: (page: number) => void;
  onSelectProperty?: (property: Property) => void;
  onToggleFavorite?: (propertyId: string, isFavorite: boolean) => void;
}

export function MarketSection({
  properties,
  pagination,
  activeFilter,
  onTabChange,
  onPageChange,
  onSelectProperty,
  onToggleFavorite,
}: MarketSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useI18n();

  function handleTabChange(tab: MarketFilterType) {
    if (onTabChange) {
      onTabChange(tab);
    }
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('page', '1');
    if (tab !== 'all') {
      params.set('type', tab);
    } else {
      params.delete('type');
    }
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `${pathname}?${params.toString()}`);
    }
  }

  const startItem = (pagination.page - 1) * pagination.pageSize + 1;
  const endItem = Math.min(pagination.page * pagination.pageSize, pagination.total);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 w-full"
      >
        <div className="w-full sm:w-auto">
          <h2 className="text-2xl font-light text-[#19322F]">
            {t('market.title')}
          </h2>
          <p className="text-[#5C706D] mt-1 text-sm">
            {pagination.total > 0
              ? t('market.showingRange', {
                  start: startItem,
                  end: endItem,
                  total: pagination.total,
                })
              : t('market.subtitleFresh')}
          </p>
        </div>
        <div className="w-full sm:w-auto flex items-center">
          <MarketFilterTabs
            activeTab={activeFilter}
            onTabChange={handleTabChange}
            className="w-full sm:w-auto"
          />
        </div>
      </motion.div>

      {properties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {properties.map((property, idx) => (
                <motion.div
                  key={property.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.45,
                    delay: (idx % 4) * 0.06,
                    ease: 'easeOut',
                  }}
                >
                  <PropertyCard
                    property={property}
                    onSelect={onSelectProperty}
                    onToggleFavorite={onToggleFavorite}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            activeFilter={activeFilter}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <div className="text-center py-16 bg-white/50 rounded-2xl border border-dashed border-[#19322F]/10">
          <p className="text-[#5C706D]">{t('market.emptyState')}</p>
        </div>
      )}
    </section>
  );
}
