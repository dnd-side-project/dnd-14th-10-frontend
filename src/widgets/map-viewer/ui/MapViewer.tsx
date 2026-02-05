import { useEffect, useRef } from 'react';

import type { Place } from '@/entities/place/api/place.api';
import { useNaverMapScript } from '@/shared/lib/naver-map/use-naver-map-script';

interface MapViewerProps {
  currentLocation: { lat: number; lng: number; address: string } | null;
  places: Place[];
}

export const MapViewer = ({ currentLocation, places }: MapViewerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const naverMapRef = useRef<naver.maps.Map | null>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const currentLocationMarkerRef = useRef<naver.maps.Marker | null>(null);
  const isLoaded = useNaverMapScript(import.meta.env.VITE_NAVER_CLIENT_ID);

  useEffect(
    function initializeMap() {
      if (!isLoaded || !mapRef.current) return;

      if (!naverMapRef.current) {
        naverMapRef.current = new window.naver.maps.Map(mapRef.current, {
          center: new window.naver.maps.LatLng(37.5665, 126.978),
          zoom: 15,
        });
      }

      return () => {
        naverMapRef.current?.destroy();
        naverMapRef.current = null;
      };
    },
    [isLoaded],
  );

  useEffect(
    function updateCurrentLocationMarker() {
      if (!naverMapRef.current || !currentLocation) return;

      const map = naverMapRef.current;
      const latLng = new window.naver.maps.LatLng(currentLocation.lat, currentLocation.lng);
      map.setCenter(latLng);

      if (currentLocationMarkerRef.current) {
        currentLocationMarkerRef.current.setMap(null);
      }

      currentLocationMarkerRef.current = new window.naver.maps.Marker({
        position: latLng,
        map: map,
        icon: {
          content:
            '<div style="width:12px; height:12px; background:blue; border-radius:50%; border:2px solid white;"></div>',
        },
      });

      return () => {
        if (currentLocationMarkerRef.current) {
          currentLocationMarkerRef.current.setMap(null);
          currentLocationMarkerRef.current = null;
        }
      };
    },
    [currentLocation],
  );

  useEffect(
    function updatePlaceMarkers() {
      if (!naverMapRef.current) return;

      const map = naverMapRef.current;

      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = places.map(
        (place) =>
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(
              place.locationPoint.lat,
              place.locationPoint.lng,
            ),
            map: map,
            title: place.name,
          }),
      );

      return () => {
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];
      };
    },
    [places],
  );

  return (
    <div className='h-full w-full overflow-hidden border border-gray-200'>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};
