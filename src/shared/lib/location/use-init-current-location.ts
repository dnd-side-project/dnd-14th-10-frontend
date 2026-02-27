import { useEffect, useRef, useState } from 'react';

import { reverseGeocodeLocationInfo } from '@/features/register-place/api/geocode-place';
import { getCoordinateByRegionCode } from '@/shared/constants/region-coordinates';
import { useLocationStore } from '@/shared/model/use-location-store';
import type { UserProfile } from '@/shared/types/user';

interface Options {
  isNaverLoaded: boolean;
  user?: UserProfile;
  isAuthenticated: boolean;
}

export function useInitCurrentLocation({ isNaverLoaded, user, isAuthenticated }: Options) {
  const setLocation = useLocationStore((s) => s.setLocation);
  const gpsCoordsRef = useRef<{ lat: number; lng: number } | null>(null);
  const [gpsState, setGpsState] = useState<'pending' | 'granted' | 'denied'>(() =>
    typeof navigator !== 'undefined' && !navigator.geolocation ? 'denied' : 'pending',
  );

  // GPS 요청은 즉시 실행 (Naver 로드 대기 없음)
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

  // GPS 허용 + Naver 로드 완료 → 역지오코딩 후 store 업데이트
  useEffect(() => {
    if (!isNaverLoaded || gpsState !== 'granted' || !gpsCoordsRef.current) return;
    const { lat, lng } = gpsCoordsRef.current;
    reverseGeocodeLocationInfo(lat, lng)
      .then(({ regionCode, sigunguName }) => {
        setLocation(lat, lng, sigunguName, regionCode, sigunguName);
      })
      .catch(() => {
        // 역지오코딩 실패: 기본값 유지
      });
  }, [isNaverLoaded, gpsState, setLocation]);

  // GPS 거부 + 로그인 → 유저 프로필 regionCode 기반 좌표 사용
  // GPS 거부 + 비로그인 → 기본값(강남구) 유지
  useEffect(() => {
    if (gpsState !== 'denied' || !isAuthenticated || !user?.regionCode) return;
    const coord = getCoordinateByRegionCode(user.regionCode);
    if (!coord) return;

    if (isNaverLoaded) {
      reverseGeocodeLocationInfo(coord.latitude, coord.longitude)
        .then(({ regionCode, sigunguName }) => {
          setLocation(coord.latitude, coord.longitude, sigunguName, regionCode, sigunguName);
        })
        .catch(() => {
          setLocation(coord.latitude, coord.longitude, '', user.regionCode, '');
        });
    } else {
      // Naver 로드 전: regionCode만 업데이트, sigunguName은 Naver 로드 후 위 조건에서 처리
      setLocation(coord.latitude, coord.longitude, '', user.regionCode, '');
    }
  }, [gpsState, isAuthenticated, isNaverLoaded, user, setLocation]);
}
