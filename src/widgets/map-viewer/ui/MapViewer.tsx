import { useEffect, useRef } from 'react';

import type { Place } from '@/entities/place/model/place.types';
import { useNaverMapScript } from '@/shared/lib/naver-map/use-naver-map-script';

export interface MapMarker {
  lat: number;
  lng: number;
  name: string;
}

interface MapViewerProps {
  currentLocation: { lat: number; lng: number; address: string } | null;
  places?: Place[];
  markers?: MapMarker[];
}

export const MapViewer = ({ currentLocation, places = [], markers = [] }: MapViewerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const naverMapRef = useRef<naver.maps.Map | null>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);
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
    function updateCenter() {
      if (!naverMapRef.current || !currentLocation) return;

      const latLng = new window.naver.maps.LatLng(currentLocation.lat, currentLocation.lng);
      naverMapRef.current.setCenter(latLng);
    },
    [currentLocation],
  );

  useEffect(
    function updatePlaceMarkers() {
      if (!naverMapRef.current) return;

      const map = naverMapRef.current;

      markersRef.current.forEach((marker) => marker.setMap(null));

      const placeMarkers = places.map(
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

      const customMarkers = markers.map(
        (m) =>
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(m.lat, m.lng),
            map: map,
            title: m.name,
          }),
      );

      markersRef.current = [...placeMarkers, ...customMarkers];

      if (markersRef.current.length > 0) {
        const bounds = new window.naver.maps.LatLngBounds(
          markersRef.current[0].getPosition() as naver.maps.LatLng,
          markersRef.current[0].getPosition() as naver.maps.LatLng,
        );
        markersRef.current.forEach((marker) => {
          bounds.extend(marker.getPosition() as naver.maps.LatLng);
        });
        map.fitBounds(bounds, { top: 100, right: 50, bottom: 772, left: 50 });
      }

      return () => {
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];
      };
    },
    [places, markers],
  );

  return (
    <div className='h-full w-full overflow-hidden border border-gray-200'>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};
