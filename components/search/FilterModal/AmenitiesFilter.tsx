'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';

interface AmenitiesFilterProps {
  selectedAmenities: string[];
  onChange: (amenities: string[]) => void;
}

interface AmenityOption {
  id: string;
  icon: string;
  translationKey: 'swimmingPool' | 'gym' | 'parking' | 'airConditioning' | 'highSpeedWifi' | 'patioTerrace';
}

const AMENITIES_LIST: AmenityOption[] = [
  { id: 'Swimming Pool', icon: 'pool', translationKey: 'swimmingPool' },
  { id: 'Gym', icon: 'fitness_center', translationKey: 'gym' },
  { id: 'Parking', icon: 'local_parking', translationKey: 'parking' },
  { id: 'Air Conditioning', icon: 'ac_unit', translationKey: 'airConditioning' },
  { id: 'High-speed Wifi', icon: 'wifi', translationKey: 'highSpeedWifi' },
  { id: 'Patio / Terrace', icon: 'deck', translationKey: 'patioTerrace' },
];

export function AmenitiesFilter({
  selectedAmenities,
  onChange,
}: AmenitiesFilterProps) {
  const { t } = useI18n();

  const toggleAmenity = (id: string) => {
    if (selectedAmenities.includes(id)) {
      onChange(selectedAmenities.filter((item) => item !== id));
    } else {
      onChange([...selectedAmenities, id]);
    }
  };

  return (
    <section>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
        {t('filtersModal.amenitiesLabel')}
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {AMENITIES_LIST.map((amenity) => {
          const isSelected = selectedAmenities.includes(amenity.id);
          return (
            <button
              type="button"
              key={amenity.id}
              onClick={() => toggleAmenity(amenity.id)}
              className={`relative h-full px-4 py-3 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#006655] bg-[#006655]/5 text-[#006655] hover:bg-[#006655]/10'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900'
              }`}
            >
              <span
                className={`material-icons text-lg ${
                  isSelected ? 'text-[#006655]' : 'text-gray-400'
                }`}
              >
                {amenity.icon}
              </span>
              <span>{t(`amenities.${amenity.translationKey}` as any)}</span>

              {/* Active Dot Badge */}
              {isSelected && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full aspect-square flex-shrink-0 bg-[#006655]" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
