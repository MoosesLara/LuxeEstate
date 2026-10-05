'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
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
  onSelectProperty?: (property: Property) => void;
  onToggleFavorite?: (propertyId: string, isFavorite: boolean) => void;
}

export function MarketSection({
  properties,
  pagination,
  activeFilter,
  onSelectProperty,
  onToggleFavorite,
}: MarketSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useI18n();

  function handleTabChange(tab: MarketFilterType) {
    const params = new URLSearchParams(searchParams.toString());
    // Reset to page 1 whenever filter changes
    params.set('page', '1');
    if (tab !== 'all') {
      params.set('type', tab);
    } else {
      params.delete('type');
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const startItem = (pagination.page - 1) * pagination.pageSize + 1;
  const endItem = Math.min(pagination.page * pagination.pageSize, pagination.total);

  return (
    <section>
      <div className="flex items-end justify-between mb-8">
        <div>
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
        <div className="flex items-center">
          <MarketFilterTabs
            activeTab={activeFilter}
            onTabChange={handleTabChange}
          />
        </div>
      </div>

      {properties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={onSelectProperty}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>

          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            activeFilter={activeFilter}
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
