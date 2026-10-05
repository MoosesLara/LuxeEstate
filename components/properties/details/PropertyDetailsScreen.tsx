import React from 'react';
import { Property } from '@/types/property.types';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PropertyGallery } from './PropertyGallery';
import { PropertyFeaturesCard } from './PropertyFeaturesCard';
import { AboutHomeCard } from './AboutHomeCard';
import { AmenitiesCard } from './AmenitiesCard';
import { MortgageCalculatorBanner } from './MortgageCalculatorBanner';
import { AgentSidebarCard } from './AgentSidebarCard';
import { PropertyMap } from './PropertyMap';

interface PropertyDetailsScreenProps {
  property: Property;
}

export function PropertyDetailsScreen({ property }: PropertyDetailsScreenProps) {
  return (
    <div className="bg-[#EEF6F6] text-[#19322F] min-h-screen selection:bg-[#006655]/20 flex flex-col justify-between">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Top-Left: Gallery & Photo Strip */}
          <div className="lg:col-span-8 space-y-4">
            <PropertyGallery
              images={property.images}
              title={property.title}
              badge={property.badge}
              isFeatured={property.isFeatured}
            />
          </div>

          {/* Sticky Sidebar (Right 4 columns) */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-28 space-y-6">
              {/* Agent and Price Card */}
              <AgentSidebarCard
                priceFormatted={property.priceFormatted}
                pricePeriod={property.pricePeriod}
                location={property.location}
                agent={property.agent}
              />

              {/* Leaflet Interactive Map Card */}
              <PropertyMap
                lat={property.coordinates?.lat}
                lng={property.coordinates?.lng}
                title={property.title}
                location={property.location}
              />
            </div>
          </div>

          {/* Bottom-Left Details Sections */}
          <div className="lg:col-span-8 lg:row-start-2 -mt-8 space-y-8">
            {/* Property Features */}
            <PropertyFeaturesCard
              area={property.area}
              beds={property.beds}
              baths={property.baths}
              garages={property.garages}
            />

            {/* About This Home */}
            <AboutHomeCard
              title={property.title}
              location={property.location}
              description={property.description}
            />

            {/* Amenities Checklist */}
            <AmenitiesCard amenities={property.amenities} />

            {/* Mortgage Calculator Banner */}
            <MortgageCalculatorBanner price={property.price} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
