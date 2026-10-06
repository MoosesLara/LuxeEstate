'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';

interface AmenitiesCardProps {
  amenities?: string[];
}

function localizeAmenity(name: string, t: (key: any) => string): string {
  const normalized = name.toLowerCase().trim();
  if (normalized.includes('smart') || normalized.includes('domót')) return t('amenities.smartHome');
  if (normalized.includes('pool') || normalized.includes('piscina') || normalized.includes('piscine')) return t('amenities.swimmingPool');
  if (normalized.includes('heat') || normalized.includes('cool') || normalized.includes('clima') || normalized.includes('chauff')) return t('amenities.centralHeatingCooling');
  if (normalized.includes('ev') || normalized.includes('charg') || normalized.includes('vehículo') || normalized.includes('véhicule')) return t('amenities.evCharging');
  if (normalized.includes('gym') || normalized.includes('gimnasio') || normalized.includes('fitness')) return t('amenities.gym');
  if (normalized.includes('wine') || normalized.includes('vino') || normalized.includes('cave')) return t('amenities.wineCellar');
  if (normalized.includes('park') || normalized.includes('estacion') || normalized.includes('station')) return t('amenities.parking');
  if (normalized.includes('air') || normalized.includes('aire') || normalized.includes('clim')) return t('amenities.airConditioning');
  if (normalized.includes('wifi') || normalized.includes('internet')) return t('amenities.highSpeedWifi');
  if (normalized.includes('patio') || normalized.includes('terrace') || normalized.includes('terraza')) return t('amenities.patioTerrace');
  return name;
}

export function AmenitiesCard({ amenities }: AmenitiesCardProps) {
  const { t } = useI18n();

  const DEFAULT_AMENITIES = [
    t('amenities.smartHome'),
    t('amenities.swimmingPool'),
    t('amenities.centralHeatingCooling'),
    t('amenities.evCharging'),
    t('amenities.gym'),
    t('amenities.wineCellar'),
  ];

  const list = amenities && amenities.length > 0 ? amenities : DEFAULT_AMENITIES;

  return (
    <div className="bg-white p-5 sm:p-8 rounded-xl shadow-sm border border-[#006655]/5">
      <h2 className="text-lg font-semibold mb-6 text-[#19322F]">
        {t('propertyDetails.amenitiesTitle')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
        {list.map((amenity, idx) => (
          <div key={idx} className="flex items-center gap-3 text-[#19322F]/80">
            <div className="w-6 h-6 min-w-[24px] min-h-[24px] rounded-full aspect-square flex items-center justify-center flex-shrink-0 bg-[#006655]/10 text-[#006655]">
              <span className="material-icons text-[14px]">
                check
              </span>
            </div>
            <span className="text-sm font-medium">{localizeAmenity(amenity, t)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
