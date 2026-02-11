import { useCallback, useEffect, useRef } from 'react';

import { useNaverMapScript } from '@/shared/lib/naver-map/use-naver-map-script';

interface UseLocationMapProps {
  initialCenter: { lat: number; lng: number };
  showInitialMarker?: boolean;
}

interface UseLocationMapReturn {
  mapRef: React.RefObject<HTMLDivElement | null>;
  updateMarkerPosition: (lat: number, lng: number) => void;
  isLoaded: boolean;
}

export function useLocationMap({
  initialCenter,
  showInitialMarker = false,
}: UseLocationMapProps): UseLocationMapReturn {
  const mapRef = useRef<HTMLDivElement>(null);
  const naverMapRef = useRef<naver.maps.Map | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);

  const isLoaded = useNaverMapScript(import.meta.env.VITE_NAVER_CLIENT_ID);

  // 마커 위치 업데이트
  const updateMarkerPosition = useCallback((lat: number, lng: number) => {
    if (!naverMapRef.current) return;

    const position = new window.naver.maps.LatLng(lat, lng);

    if (markerRef.current) {
      markerRef.current.setPosition(position);
    } else {
      markerRef.current = new window.naver.maps.Marker({
        position,
        map: naverMapRef.current,
      });
    }

    naverMapRef.current.setCenter(position);
  }, []);

  // 지도 초기화
  useEffect(() => {
    if (!isLoaded || !mapRef.current || naverMapRef.current) return;

    const center = new window.naver.maps.LatLng(initialCenter.lat, initialCenter.lng);

    naverMapRef.current = new window.naver.maps.Map(mapRef.current, {
      center,
      zoom: 16,
    });

    // 초기 마커 표시
    if (showInitialMarker) {
      markerRef.current = new window.naver.maps.Marker({
        position: center,
        map: naverMapRef.current,
      });
    }

    return () => {
      naverMapRef.current?.destroy();
      naverMapRef.current = null;
    };
  }, [isLoaded, initialCenter.lat, initialCenter.lng, showInitialMarker]);

  return {
    mapRef,
    updateMarkerPosition,
    isLoaded,
  };
}
