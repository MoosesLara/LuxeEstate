'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';

interface PropertyDetailsFilterProps {
  propertyType: string;
  beds: number;
  baths: number;
  onPropertyTypeChange: (type: string) => void;
  onBedsChange: (beds: number) => void;
  onBathsChange: (baths: number) => void;
}

const PROPERTY_TYPES = [
  'Any Type',
  'House',
  'Apartment',
  'Condo',
  'Townhouse',
  'Villa',
  'Penthouse',
];

export function PropertyDetailsFilter({
  propertyType,
  beds,
  baths,
  onPropertyTypeChange,
  onBedsChange,
  onBathsChange,
}: PropertyDetailsFilterProps) {
  const { t } = useI18n();
  const formatCount = (count: number) => (count === 0 ? t('filtersModal.anyCount') : `${count}+`);

  const getPropertyTypeName = (type: string) => {
    switch (type) {
      case 'Any Type':
        return t('filtersModal.anyTypeOption');
      case 'House':
        return t('filtersModal.propertyTypeHouse');
      case 'Apartment':
        return t('filtersModal.propertyTypeApartment');
      case 'Condo':
        return t('filtersModal.propertyTypeCondo');
      case 'Townhouse':
        return t('filtersModal.propertyTypeTownhouse');
      case 'Villa':
        return t('filtersModal.propertyTypeVilla');
      case 'Penthouse':
        return t('filtersModal.propertyTypePenthouse');
      default:
        return type;
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Property Type Dropdown */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {t('filtersModal.propertyTypeLabel')}
        </label>
        <div className="relative">
          <select
            value={propertyType}
            onChange={(e) => onPropertyTypeChange(e.target.value)}
            className="w-full bg-[#EEF6F6]/60 border-0 rounded-lg py-3 pl-4 pr-10 text-[#19322F] font-medium appearance-none focus:ring-2 focus:ring-[#006655] cursor-pointer text-sm"
          >
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {getPropertyTypeName(type)}
              </option>
            ))}
          </select>
          <span className="material-icons absolute right-3 top-3 text-gray-400 pointer-events-none">
            expand_more
          </span>
        </div>
      </div>

      {/* Rooms Steppers */}
      <div className="space-y-4">
        {/* Bedrooms Stepper */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-[#19322F]">{t('filtersModal.bedroomsLabel')}</span>
          <div className="flex items-center space-x-3 bg-[#EEF6F6]/60 rounded-full p-1">
            <button
              type="button"
              disabled={beds <= 0}
              onClick={() => onBedsChange(Math.max(0, beds - 1))}
              aria-label="Decrease bedrooms"
              className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-[#006655] disabled:opacity-40 transition-colors cursor-pointer active:scale-95"
            >
              <span className="material-icons text-base">remove</span>
            </button>
            <span className="text-sm font-semibold w-6 text-center text-[#19322F]">
              {formatCount(beds)}
            </span>
            <button
              type="button"
              onClick={() => onBedsChange(beds + 1)}
              aria-label="Increase bedrooms"
              className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-[#006655] hover:bg-[#006655] hover:text-white transition-colors cursor-pointer active:scale-95"
            >
              <span className="material-icons text-base">add</span>
            </button>
          </div>
        </div>

        {/* Bathrooms Stepper */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-[#19322F]">{t('filtersModal.bathroomsLabel')}</span>
          <div className="flex items-center space-x-3 bg-[#EEF6F6]/60 rounded-full p-1">
            <button
              type="button"
              disabled={baths <= 0}
              onClick={() => onBathsChange(Math.max(0, baths - 1))}
              aria-label="Decrease bathrooms"
              className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-[#006655] disabled:opacity-40 transition-colors cursor-pointer active:scale-95"
            >
              <span className="material-icons text-base">remove</span>
            </button>
            <span className="text-sm font-semibold w-6 text-center text-[#19322F]">
              {formatCount(baths)}
            </span>
            <button
              type="button"
              onClick={() => onBathsChange(baths + 1)}
              aria-label="Increase bathrooms"
              className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-[#006655] hover:bg-[#006655] hover:text-white transition-colors cursor-pointer active:scale-95"
            >
              <span className="material-icons text-base">add</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
