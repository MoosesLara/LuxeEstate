'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n';

interface PropertyMapProps {
  lat?: number;
  lng?: number;
  title: string;
  location: string;
}

export function PropertyMap({
  lat = 37.4419,
  lng = -122.143,
  title,
  location,
}: PropertyMapProps) {
  const { t } = useI18n();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadLeaflet() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      try {
        // Dynamically import Leaflet strictly inside client-side useEffect
        const L = (await import('leaflet')).default;
        await import('leaflet/dist/leaflet.css');

        if (!isMounted || !mapContainerRef.current) return;

        // Destroy existing map instance if present
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }

        // Initialize Leaflet Map
        const map = L.map(mapContainerRef.current, {
          center: [lat, lng],
          zoom: 14,
          zoomControl: true,
          scrollWheelZoom: true,
          dragging: true,
          attributionControl: true,
        });

        mapInstanceRef.current = map;

        // Tile Layer: OpenStreetMap by default (100% free, no API key required, zero watermark),
        // or CARTO Voyager if NEXT_PUBLIC_CARTO_API_KEY is configured.
        const cartoKey = process.env.NEXT_PUBLIC_CARTO_API_KEY;
        const tileUrl = cartoKey
          ? `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?api_key=${cartoKey}`
          : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

        const tileAttribution = cartoKey
          ? '&copy; <a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a> | &copy; <a href="https://carto.com/" target="_blank" rel="noopener">CARTO</a>'
          : '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';

        L.tileLayer(tileUrl, {
          maxZoom: 19,
          subdomains: cartoKey ? 'abcd' : 'abc',
          attribution: tileAttribution,
        }).addTo(map);

        // Custom Mosque Pin matching code.html bouncing pin
        const customIcon = L.divIcon({
          className: 'custom-leaflet-pin',
          html: `
            <div style="
              width: 34px;
              height: 34px;
              background-color: #006655;
              border-radius: 9999px;
              border: 3px solid #ffffff;
              box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
              display: flex;
              align-items: center;
              justify-content: center;
              animation: bounce 1s infinite;
              cursor: pointer;
            ">
              <span class="material-icons" style="color: #ffffff; font-size: 16px; line-height: 1;">home</span>
            </div>
          `,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
          popupAnchor: [0, -18],
        });

        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

        marker.bindPopup(
          `<div style="font-family: inherit; padding: 4px; min-width: 150px;">
            <p style="font-weight: 700; color: #19322F; font-size: 13px; margin: 0 0 2px 0;">${title}</p>
            <p style="font-size: 11px; color: #5C706D; margin: 0 0 6px 0;">${location}</p>
            <div style="font-size: 10px; font-weight: 600; color: #006655; text-transform: uppercase;">${t('map.interactiveTitle')}</div>
          </div>`
        );

        if (isMounted) {
          setIsReady(true);
        }

        // Force Leaflet recalculation after DOM layout settles
        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 200);

        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 500);
      } catch (err) {
        console.error('Failed to load Leaflet:', err);
      }
    }

    loadLeaflet();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, title, location]);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <div className="bg-white p-2 rounded-xl shadow-sm border border-[#006655]/5">
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 min-h-[240px]">
        {/* Leaflet Mount Node */}
        <div
          ref={mapContainerRef}
          className="absolute inset-0 w-full h-full z-0"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Loading Spinner / Skeleton before Leaflet activates */}
        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100/90 z-10">
            <div className="flex flex-col items-center gap-2 text-slate-500">
              <span className="material-icons text-3xl animate-bounce text-[#006655]">
                place
              </span>
              <span className="text-xs font-semibold text-[#19322F]">
                {t('map.loading')}
              </span>
            </div>
          </div>
        )}

        {/* Visible Leaflet Badge Top-Left */}
        <div className="absolute top-2 left-2 z-[400] bg-white/95 backdrop-blur text-[#006655] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider flex items-center gap-1 pointer-events-none border border-[#006655]/10">
          <span className="material-icons text-[12px]">map</span>
          <span>{t('map.leafletBadge')}</span>
        </div>

        {/* View on Map link bottom-right */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('map.viewOnMap')}
          className="absolute bottom-2 right-2 z-[400] bg-white/95 hover:bg-white text-xs font-semibold px-2.5 py-1 rounded shadow text-[#19322F] hover:text-[#006655] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>{t('map.viewOnMap')}</span>
          <span className="material-icons text-[12px]">open_in_new</span>
        </a>
      </div>
    </div>
  );
}
