'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';

interface PropertyGalleryProps {
  images: string[];
  title: string;
  badge?: string;
  isFeatured?: boolean;
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

export function PropertyGallery({
  images,
  title,
  badge,
  isFeatured,
}: PropertyGalleryProps) {
  const { t } = useI18n();
  // Ensure we have at least one image
  const validImages = images && images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'];

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const currentImage = validImages[activeIndex] || validImages[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Hero Preview */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-sm group bg-slate-100">
        <Image
          src={currentImage}
          alt={`${title} - Photo ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <span className="bg-[#006655] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            {badge ? localizeBadge(badge, t) : t('propertyDetails.premiumBadge')}
          </span>
          {isFeatured && (
            <span className="bg-white/90 backdrop-blur text-[#19322F] text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              {t('propertyDetails.newBadge')}
            </span>
          )}
        </div>

        {/* View All Photos Button */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-[#19322F] px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur transition-all flex items-center gap-2 cursor-pointer z-10 hover:shadow-xl active:scale-95"
        >
          <span className="material-icons text-sm">grid_view</span>
          <span>{t('propertyDetails.viewAllPhotos')} ({validImages.length})</span>
        </button>
      </div>

      {/* Thumbnails Row (1 to N images) */}
      {validImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto hide-scroll pb-2 snap-x">
          {validImages.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                type="button"
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`View photo ${idx + 1}`}
                className={`relative flex-none w-44 sm:w-48 aspect-[4/3] rounded-lg overflow-hidden cursor-pointer snap-start transition-all duration-200 ${
                  isActive
                    ? 'ring-2 ring-[#006655] ring-offset-2 ring-offset-[#EEF6F6] opacity-100'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${idx + 1}`}
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
        >
          {/* Top Bar */}
          <div className="flex justify-between items-center text-white">
            <span className="text-sm font-medium">
              {t('propertyDetails.photoCounter', {
                current: activeIndex + 1,
                total: validImages.length,
              })}
            </span>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <span className="material-icons text-2xl">close</span>
            </button>
          </div>

          {/* Central Image with Navigation Arrows */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <div className="relative w-full h-full max-h-[75vh] max-w-5xl">
              <Image
                src={validImages[activeIndex]}
                alt={`${title} - Photo ${activeIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {validImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label={t('propertyDetails.previousPhotoAria')}
                  className="absolute left-2 sm:left-6 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all cursor-pointer backdrop-blur-sm"
                >
                  <span className="material-icons text-2xl">chevron_left</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label={t('propertyDetails.nextPhotoAria')}
                  className="absolute right-2 sm:right-6 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all cursor-pointer backdrop-blur-sm"
                >
                  <span className="material-icons text-2xl">chevron_right</span>
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails */}
          {validImages.length > 1 && (
            <div className="flex justify-center gap-2 overflow-x-auto hide-scroll py-2">
              {validImages.map((img, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-16 h-12 rounded overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                    idx === activeIndex
                      ? 'border-[#006655] scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
