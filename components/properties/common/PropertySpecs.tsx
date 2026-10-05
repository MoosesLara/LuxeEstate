import React from 'react';
import { Icon } from '@/components/ui/Icon';
import { formatArea } from '@/lib/formatters';
import { useI18n } from '@/lib/i18n';

interface PropertySpecsProps {
  beds: number;
  baths: number;
  area: number;
  layout?: 'compact' | 'expanded';
  className?: string;
}

export function PropertySpecs({
  beds,
  baths,
  area,
  layout = 'compact',
  className = '',
}: PropertySpecsProps) {
  const { t } = useI18n();

  if (layout === 'expanded') {
    return (
      <div className={`flex items-center gap-6 ${className}`}>
        <div className="flex items-center gap-2 text-[#5C706D] text-sm">
          <Icon name="king_bed" className="text-lg text-[#5C706D]" />
          <span>{beds} {t('common.bedrooms')}</span>
        </div>
        <div className="flex items-center gap-2 text-[#5C706D] text-sm">
          <Icon name="bathtub" className="text-lg text-[#5C706D]" />
          <span>{baths} {t('common.bathrooms')}</span>
        </div>
        <div className="flex items-center gap-2 text-[#5C706D] text-sm">
          <Icon name="square_foot" className="text-lg text-[#5C706D]" />
          <span>{formatArea(area)}</span>
        </div>
      </div>
    );
  }

  // Compact layout (used on market cards)
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-1 text-[#5C706D] text-xs">
        <Icon name="king_bed" className="text-sm text-[#006655]/80" />
        <span>{beds}</span>
      </div>
      <div className="flex items-center gap-1 text-[#5C706D] text-xs">
        <Icon name="bathtub" className="text-sm text-[#006655]/80" />
        <span>{baths}</span>
      </div>
      <div className="flex items-center gap-1 text-[#5C706D] text-xs">
        <Icon name="square_foot" className="text-sm text-[#006655]/80" />
        <span>{area}m²</span>
      </div>
    </div>
  );
}
