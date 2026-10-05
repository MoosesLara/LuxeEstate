'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
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
  if (lower.includes('arrival') || lower.includes('novedad') || lower.includes('nouveaut'))
    return t('featured.newArrivalBadge');
  if (lower.includes('premium')) return t('propertyDetails.premiumBadge');
  if (lower.includes('sale') || lower.includes('venta') || lower.includes('vente'))
    return t('market.badgeSale');
  if (lower.includes('rent') || lower.includes('alquiler') || lower.includes('louer') || lower.includes('locat'))
    return t('market.badgeRent');
  return badge;
}

export function PropertyGallery({
  images,
  title,
  badge,
  isFeatured,
}: PropertyGalleryProps) {
  const { t } = useI18n();

  // Ensure we always have valid images
  const validImages =
    images && images.length > 0
      ? images
      : [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setActiveIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
    },
    [validImages.length]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setActiveIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
    },
    [validImages.length]
  );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, validImages.length]);

  return (
    <div className="space-y-3.5">
      {/* 1. Cinematic Hero Preview Container */}
      <div
        onClick={() => setLightboxOpen(true)}
        className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-soft group bg-[#112421] cursor-zoom-in border border-[#19322F]/10 select-none"
      >
        {/* Animated Image with Crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={validImages[activeIndex]}
              alt={`${title} - Photo ${activeIndex + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle Bottom & Top Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-2 z-20">
          <span className="bg-[#006655] text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
            {badge ? localizeBadge(badge, t) : t('propertyDetails.premiumBadge')}
          </span>
          {isFeatured && (
            <span className="bg-white/95 backdrop-blur-md text-[#19322F] text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              {t('propertyDetails.newBadge')}
            </span>
          )}
        </div>

        {/* Top-Right Counter Pill */}
        <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
          <span className="material-icons text-sm">photo_camera</span>
          <span>
            {activeIndex + 1} / {validImages.length}
          </span>
        </div>

        {/* Floating Hero Navigation Arrows */}
        {validImages.length > 1 && (
          <>
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={handlePrev}
              aria-label={t('propertyDetails.previousPhotoAria')}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#19322F] backdrop-blur-md shadow-lg flex items-center justify-center transition-all opacity-85 group-hover:opacity-100 cursor-pointer"
            >
              <span className="material-icons text-2xl">chevron_left</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleNext}
              aria-label={t('propertyDetails.nextPhotoAria')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#19322F] backdrop-blur-md shadow-lg flex items-center justify-center transition-all opacity-85 group-hover:opacity-100 cursor-pointer"
            >
              <span className="material-icons text-2xl">chevron_right</span>
            </motion.button>
          </>
        )}

        {/* Bottom Right "Ver todas las fotos" Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => {
            e.stopPropagation();
            setLightboxOpen(true);
          }}
          className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-[#19322F] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer z-20 hover:shadow-xl"
        >
          <span className="material-icons text-base text-[#006655]">grid_view</span>
          <span>
            {t('propertyDetails.viewAllPhotos')} ({validImages.length})
          </span>
        </motion.button>
      </div>

      {/* 2. Perfectly Fitted Responsive 5-Column Thumbnail Grid */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-5 gap-2.5 sm:gap-3">
          {validImages.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <motion.button
                type="button"
                key={idx}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveIndex(idx)}
                aria-label={`View photo ${idx + 1}`}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transition-all duration-200 select-none ${
                  isActive
                    ? 'ring-2 ring-[#006655] ring-offset-2 ring-offset-[#EEF6F6] shadow-md opacity-100'
                    : 'opacity-65 hover:opacity-100 hover:shadow-sm'
                }`}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 20vw, 150px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />

                {/* Subtle active pill indicator at bottom */}
                {isActive && (
                  <motion.div
                    layoutId="activeThumbBar"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute bottom-0 inset-x-0 h-1 bg-[#006655] z-10"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* 3. Fullscreen Luxury Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center text-white max-w-7xl mx-auto w-full px-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold tracking-wide">
                  {title}
                </span>
                <span className="text-white/40">•</span>
                <span className="text-xs text-white/70">
                  {t('propertyDetails.photoCounter', {
                    current: activeIndex + 1,
                    total: validImages.length,
                  })}
                </span>
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setLightboxOpen(false)}
                className="p-2.5 rounded-full bg-white/10 text-white transition-colors cursor-pointer"
              >
                <span className="material-icons text-2xl">close</span>
              </motion.button>
            </div>

            {/* Central Image with Navigation Chevrons */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full max-h-[76vh] max-w-6xl flex items-center justify-center"
                >
                  <Image
                    src={validImages[activeIndex]}
                    alt={`${title} - Photo ${activeIndex + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {validImages.length > 1 && (
                <>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePrev}
                    aria-label={t('propertyDetails.previousPhotoAria')}
                    className="absolute left-3 sm:left-6 p-3.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer backdrop-blur-md shadow-xl"
                  >
                    <span className="material-icons text-2xl">chevron_left</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNext}
                    aria-label={t('propertyDetails.nextPhotoAria')}
                    className="absolute right-3 sm:right-6 p-3.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer backdrop-blur-md shadow-xl"
                  >
                    <span className="material-icons text-2xl">chevron_right</span>
                  </motion.button>
                </>
              )}
            </div>

            {/* Bottom Thumbnail Strip Scrubber */}
            {validImages.length > 1 && (
              <div className="flex justify-center gap-2.5 overflow-x-auto hide-scroll py-2">
                {validImages.map((img, idx) => (
                  <motion.button
                    type="button"
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                      idx === activeIndex
                        ? 'border-[#006655] shadow-lg scale-105 opacity-100 ring-2 ring-[#006655]/40'
                        : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
