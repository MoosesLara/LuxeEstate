import { Property } from '@/types/property.types';
import { PropertyService } from '@/services/property.service';
import {
  MOCK_FEATURED_PROPERTIES,
  MOCK_MARKET_PROPERTIES,
} from '@/data/mocks/properties.mock';
import { MOCK_USER } from '@/data/mocks/user.mock';

export const FEATURED_PROPERTIES: Property[] = MOCK_FEATURED_PROPERTIES;
export const MARKET_PROPERTIES: Property[] = MOCK_MARKET_PROPERTIES;
export const USER_PROFILE_MOCK = MOCK_USER;

export const getFeaturedProperties = PropertyService.getFeatured;
export const getMarketProperties = PropertyService.getMarket;
