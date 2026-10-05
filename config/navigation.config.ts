import { CategoryOption } from '@/types/filter.types';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { id: 'buy', label: 'Buy', href: '/buy' },
  { id: 'rent', label: 'Rent', href: '/rent' },
  { id: 'sell', label: 'Sell', href: '/sell' },
  { id: 'saved', label: 'Saved Homes', href: '/saved' },
];

export const PROPERTY_CATEGORIES: CategoryOption[] = [
  { id: 'all', label: 'All' },
  { id: 'house', label: 'House' },
  { id: 'apartment', label: 'Apartment' },
  { id: 'villa', label: 'Villa' },
  { id: 'penthouse', label: 'Penthouse' },
];
