import { useQuery } from '@tanstack/react-query';

import {
  geocodeAddress,
  localSearchAddress,
  reverseGeocodeRegionCode,
} from '@/features/register-place/api/geocode-place';

export const geocodeRegionCodesQueryKey = (query: string | undefined, hasDistrictFilter: boolean) =>
  ['geocode-region', query, hasDistrictFilter] as const;

export const useGeocodeRegionCodesQuery = (
  query: string | undefined,
  hasDistrictFilter: boolean,
  isNaverLoaded: boolean,
) => {
  return useQuery({
    queryKey: geocodeRegionCodesQueryKey(query, hasDistrictFilter),
    queryFn: async (): Promise<number[] | undefined> => {
      if (hasDistrictFilter || !query) return undefined;
      try {
        const address = await localSearchAddress(query);
        if (!address) return []; // 검색 결과 없음 신호
        const { latitude, longitude } = await geocodeAddress(address);
        const regionCode = await reverseGeocodeRegionCode(latitude, longitude);
        const sigunguCode = Math.floor(regionCode / 100000);
        return [sigunguCode];
      } catch {
        // 장소명/랜드마크 검색 시 geocode 결과 없을 수 있음 → 현재 위치 기반 검색으로 폴백
        return undefined;
      }
    },
    enabled: isNaverLoaded && (!hasDistrictFilter || !query),
  });
};
