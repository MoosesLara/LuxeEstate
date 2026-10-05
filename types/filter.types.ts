import { PropertyType, PropertyCategory } from './property.types';

export type MarketFilterType = 'all' | PropertyType;

export interface CategoryOption {
  id: 'all' | PropertyCategory;
  label: string;
}

export interface PropertyFilterParams {
  type?: MarketFilterType;
  category?: 'all' | PropertyCategory;
  searchQuery?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  amenities?: string[];
}

export interface SearchFilterState {
  location: string;
  minPrice: number;
  maxPrice: number;
  propertyType: string;
  beds: number;
  baths: number;
  amenities: string[];
}

export const INITIAL_SEARCH_FILTERS: SearchFilterState = {
  location: 'San Francisco, CA',
  minPrice: 1200000,
  maxPrice: 4500000,
  propertyType: 'Any Type',
  beds: 3,
  baths: 2,
  amenities: ['Swimming Pool', 'High-speed Wifi'],
};
