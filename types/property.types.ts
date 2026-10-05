export type PropertyType = 'sale' | 'rent';

export type PropertyCategory = 'house' | 'apartment' | 'villa' | 'penthouse';

export type BadgeType = 'exclusive' | 'new-arrival' | 'sale' | 'rent';

export interface PropertySpecs {
  beds: number;
  baths: number;
  area: number; // in m²
  garages?: number;
}

export interface PropertyAgent {
  name: string;
  title: string;
  avatarUrl: string;
  rating?: string;
  phone?: string;
  email?: string;
}

export interface PropertyCoordinates {
  lat: number;
  lng: number;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: number;
  priceFormatted: string;
  pricePeriod?: string; // e.g. '/mo'
  type: PropertyType;
  category: PropertyCategory;
  beds: number;
  baths: number;
  area: number; // in m²
  garages?: number;
  imageUrl: string;
  images: string[]; // Collection of 1 to N images
  imageAlt: string;
  badge?: string; // e.g. 'Exclusive', 'New Arrival', 'FOR SALE', 'FOR RENT'
  badgeType?: BadgeType;
  isFeatured?: boolean;
  description?: string;
  amenities?: string[];
  coordinates?: PropertyCoordinates;
  agent?: PropertyAgent;
}
