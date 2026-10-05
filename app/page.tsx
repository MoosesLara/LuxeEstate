import { HomeScreen } from '@/components/home/HomeScreen';
import { PropertyService } from '@/services/property.service';

export default async function HomePage() {
  // Both fetches run in parallel on the server for static pre-rendering
  const [featuredProperties, allMarketProperties] = await Promise.all([
    PropertyService.getFeatured(),
    PropertyService.getAllMarket(),
  ]);

  return (
    <HomeScreen
      initialFeatured={featuredProperties}
      allMarketProperties={allMarketProperties}
    />
  );
}
