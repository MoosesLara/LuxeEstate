import { Property } from '@/types/property.types';
import { MarketFilterType, PropertyFilterParams } from '@/types/filter.types';
import { createServerClient } from '@/lib/supabase/server';
import type { Tables } from '@/types/database.types';
import {
  ALL_MOCK_PROPERTIES,
  MOCK_FEATURED_PROPERTIES,
  MOCK_MARKET_PROPERTIES,
} from '@/data/mocks/properties.mock';

/** How many market properties to show per page */
export const MARKET_PAGE_SIZE = 8;

const DEFAULT_DESCRIPTION =
  'Experience modern luxury in this architecturally stunning home. Designed with an emphasis on indoor-outdoor living, the residence features floor-to-ceiling glass walls that flood the interiors with natural light. The open-concept kitchen is equipped with top-of-the-line appliances and custom cabinetry, perfect for culinary enthusiasts. Retreat to the primary suite, a sanctuary of relaxation with a spa-inspired bath and private balcony.';

const DEFAULT_AMENITIES = [
  'Smart Home System',
  'Swimming Pool',
  'Central Heating & Cooling',
  'Electric Vehicle Charging',
  'Private Gym',
  'Wine Cellar',
];

const DEFAULT_AGENT = {
  name: 'Sarah Jenkins',
  title: 'Top Rated Agent',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  rating: 'Top Rated Agent',
  phone: '+1 (555) 234-5678',
  email: 'sarah.jenkins@luxeestate.com',
};

/**
 * Maps a Supabase DB row → the app's Property interface.
 */
function mapRow(row: Tables<'properties'>): Property {
  const images =
    row.images && row.images.length > 0
      ? row.images
      : [row.image_url];

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    location: row.location,
    price: Number(row.price),
    priceFormatted: row.price_formatted,
    pricePeriod: row.price_period ?? undefined,
    type: row.type as Property['type'],
    category: row.category as Property['category'],
    beds: Number(row.beds),
    baths: Number(row.baths),
    area: Number(row.area),
    garages: row.garages ? Number(row.garages) : 2,
    imageUrl: row.image_url,
    images,
    imageAlt: row.image_alt || row.title,
    badge: row.badge ?? undefined,
    badgeType: (row.badge_type as Property['badgeType']) ?? undefined,
    isFeatured: row.is_featured,
    description: row.description || DEFAULT_DESCRIPTION,
    amenities: row.amenities && row.amenities.length > 0 ? row.amenities : DEFAULT_AMENITIES,
    coordinates:
      row.latitude && row.longitude
        ? { lat: Number(row.latitude), lng: Number(row.longitude) }
        : { lat: 37.4419, lng: -122.143 },
    agent: row.agent_name
      ? {
          name: row.agent_name,
          title: row.agent_title || 'Top Rated Agent',
          avatarUrl: row.agent_avatar || DEFAULT_AGENT.avatarUrl,
          rating: 'Top Rated Agent',
          phone: DEFAULT_AGENT.phone,
          email: DEFAULT_AGENT.email,
        }
      : DEFAULT_AGENT,
  };
}

/**
 * Result envelope for paginated queries.
 */
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Property Data Service
 *
 * Centralised service layer backed by Supabase / PostgreSQL with fallback to mock data.
 * All methods run on the server — never import this in Client Components.
 */
export class PropertyService {
  /**
   * Retrieves all featured properties (is_featured = true).
   */
  static async getFeatured(): Promise<Property[]> {
    try {
      const db = createServerClient();
      const { data, error } = await db
        .from('properties')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        if (error) console.error('[PropertyService.getFeatured]', error.message);
        return MOCK_FEATURED_PROPERTIES;
      }
      return data.map(mapRow);
    } catch (err) {
      console.error('[PropertyService.getFeatured exception]', err);
      return MOCK_FEATURED_PROPERTIES;
    }
  }

  /**
   * Retrieves a paginated list of market (non-featured) properties,
   * with an optional type filter ('all' | 'sale' | 'rent').
   */
  static async getMarket(
    filterType: MarketFilterType = 'all',
    page: number = 1,
    pageSize: number = MARKET_PAGE_SIZE
  ): Promise<PaginatedResult<Property>> {
    try {
      const db = createServerClient();

      let query = db
        .from('properties')
        .select('*', { count: 'exact' })
        .eq('is_featured', false)
        .order('created_at', { ascending: false });

      if (filterType !== 'all') {
        query = query.eq('type', filterType);
      }

      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error || !data) {
        if (error) console.error('[PropertyService.getMarket]', error.message);
        return this.getMockMarketPaginated(filterType, page, pageSize);
      }

      const total = count ?? data.length;
      return {
        data: data.map(mapRow),
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    } catch (err) {
      console.error('[PropertyService.getMarket exception]', err);
      return this.getMockMarketPaginated(filterType, page, pageSize);
    }
  }

  /**
   * Fallback paginated mock results
   */
  private static getMockMarketPaginated(
    filterType: MarketFilterType,
    page: number,
    pageSize: number
  ): PaginatedResult<Property> {
    const filtered =
      filterType === 'all'
        ? MOCK_MARKET_PROPERTIES
        : MOCK_MARKET_PROPERTIES.filter((p) => p.type === filterType);
    const total = filtered.length;
    const from = (page - 1) * pageSize;
    const data = filtered.slice(from, from + pageSize);
    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  /**
   * Retrieves a single property by its slug (or fallback by id).
   */
  static async getBySlug(slug: string): Promise<Property | null> {
    try {
      const db = createServerClient();

      // Query by slug first
      const { data: bySlug, error: slugErr } = await db
        .from('properties')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (!slugErr && bySlug) {
        return mapRow(bySlug);
      }

      // If not found by slug, try by ID as an alias
      const { data: byId } = await db
        .from('properties')
        .select('*')
        .eq('id', slug)
        .maybeSingle();

      if (byId) {
        return mapRow(byId);
      }

      // Fallback to mock data matching slug or id
      const mock = ALL_MOCK_PROPERTIES.find(
        (p) => p.slug === slug || p.id === slug
      );
      return mock || null;
    } catch (err) {
      console.error('[PropertyService.getBySlug exception]', err);
      const mock = ALL_MOCK_PROPERTIES.find(
        (p) => p.slug === slug || p.id === slug
      );
      return mock || null;
    }
  }

  /**
   * Retrieves a single property by ID or Slug.
   */
  static async getById(slugOrId: string): Promise<Property | null> {
    return this.getBySlug(slugOrId);
  }

  /**
   * Retrieves all available slugs for static generation or sitemap.
   */
  static async getAllSlugs(): Promise<string[]> {
    try {
      const db = createServerClient();
      const { data } = await db.from('properties').select('slug');
      if (data && data.length > 0) {
        return data.map((d) => d.slug);
      }
    } catch {
      // Fallback
    }
    return ALL_MOCK_PROPERTIES.map((p) => p.slug);
  }

  /**
   * Filters properties across category, search term, and type.
   */
  static async query(
    params: PropertyFilterParams,
    page: number = 1,
    pageSize: number = MARKET_PAGE_SIZE
  ): Promise<PaginatedResult<Property>> {
    try {
      const db = createServerClient();

      let q = db
        .from('properties')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (params.type && params.type !== 'all') {
        q = q.eq('type', params.type);
      }
      if (params.category && params.category !== 'all') {
        q = q.eq('category', params.category);
      }
      if (params.searchQuery) {
        q = q.or(
          `title.ilike.%${params.searchQuery}%,location.ilike.%${params.searchQuery}%`
        );
      }
      if (params.minPrice !== undefined) {
        q = q.gte('price', params.minPrice);
      }
      if (params.maxPrice !== undefined) {
        q = q.lte('price', params.maxPrice);
      }

      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      q = q.range(from, to);

      const { data, error, count } = await q;

      if (error || !data) {
        return this.getMockMarketPaginated(params.type || 'all', page, pageSize);
      }

      const total = count ?? data.length;
      return {
        data: data.map(mapRow),
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    } catch {
      return this.getMockMarketPaginated(params.type || 'all', page, pageSize);
    }
  }
}
