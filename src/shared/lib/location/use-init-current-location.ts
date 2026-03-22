import { useEffect, useRef, useState } from 'react';

import { reverseGeocodeLocationInfo } from '@/features/register-place/api/geocode-place';
import { getCoordinateByRegionCode } from '@/shared/constants/region-coordinates';
import { useLocationStore } from '@/shared/model/use-location-store';
import type { LocationData } from '@/shared/model/use-location-store';
import type { UserProfile } from '@/shared/types/user';

type GpsState = 'pending' | 'granted' | 'denied';

interface Options {
  isNaverLoaded: boolean;
  user?: UserProfile;
  isAuthenticated: boolean;
}

async function geocodeAndSet(lat: number, lng: number, setLocation: (data: LocationData) => void) {
  const { regionCode, sigunguName } = await reverseGeocodeLocationInfo(lat, lng);
  setLocation({ lat, lng, address: sigunguName, regionCode, sigunguName });
}

/**
 * 위치 결정 우선순위:
 * 1. 브라우저 GPS (최우선)
 * 2. 회원가입 시 입력한 주소 (GPS 거부 + 로그인)
 * 3. 강남구 기본값 (GPS 거부 + 비로그인)
 *
 * Naver Maps가 로드되어야 역지오코딩이 가능하므로,
 * GPS/유저 프로필 분기 모두 isNaverLoaded를 기다린 뒤 처리한다.
 * 역지오코딩 실패 시 store 기본값(강남구)을 그대로 유지한다.
 */
export function useInitCurrentLocation({ isNaverLoaded, user, isAuthenticated }: Options) {
  const setLocation = useLocationStore((s) => s.setLocation);
  const gpsCoordsRef = useRef<{ lat: number; lng: number } | null>(null);
  const [gpsState, setGpsState] = useState<GpsState>(() =>
    typeof navigator !== 'undefined' && !navigator.geolocation ? 'denied' : 'pending',
  );
  const [isLocationReady, setIsLocationReady] = useState(false);

  // 1단계: GPS 좌표 요청
  useEffect(() => {
    if (gpsState !== 'pending') return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        gpsCoordsRef.current = { lat: coords.latitude, lng: coords.longitude };
        setGpsState('granted');
      },
      () => setGpsState('denied'),
    );
  }, [gpsState]);

  // 2단계: GPS 허용 + Naver 로드 → 현재 위치로 설정
  useEffect(() => {
    if (gpsState !== 'granted' || !gpsCoordsRef.current || !isNaverLoaded) return;
    const { lat, lng } = gpsCoordsRef.current;
    geocodeAndSet(lat, lng, setLocation)
      .catch(() => {})
      .finally(() => setIsLocationReady(true));
  }, [gpsState, isNaverLoaded, setLocation]);

  // 3단계: GPS 거부 + Naver 로드 → 유저 프로필 또는 기본값 사용
  useEffect(() => {
    if (gpsState !== 'denied' || !isNaverLoaded) return;

    const coord =
      isAuthenticated && user?.regionCode ? getCoordinateByRegionCode(user.regionCode) : null;

    if (!coord) {
      queueMicrotask(() => setIsLocationReady(true));
      return;
    }

    geocodeAndSet(coord.latitude, coord.longitude, setLocation)
      .catch(() => {})
      .finally(() => setIsLocationReady(true));
  }, [gpsState, isNaverLoaded, isAuthenticated, user, setLocation]);

  return { isLocationReady };
}
