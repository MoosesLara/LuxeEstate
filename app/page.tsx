import { HomeScreen } from '@/components/home/HomeScreen';
import { PropertyService, MARKET_PAGE_SIZE } from '@/services/property.service';
import { MarketFilterType } from '@/types/filter.types';

interface HomePageProps {
  searchParams: Promise<{
    page?: string;
    type?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;

  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1);
  const filterType = (['all', 'sale', 'rent'].includes(params.type ?? '')
    ? params.type
    : 'all') as MarketFilterType;

  // Both fetches run in parallel on the server
  const [featuredProperties, marketResult] = await Promise.all([
    PropertyService.getFeatured(),
    PropertyService.getMarket(filterType, page, MARKET_PAGE_SIZE),
  ]);

  return (
    <HomeScreen
      initialFeatured={featuredProperties}
      initialMarket={marketResult.data}
      pagination={{
        total: marketResult.total,
        page: marketResult.page,
        totalPages: marketResult.totalPages,
        pageSize: marketResult.pageSize,
      }}
      activeFilter={filterType}
    />
  );
}
