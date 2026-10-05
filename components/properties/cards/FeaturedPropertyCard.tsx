'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/property.types';
import { Icon } from '@/components/ui/Icon';
import { Badge } from '@/components/ui/Badge/Badge';
import { FavoriteButton } from '../common/FavoriteButton';
import { PropertySpecs } from '../common/PropertySpecs';
import { useI18n } from '@/lib/i18n';

interface FeaturedPropertyCardProps {
  property: Property;
  onSelect?: (property: Property) => void;
  onToggleFavorite?: (propertyId: string, isFavorite: boolean) => void;
}

function localizeBadge(badge: string, t: (key: any) => string): string {
  const lower = badge.toLowerCase().trim();
  if (lower.includes('exclusiv')) return t('featured.exclusiveBadge');
  if (lower.includes('arrival') || lower.includes('novedad') || lower.includes('nouveaut')) return t('featured.newArrivalBadge');
  if (lower.includes('premium')) return t('propertyDetails.premiumBadge');
  if (lower.includes('sale') || lower.includes('venta') || lower.includes('vente')) return t('market.badgeSale');
  if (lower.includes('rent') || lower.includes('alquiler') || lower.includes('louer') || lower.includes('locat')) return t('market.badgeRent');
  return badge;
}

export function FeaturedPropertyCard({
  property,
  onSelect,
  onToggleFavorite,
}: FeaturedPropertyCardProps) {
  const { t } = useI18n();

  return (
    <Link
      href={`/properties/${property.slug}`}
      onClick={() => onSelect && onSelect(property)}
      className="group relative rounded-2xl overflow-hidden shadow-soft bg-white cursor-pointer transition-all duration-300 hover:shadow-xl block"
    >
      {/* Property Image Container */}
      <div className="aspect-[4/3] w-full overflow-hidden relative">
        <Image
          src={property.imageUrl}
          alt={property.imageAlt || property.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badge (Exclusive / New Arrival) */}
        {property.badge && (
          <div className="absolute top-4 left-4 z-10">
            <Badge variant={property.badgeType || 'exclusive'}>
              {localizeBadge(property.badge, t)}
            </Badge>
          </div>
        )}

        {/* Favorite Button */}
        <div className="absolute top-4 right-4 z-10">
          <FavoriteButton
            size="md"
            onToggle={(isFav) => onToggleFavorite && onToggleFavorite(property.id, isFav)}
          />
        </div>

        {/* Bottom subtle gradient */}
        <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Property Details */}
      <div className="p-6 relative">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-medium text-[#19322F] group-hover:text-[#006655] transition-colors">
              {property.title}
            </h3>
            <p className="text-[#5C706D] text-sm flex items-center gap-1 mt-1">
              <Icon name="place" className="text-sm text-[#5C706D]" />
              <span>{property.location}</span>
            </p>
          </div>
          <span className="text-xl font-semibold text-[#006655]">
            {property.priceFormatted}
          </span>
        </div>

        {/* Property Features Divider & Specs */}
        <div className="mt-6 pt-6 border-t border-[#19322F]/5">
          <PropertySpecs
            beds={property.beds}
            baths={property.baths}
            area={property.area}
            layout="expanded"
          />
        </div>
      </div>
    </Link>
  );
}
