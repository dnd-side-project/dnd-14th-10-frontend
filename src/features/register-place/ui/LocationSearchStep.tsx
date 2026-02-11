import { useCallback, useState } from 'react';

import { BottomCta } from '@/shared/ui/bottom-cta/BottomCta';

import { PlaceSearchBar } from './PlaceSearchBar';
import { SelectedLocationInfo } from './SelectedLocationInfo';
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  // 검색 결과 선택 - 주소로 좌표 조회 후 지도에 표시
  const handleSelectResult = useCallback(
    (result: PlaceSearchResult) => {
      if (!window.naver?.maps?.Service) return;

      const addressToSearch = result.roadAddress || result.address;

      window.naver.maps.Service.geocode({ query: addressToSearch }, (status, response) => {
        if (status !== window.naver.maps.Service.Status.OK || !response.v2.addresses.length) {
          console.error('좌표 조회 실패');
          return;
        }

        const addr = response.v2.addresses[0];
        const latitude = parseFloat(addr.y);
        const longitude = parseFloat(addr.x);

        updateMarkerPosition(latitude, longitude);

        const locationData: LocationData = {
          address: result.address,
          roadAddress: result.roadAddress,
          latitude,
          longitude,
          placeName: result.placeName,
        };

        onSelect(locationData);
        clearSearch();
        setIsSearchOpen(false);
      });
    },
    [updateMarkerPosition, onSelect, clearSearch],
  );

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    clearSearch();
  };

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
      <div className='relative mx-5 mb-4 flex-1 overflow-hidden rounded-xl'>
        {/* 지도 */}
        <div ref={mapRef} className='h-full w-full' />

        {/* 검색바 - 지도 위에 떠있음 */}
        <div className='absolute top-5 right-5 left-5 z-10'>
          <PlaceSearchBar
            isOpen={isSearchOpen}
            onOpen={() => setIsSearchOpen(true)}
            onClose={handleCloseSearch}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onSearch={handleSearch}
            searchResults={searchResults}
            isSearching={isSearching}
            onSelectResult={handleSelectResult}
          />
        </div>
      </div>

      {/* 선택된 위치 */}
      {selectedLocation && <SelectedLocationInfo location={selectedLocation} />}

      {/* 다음 버튼 */}
      <BottomCta onClick={onNext} disabled={!selectedLocation}>
        다음 단계
      </BottomCta>
    </div>
  );
}
