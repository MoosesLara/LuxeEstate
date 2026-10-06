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
  allMarketProperties?: Property[];
  initialMarket?: Property[];
  pagination?: PaginationInfo;
  activeFilter?: MarketFilterType;
}

const MARKET_PAGE_SIZE = 8;

export function HomeScreen({
  initialFeatured,
  allMarketProperties = [],
  initialMarket = [],
  pagination: defaultPagination,
  activeFilter: defaultFilter = 'all',
}: HomeScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeMarketTab, setActiveMarketTab] = useState<MarketFilterType>(defaultFilter);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [modalFilters, setModalFilters] = useState<SearchFilterState>(
    INITIAL_SEARCH_FILTERS
  );
  const [filtersApplied, setFiltersApplied] = useState<boolean>(false);

  const fullMarketList =
    allMarketProperties.length > 0 ? allMarketProperties : initialMarket;

  // Filter featured properties
  const filteredFeatured = useMemo(() => {
    return initialFeatured.filter((prop) => {
      const matchesCategory =
        selectedCategory === 'all' || prop.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesCategory || !matchesSearch) return false;

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

  // Filter full market properties by tab, category, search, and modal filters
  const filteredMarketList = useMemo(() => {
    let list = fullMarketList;

    if (activeMarketTab !== 'all') {
      list = list.filter((p) => p.type === activeMarketTab);
    }

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }

    if (filtersApplied) {
      list = list.filter((prop) => {
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
        return true;
      });
    }

    return list;
  }, [fullMarketList, activeMarketTab, selectedCategory, searchQuery, filtersApplied, modalFilters]);

  // Paginate the filtered market list
  const totalMarketCount = filteredMarketList.length;
  const totalPages = Math.max(1, Math.ceil(totalMarketCount / MARKET_PAGE_SIZE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const displayedMarket = useMemo(() => {
    const from = (safeCurrentPage - 1) * MARKET_PAGE_SIZE;
    return filteredMarketList.slice(from, from + MARKET_PAGE_SIZE);
  }, [filteredMarketList, safeCurrentPage]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: MarketFilterType) => {
    setActiveMarketTab(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const el = document.getElementById('market-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleApplyFilters = (newFilters: SearchFilterState) => {
    setModalFilters(newFilters);
    setFiltersApplied(true);
    setCurrentPage(1);
    if (newFilters.location && newFilters.location !== 'San Francisco, CA') {
      setSearchQuery(newFilters.location);
    }
  };

  const totalResults = filteredFeatured.length + totalMarketCount;

  return (
    <div className="min-h-screen bg-[#EEF6F6] text-[#19322F] font-display antialiased selection:bg-[#006655] selection:text-white w-full max-w-full overflow-x-hidden flex flex-col justify-between">
      {/* Navigation Shell */}
      <Navbar />

      {/* Main Discover Layout */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 flex-1">
        {/* Hero & Search Header */}
        <HeroSection
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          onSearch={handleSearch}
          onOpenFilters={() => setIsFilterModalOpen(true)}
        />

        {/* Featured Properties Section */}
        {filteredFeatured.length > 0 && (
          <FeaturedSection properties={filteredFeatured} />
        )}

        {/* New in Market */}
        <div id="market-section" className="scroll-mt-24">
          <React.Suspense fallback={null}>
            <MarketSection
              properties={displayedMarket}
              pagination={{
                total: totalMarketCount,
                page: safeCurrentPage,
                totalPages,
                pageSize: MARKET_PAGE_SIZE,
              }}
              activeFilter={activeMarketTab}
              onTabChange={handleTabChange}
              onPageChange={handlePageChange}
            />
          </React.Suspense>
        </div>
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
