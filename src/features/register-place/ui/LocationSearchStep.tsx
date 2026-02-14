import { useCallback, useRef } from 'react';

import { BottomCta } from '@/shared/ui/bottom-cta/BottomCta';

import { PlaceSearchBar } from './PlaceSearchBar';
import { geocodeAddress, reverseGeocodeRegionCode } from '../api/geocode-place';
import type { PlaceSearchResult } from '../api/search-place.api';
import { useLocationMap } from '../lib/use-location-map';
import { usePlaceSearch } from '../lib/use-place-search';
import type { LocationData } from '../model/use-registration-store';

interface LocationSearchStepProps {
  selectedLocation: LocationData | null;
  onSelect: (location: LocationData) => void;
  onNext: () => void;
}

export function LocationSearchStep({
  selectedLocation,
  onSelect,
  onNext,
}: LocationSearchStepProps) {
  // 검색 로직
  const { searchQuery, setSearchQuery, searchResults, isSearching, handleSearch, clearSearch } =
    usePlaceSearch();

  // 지도 로직
  const { mapRef, updateMarkerPosition } = useLocationMap({
    initialCenter: {
      lat: selectedLocation?.latitude ?? 37.5665,
      lng: selectedLocation?.longitude ?? 126.978,
    },
    showInitialMarker: !!selectedLocation,
  });

  // geocoding 요청 순서 추적 (레이스 컨디션 방지)
  const geocodeRequestId = useRef(0);

  // 검색 결과 선택 - 주소로 좌표 조회 후 지도에 표시
  const handleSelectResult = useCallback(
    async (result: PlaceSearchResult) => {
      const addressToSearch = result.roadAddress || result.address;
      const requestId = ++geocodeRequestId.current;

      try {
        const { latitude, longitude } = await geocodeAddress(addressToSearch);
        if (requestId !== geocodeRequestId.current) return;

        updateMarkerPosition(latitude, longitude);

        const regionCode = await reverseGeocodeRegionCode(latitude, longitude);
        if (requestId !== geocodeRequestId.current) return;

        onSelect({
          address: result.address,
          roadAddress: result.roadAddress,
          latitude,
          longitude,
          placeName: result.placeName,
          regionCode,
        });
        clearSearch();
      } catch (error) {
        console.error('좌표 조회 실패:', error);
      }
    },
    [updateMarkerPosition, onSelect, clearSearch],
  );

  return (
    <div className='flex h-[calc(100dvh-48px)] flex-col pb-20'>
      {/* 타이틀 */}
      <div className='text-center'>
        <h1 className='text-heading4 pt-[43px] pb-[60px]'>
          <span className='font-bold'>위치</span>
          <span className='font-medium'>는 어디인가요?</span>
        </h1>
      </div>

      {/* 지도 컨테이너 */}
      <div className='relative mx-5 mb-[8px] flex-1 overflow-hidden rounded-xl'>
        {/* 지도 */}
        <div ref={mapRef} className='h-full w-full' />

        {/* 검색바 - 지도 위에 떠있음 */}
        <div className='absolute top-5 right-5 left-5 z-10'>
          <PlaceSearchBar
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onSearch={handleSearch}
            searchResults={searchResults}
            isSearching={isSearching}
            onSelectResult={handleSelectResult}
            selectedLocation={selectedLocation}
          />
        </div>
      </div>

      {/* 다음 버튼 */}
      <BottomCta onClick={onNext} disabled={!selectedLocation}>
        다음 단계
      </BottomCta>
    </div>
  );
}
