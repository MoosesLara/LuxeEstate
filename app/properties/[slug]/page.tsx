import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PropertyService } from '@/services/property.service';
import { PropertyDetailsScreen } from '@/components/properties/details/PropertyDetailsScreen';

interface PropertyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await PropertyService.getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await PropertyService.getBySlug(slug);

  if (!property) {
    return {
      title: 'Property Not Found | LuxeEstate',
      description: 'The requested luxury property could not be found.',
    };
  }

  const title = `${property.title} | ${property.location} - LuxeEstate`;
  const description = `${property.title} in ${property.location}. Featuring ${property.beds} bedrooms, ${property.baths} bathrooms, ${property.area} m². Priced at ${property.priceFormatted}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: property.imageUrl,
          alt: property.imageAlt,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [property.imageUrl],
    },
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = await PropertyService.getBySlug(slug);

  if (!property) {
    notFound();
  }

  // Schema.org RealEstateListing Structured Data (JSON-LD) for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: `https://luxeestate.com/properties/${property.slug}`,
    image: property.images,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location,
    },
    geo: property.coordinates
      ? {
          '@type': 'GeoCoordinates',
          latitude: property.coordinates.lat,
          longitude: property.coordinates.lng,
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyDetailsScreen property={property} />
    </>
  );
}
