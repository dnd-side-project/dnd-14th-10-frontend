import { Suspense, useEffect, useMemo, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import type { PlaceSearchItem } from '@/entities/place/model/place.types';
import { useGeocodeRegionCodesQuery } from '@/entities/place/model/use-geocode-region-codes-query';
import { useSearchPlacesInfiniteQuery } from '@/entities/place/model/use-search-places-infinite-query';
import {
  ATMOSPHERE_TO_MOOD,
  CATEGORY_TO_API,
  SIZE_TO_SPACE_SIZE,
} from '@/features/home/lib/filter-mappings';
import SearchDialog from '@/features/home/ui/SearchDialog';
import { REGION_CODES } from '@/features/onboarding/model/onboarding.types';
import {
  MOOD_OPTIONS,
  SPACE_SIZE_OPTIONS,
} from '@/features/register-place/model/register-place.types';
import { useNaverMapScript } from '@/shared/lib/naver-map/use-naver-map-script';
import { useLocationStore } from '@/shared/model/use-location-store';
import Loading from '@/shared/ui/loading/loading';
import type { MapMarker } from '@/widgets/map-viewer/ui/MapViewer';
import { MapViewer } from '@/widgets/map-viewer/ui/MapViewer';
import { PlaceListDrawer } from '@/widgets/place-list-drawer/ui/PlaceListDrawer';
import { PlaceSearchHeader } from '@/widgets/place-search-header/ui/PlaceSearchHeader';

function parseDistrictRegionCodes(raw: string): number[] {
  if (!raw) return [];
  return raw.split('|').flatMap((group) => {
    const [city, districts] = group.split(':');
    return (districts?.split(',') ?? [])
      .map((d) => REGION_CODES[city]?.[d])
      .filter((code): code is number => code !== undefined)
      .map((code) => Math.floor(code / 100000));
  });
}

function parseDistrictsDisplay(raw: string): string {
  return raw
    .split('|')
    .flatMap((group) => {
      const [, districts] = group.split(':');
      return districts?.split(',') ?? [];
    })
    .join(', ');
}

function toMapMarkers(places: PlaceSearchItem[]): MapMarker[] {
  return places.map((p) => ({
    lat: p.latitude,
    lng: p.longitude,
    name: p.name,
  }));
}

function toDrawerPlaces(places: PlaceSearchItem[]) {
  return places.map((p) => ({
    id: String(p.id),
    name: p.name,
    location: p.addressDetail.split(' ').slice(0, 2).join(' '),
    likeCount: p.wishCount,
    tags: [
      MOOD_OPTIONS.find((o) => o.value === p.mood)?.label ?? p.mood,
      SPACE_SIZE_OPTIONS.find((o) => o.value === p.spaceSize)?.label ?? p.spaceSize,
    ],
    images: p.images.filter((img) => img.representativeFlag).map((img) => img.url),
  }));
}

interface PlacesContentProps {
  regionCodes: number[] | undefined;
  category?: string;
  atmospheres: string[];
  size?: string;
  isFilterOpen: boolean;
}

function PlacesContent({
  regionCodes,
  category,
  atmospheres,
  size,
  isFilterOpen,
}: PlacesContentProps) {
  const navigate = useNavigate();
  const { lat, lng, address } = useLocationStore();

  const apiCategory = category ? CATEGORY_TO_API[category] : undefined;
  const apiMoods = atmospheres
    .map((a) => ATMOSPHERE_TO_MOOD[a])
    .filter(Boolean)
    .join(',');
  const apiSpaceSize = size ? SIZE_TO_SPACE_SIZE[size] : undefined;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchPlacesInfiniteQuery({
    longitude: lng,
    latitude: lat,
    category: apiCategory,
    moods: apiMoods || undefined,
    spaceSize: apiSpaceSize,
    regionCodes,
  });

  const places = data.pages.flatMap((page) => page.places);
  const markers = useMemo(() => toMapMarkers(places), [places]);
  const drawerPlaces = useMemo(() => toDrawerPlaces(places), [places]);

  const handlePlaceClick = (index: number) => {
    const place = places[index];
    if (place) navigate(`/place/${place.id}`);
  };

  const handleScrollEnd = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      <div className='absolute top-0 right-0 left-0 h-[calc(50vh+92px)]'>
        <MapViewer currentLocation={{ lat, lng, address }} markers={markers} />
      </div>
      <PlaceListDrawer
        open={!isFilterOpen}
        places={drawerPlaces}
        onPlaceClick={handlePlaceClick}
        onScrollEnd={handleScrollEnd}
        footer={
          isFetchingNextPage ? (
            <div className='flex justify-center py-4 text-sm text-gray-400'>로딩 중...</div>
          ) : null
        }
      />
    </>
  );
}

interface SearchContentProps {
  category?: string;
  atmospheres: string[];
  size?: string;
  isFilterOpen: boolean;
  query?: string;
  rawDistricts: string;
}

function SearchContent({
  category,
  atmospheres,
  size,
  isFilterOpen,
  query,
  rawDistricts,
}: SearchContentProps) {
  const isNaverLoaded = useNaverMapScript(import.meta.env.VITE_NAVER_CLIENT_ID);
  const { lat, lng, address } = useLocationStore();

  const districtRegionCodes = useMemo(() => parseDistrictRegionCodes(rawDistricts), [rawDistricts]);
  const hasDistrictFilter = districtRegionCodes.length > 0;

  const {
    data: geocodedRegionCodes,
    isSuccess: geocodeSuccess,
    isError: geocodeError,
  } = useGeocodeRegionCodesQuery(query, hasDistrictFilter, isNaverLoaded);

  const geocodeReady = !query || hasDistrictFilter || geocodeSuccess || geocodeError;
  const regionCodes = hasDistrictFilter ? districtRegionCodes : geocodedRegionCodes;

  if (!geocodeReady) return <Loading />;

  // 검색어로 조회했지만 naver-search 결과 없음 → places API 호출 없이 빈 상태 표시
  if (query && !hasDistrictFilter && geocodeSuccess && regionCodes?.length === 0) {
    return (
      <>
        <div className='absolute top-0 right-0 left-0 h-[calc(30vh+92px)]'>
          <MapViewer currentLocation={{ lat, lng, address }} markers={[]} />
        </div>
        <PlaceListDrawer open={!isFilterOpen} places={[]} />
      </>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <PlacesContent
        regionCodes={regionCodes}
        category={category}
        atmospheres={atmospheres}
        size={size}
        isFilterOpen={isFilterOpen}
      />
    </Suspense>
  );
}

function MapSearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const category = searchParams.get('category') || undefined;
  const rawDistricts = searchParams.get('districts') || '';
  const rawAtmospheres = searchParams.get('atmospheres') || '';
  const rawSize = searchParams.get('sizes') || '';
  const query = searchParams.get('query') || undefined;

  const districts = rawDistricts ? parseDistrictsDisplay(rawDistricts) : '';
  const atmospheres = rawAtmospheres ? rawAtmospheres.split(',') : [];
  const size = rawSize || undefined;

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!isFilterOpen) {
      document.body.style.removeProperty('pointer-events');
    }
  }, [isFilterOpen]);

  return (
    <div className='relative h-screen w-full overflow-hidden bg-white'>
      <div className='absolute top-[72px] right-5 left-5 z-10'>
        <PlaceSearchHeader
          query={query}
          districts={districts}
          atmospheres={atmospheres.join(', ')}
          sizes={size ?? ''}
          onBack={handleBack}
          onFilter={() => setIsFilterOpen(true)}
        />
      </div>

      <SearchContent
        category={category}
        atmospheres={atmospheres}
        size={size}
        isFilterOpen={isFilterOpen}
        query={query}
        rawDistricts={rawDistricts}
      />

      <SearchDialog
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onSearch={(params) => navigate(`/map/search?${params.toString()}`)}
      />
    </div>
  );
}

export default MapSearchPage;
