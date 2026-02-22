import { useEffect, useRef } from 'react';

import { useNaverMapScript } from '@/shared/lib/naver-map/use-naver-map-script';

interface PlaceLocationMapProps {
  locationPoint: { lat: number; lng: number };
  placeName: string;
}

export function PlaceLocationMap({ locationPoint, placeName }: PlaceLocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const naverMapRef = useRef<naver.maps.Map | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);
  const isLoaded = useNaverMapScript(import.meta.env.VITE_NAVER_CLIENT_ID);

  useEffect(
    function initializeMap() {
      if (!isLoaded || !mapRef.current) return;

      const latLng = new window.naver.maps.LatLng(locationPoint.lat, locationPoint.lng);

      naverMapRef.current = new window.naver.maps.Map(mapRef.current, {
        center: latLng,
        zoom: 16,
        draggable: false,
        scrollWheel: false,
        keyboardShortcuts: false,
        disableDoubleTapZoom: true,
        disableDoubleClickZoom: true,
        disableTwoFingerTapZoom: true,
        pinchZoom: false,
      });

      markerRef.current = new window.naver.maps.Marker({
        position: latLng,
        map: naverMapRef.current,
        title: placeName,
      });

      return () => {
        markerRef.current?.setMap(null);
        markerRef.current = null;
        naverMapRef.current?.destroy();
        naverMapRef.current = null;
      };
    },
    [isLoaded, locationPoint.lat, locationPoint.lng, placeName],
  );

  return (
    <div className='h-[185px] w-full overflow-hidden rounded-xl border border-gray-300'>
      <div ref={mapRef} className='h-full w-full' />
    </div>
  );
}
