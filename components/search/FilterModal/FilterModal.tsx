'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SearchFilterState, INITIAL_SEARCH_FILTERS } from '@/types/filter.types';
import { LocationFilter } from './LocationFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { PropertyDetailsFilter } from './PropertyDetailsFilter';
import { AmenitiesFilter } from './AmenitiesFilter';
import { FilterModalFooter } from './FilterModalFooter';
import { useI18n } from '@/lib/i18n';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters?: (filters: SearchFilterState) => void;
  initialFilters?: Partial<SearchFilterState>;
  resultCount?: number;
}

export function FilterModal({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters,
  resultCount = 124,
}: FilterModalProps) {
  const { t } = useI18n();
  const [filters, setFilters] = useState<SearchFilterState>({
    ...INITIAL_SEARCH_FILTERS,
    ...initialFilters,
  });

  // Keep state in sync if initialFilters change
  useEffect(() => {
    if (initialFilters) {
      setFilters((prev) => ({
        ...prev,
        ...initialFilters,
      }));
    }
  }, [initialFilters]);

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleClear = () => {
    setFilters({
      location: '',
      minPrice: 200000,
      maxPrice: 10000000,
      propertyType: 'Any Type',
      beds: 0,
      baths: 0,
      amenities: [],
    });
  };

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="filters-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Modal Overlay / Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-10 cursor-pointer"
            aria-hidden="true"
          />

          {/* Main Modal Container with spring physics */}
          <motion.main
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative z-20 w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Sticky Header */}
            <header className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-30">
              <h1
                id="filters-modal-title"
                className="text-2xl font-semibold tracking-tight text-gray-900"
              >
                {t('filtersModal.title')}
              </h1>
              <button
                type="button"
                onClick={onClose}
                aria-label={t('filtersModal.closeAria')}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 cursor-pointer"
              >
                <span className="material-icons">close</span>
              </button>
            </header>

            {/* Scrollable Content (4 Sections) */}
            <div className="flex-1 overflow-y-auto hide-scroll p-8 space-y-10">
              {/* Section 1: Location */}
              <LocationFilter
                value={filters.location}
                onChange={(location) =>
                  setFilters((prev) => ({ ...prev, location }))
                }
              />

              {/* Section 2: Price Range */}
              <PriceRangeFilter
                minPrice={filters.minPrice}
                maxPrice={filters.maxPrice}
                onChange={(minPrice, maxPrice) =>
                  setFilters((prev) => ({ ...prev, minPrice, maxPrice }))
                }
              />

              {/* Section 3: Property Details */}
              <PropertyDetailsFilter
                propertyType={filters.propertyType}
                beds={filters.beds}
                baths={filters.baths}
                onPropertyTypeChange={(propertyType) =>
                  setFilters((prev) => ({ ...prev, propertyType }))
                }
                onBedsChange={(beds) => setFilters((prev) => ({ ...prev, beds }))}
                onBathsChange={(baths) =>
                  setFilters((prev) => ({ ...prev, baths }))
                }
              />

              {/* Section 4: Amenities */}
              <AmenitiesFilter
                selectedAmenities={filters.amenities}
                onChange={(amenities) =>
                  setFilters((prev) => ({ ...prev, amenities }))
                }
              />
            </div>

            {/* Sticky Footer */}
            <FilterModalFooter
              onClear={handleClear}
              onApply={handleApply}
              resultCount={resultCount}
            />
          </motion.main>
        </div>
      )}
    </AnimatePresence>
  );
}
