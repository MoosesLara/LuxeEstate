'use client';

import React, { useState, useMemo } from 'react';
import { Property } from '@/types/property.types';
import {
  MarketFilterType,
  SearchFilterState,
  INITIAL_SEARCH_FILTERS,
} from '@/types/filter.types';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FilterModal } from '@/components/search';
import { HeroSection } from './Hero/HeroSection';
import { FeaturedSection } from './Sections/FeaturedSection';
import { MarketSection } from './Sections/MarketSection';

interface PaginationInfo {
  total: number;
  page: number;
  totalPages: number;
  pageSize: number;
}

interface HomeScreenProps {
  initialFeatured: Property[];
  initialMarket: Property[];
  pagination: PaginationInfo;
  activeFilter: MarketFilterType;
}

export function HomeScreen({
  initialFeatured,
  initialMarket,
  pagination,
  activeFilter,
}: HomeScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [modalFilters, setModalFilters] = useState<SearchFilterState>(
    INITIAL_SEARCH_FILTERS
  );
  const [filtersApplied, setFiltersApplied] = useState<boolean>(false);

  // Client-side filter for featured properties
  const filteredFeatured = useMemo(() => {
    return initialFeatured.filter((prop) => {
      const matchesCategory =
        selectedCategory === 'all' || prop.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesCategory || !matchesSearch) return false;

      // When modal filters are active, apply them
      if (filtersApplied) {
        if (
          modalFilters.propertyType !== 'Any Type' &&
          prop.category.toLowerCase() !==
            modalFilters.propertyType.toLowerCase()
        ) {
          return false;
        }
        if (
          prop.price < modalFilters.minPrice ||
          prop.price > modalFilters.maxPrice
        ) {
          return false;
        }
        if (modalFilters.beds > 0 && prop.beds < modalFilters.beds) {
          return false;
        }
        if (modalFilters.baths > 0 && prop.baths < modalFilters.baths) {
          return false;
        }
      }

      return true;
    });
  }, [initialFeatured, selectedCategory, searchQuery, filtersApplied, modalFilters]);

  // Client-side filtered market properties when modal filters are applied
  const displayedMarket = useMemo(() => {
    if (!filtersApplied) return initialMarket;

    return initialMarket.filter((prop) => {
      if (
        modalFilters.propertyType !== 'Any Type' &&
        prop.category.toLowerCase() !== modalFilters.propertyType.toLowerCase()
      ) {
        return false;
      }
      if (
        prop.price < modalFilters.minPrice ||
        prop.price > modalFilters.maxPrice
      ) {
        return false;
      }
      if (modalFilters.beds > 0 && prop.beds < modalFilters.beds) {
        return false;
      }
      if (modalFilters.baths > 0 && prop.baths < modalFilters.baths) {
        return false;
      }
      return true;
    });
  }, [initialMarket, filtersApplied, modalFilters]);

  const handleApplyFilters = (newFilters: SearchFilterState) => {
    setModalFilters(newFilters);
    setFiltersApplied(true);
    if (newFilters.location && newFilters.location !== 'San Francisco, CA') {
      setSearchQuery(newFilters.location);
    }
  };

  const totalResults = filtersApplied
    ? filteredFeatured.length + displayedMarket.length
    : 124;

  return (
    <div className="min-h-screen bg-[#EEF6F6] text-[#19322F] font-display antialiased selection:bg-[#006655] selection:text-white">
      {/* Navigation Shell */}
      <Navbar />

      {/* Main Discover Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Hero & Search Header */}
        <HeroSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSearch={setSearchQuery}
          onOpenFilters={() => setIsFilterModalOpen(true)}
        />

        {/* Featured Properties Section */}
        {filteredFeatured.length > 0 && (
          <FeaturedSection properties={filteredFeatured} />
        )}

        {/* New in Market */}
        <React.Suspense fallback={null}>
          <MarketSection
            properties={displayedMarket}
            pagination={
              filtersApplied
                ? {
                    total: displayedMarket.length,
                    page: 1,
                    totalPages: 1,
                    pageSize: displayedMarket.length,
                  }
                : pagination
            }
            activeFilter={activeFilter}
          />
        </React.Suspense>
      </main>

      {/* Footer */}
      <Footer />

      {/* Reusable Filter Modal matching search_filters_screen/code.html */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        initialFilters={modalFilters}
        onApplyFilters={handleApplyFilters}
        resultCount={totalResults}
      />
    </div>
  );
}
