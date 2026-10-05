'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Property } from '@/types/property.types';
import { Badge } from '@/components/ui/Badge/Badge';
import { FavoriteButton } from '../common/FavoriteButton';
import { PropertySpecs } from '../common/PropertySpecs';
import { useI18n } from '@/lib/i18n';

interface PropertyCardProps {
  property: Property;
  onSelect?: (property: Property) => void;
  onToggleFavorite?: (propertyId: string, isFavorite: boolean) => void;
}

function localizeBadge(badge: string, t: (key: any) => string): string {
  const lower = badge.toLowerCase().trim();
  if (lower.includes('exclusiv')) return t('featured.exclusiveBadge');
  if (lower.includes('arrival') || lower.includes('novedad') || lower.includes('nouveaut')) return t('featured.newArrivalBadge');
  if (lower.includes('premium')) return t('propertyDetails.premiumBadge');
  if (lower.includes('sale') || lower.includes('venta') || lower.includes('vente')) return t('propertyCard.forSaleBadge');
  if (lower.includes('rent') || lower.includes('alquiler') || lower.includes('louer') || lower.includes('locat')) return t('propertyCard.forRentBadge');
  return badge;
}

export function PropertyCard({
  property,
  onSelect,
  onToggleFavorite,
}: PropertyCardProps) {
  const { t } = useI18n();
  const isRent = property.type === 'rent';
  const badgeText = property.badge
    ? localizeBadge(property.badge, t)
    : isRent
    ? t('propertyCard.forRentBadge')
    : t('propertyCard.forSaleBadge');
  const badgeVariant = property.badgeType || (isRent ? 'rent' : 'sale');
  const pricePeriodFormatted = property.pricePeriod === '/month' ? t('common.perMonth') : property.pricePeriod;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="h-full flex flex-col"
    >
      <Link
        href={`/properties/${property.slug}`}
        onClick={() => onSelect && onSelect(property)}
        className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-xl transition-shadow duration-300 group cursor-pointer h-full flex flex-col"
      >
      {/* Property Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.imageUrl}
          alt={property.imageAlt || property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Favorite Button */}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton
            size="sm"
            onToggle={(isFav) => onToggleFavorite && onToggleFavorite(property.id, isFav)}
          />
        </div>

        {/* Badge: FOR SALE / FOR RENT */}
        <div className="absolute bottom-3 left-3">
          <Badge variant={badgeVariant}>{badgeText}</Badge>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-bold text-lg text-[#19322F]">
            {property.priceFormatted}
            {property.pricePeriod && (
              <span className="text-sm font-normal text-[#5C706D]">
                {pricePeriodFormatted}
              </span>
            )}
          </h3>
        </div>

        <h4 className="text-[#19322F] font-medium truncate mb-1">
          {property.title}
        </h4>

        <p className="text-[#5C706D] text-xs mb-4">{property.location}</p>

        {/* Specs Footer */}
        <div className="mt-auto pt-3 border-t border-gray-100">
          <PropertySpecs
            beds={property.beds}
            baths={property.baths}
            area={property.area}
            layout="compact"
          />
        </div>
      </div>
    </Link>
    </motion.div>
  );
}
