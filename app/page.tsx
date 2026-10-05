import { HomeScreen } from '@/components/home/HomeScreen';
import { PropertyService, MARKET_PAGE_SIZE } from '@/services/property.service';

export default async function HomePage() {
  // Both fetches run in parallel on the server for static pre-rendering
  const [featuredProperties, marketResult] = await Promise.all([
    PropertyService.getFeatured(),
    PropertyService.getMarket('all', 1, MARKET_PAGE_SIZE),
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
      activeFilter="all"
    />
  );
}
