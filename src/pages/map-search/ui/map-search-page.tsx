import { Suspense, useMemo } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import type { PlaceSearchItem } from '@/entities/place/model/place.types';
import { useSearchPlacesQuery } from '@/entities/place/model/use-search-places-query';
import {
  ATMOSPHERE_TO_MOOD,
  CATEGORY_TO_API,
  SIZE_TO_SPACE_SIZE,
} from '@/features/home/lib/filter-mappings';
import {
  MOOD_OPTIONS,
  SPACE_SIZE_OPTIONS,
} from '@/features/register-place/model/register-place.types';
import { useLocationStore } from '@/shared/model/use-location-store';
import Loading from '@/shared/ui/loading/loading';
import type { MapMarker } from '@/widgets/map-viewer/ui/MapViewer';
import { MapViewer } from '@/widgets/map-viewer/ui/MapViewer';
import { PlaceListDrawer } from '@/widgets/place-list-drawer/ui/PlaceListDrawer';
import { PlaceSearchHeader } from '@/widgets/place-search-header/ui/PlaceSearchHeader';

function parseDistricts(raw: string): string {
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

interface SearchContentProps {
  category?: string;
  atmospheres: string[];
  sizes: string[];
  // TODO: 지역 코드, 검색어 연결
}

function SearchContent({ category, atmospheres, sizes }: SearchContentProps) {
  const navigate = useNavigate();
  const { lat, lng, address } = useLocationStore();

  const apiCategory = category ? CATEGORY_TO_API[category] : undefined;
  const apiMoods = atmospheres
    .map((a) => ATMOSPHERE_TO_MOOD[a])
    .filter(Boolean)
    .join(',');
  const apiSpaceSize = sizes.length === 1 ? SIZE_TO_SPACE_SIZE[sizes[0]] : undefined;

  const { data } = useSearchPlacesQuery({
    longitude: lng,
    latitude: lat,
    category: apiCategory,
    moods: apiMoods || undefined,
    spaceSize: apiSpaceSize,
  });

  const places = data.places;
  const markers = useMemo(() => toMapMarkers(places), [places]);
  const drawerPlaces = useMemo(() => toDrawerPlaces(places), [places]);

  const handlePlaceClick = (index: number) => {
    const place = places[index];
    if (place) {
      navigate(`/place/${place.id}`);
    }
  };

  return (
    <>
      <div className='absolute inset-0'>
        <MapViewer currentLocation={{ lat, lng, address }} markers={markers} />
      </div>

      <PlaceListDrawer open places={drawerPlaces} onPlaceClick={handlePlaceClick} />
    </>
  );
}

function MapSearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = searchParams.get('category') || undefined;
  const rawDistricts = searchParams.get('districts') || '';
  const rawAtmospheres = searchParams.get('atmospheres') || '';
  const rawSizes = searchParams.get('sizes') || '';
  const query = searchParams.get('query') || undefined;

  const districts = rawDistricts ? parseDistricts(rawDistricts) : '';
  const atmospheres = rawAtmospheres ? rawAtmospheres.split(',') : [];
  const sizes = rawSizes ? rawSizes.split(',') : [];

  const handleBack = () => {
    navigate(-1);
  };

  const handleFilter = () => {
    navigate(-1);
  };

  return (
    <div className='relative h-screen w-full overflow-hidden bg-white'>
      <div className='absolute top-[72px] right-5 left-5 z-10'>
        <PlaceSearchHeader
          query={query}
          districts={districts}
          atmospheres={atmospheres.join(', ')}
          sizes={sizes.join(', ')}
          onBack={handleBack}
          onFilter={handleFilter}
        />
      </div>

      <Suspense fallback={<Loading />}>
        <SearchContent category={category} atmospheres={atmospheres} sizes={sizes} />
      </Suspense>
    </div>
  );
}

export default MapSearchPage;
