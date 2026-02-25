import { Suspense, useMemo } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import type { PlaceRecommendation } from '@/entities/place/model/place.types';
import { useNewPlacesQuery } from '@/entities/place/model/use-new-places-query';
import { usePopularPlacesQuery } from '@/entities/place/model/use-popular-places-query';
import { useRandomThemePlacesQuery } from '@/entities/place/model/use-random-theme-places-query';
import { useSimilarPlacesQuery } from '@/entities/place/model/use-similar-places-query';
import {
  MOOD_OPTIONS,
  SPACE_SIZE_OPTIONS,
} from '@/features/register-place/model/register-place.types';
import Loading from '@/shared/ui/loading/loading';
import type { MapMarker } from '@/widgets/map-viewer/ui/MapViewer';
import { MapViewer } from '@/widgets/map-viewer/ui/MapViewer';
import { PlaceListDrawer } from '@/widgets/place-list-drawer/ui/PlaceListDrawer';
import { PlaceListHeader } from '@/widgets/place-list-header/ui/PlaceListHeader';

const DEFAULT_LOCATION = {
  lat: 37.4979,
  lng: 127.0276,
  address: '서울특별시 강남구',
};

type RecommendationType = 'popular' | 'similar' | 'random-theme' | 'new';

function toMapMarkers(places: PlaceRecommendation[]): MapMarker[] {
  return places.map((p) => ({
    lat: p.latitude,
    lng: p.longitude,
    name: p.name,
  }));
}

function toDrawerPlaces(places: PlaceRecommendation[]) {
  return places.map((p) => ({
    id: String(p.id),
    name: p.name,
    location: p.addressDetail.split(' ').slice(0, 2).join(' '),
    likeCount: 0,
    tags: [
      MOOD_OPTIONS.find((o) => o.value === p.mood)?.label ?? p.mood,
      SPACE_SIZE_OPTIONS.find((o) => o.value === p.spaceSize)?.label ?? p.spaceSize,
    ],
    images: p.representativeImageUrl ? [p.representativeImageUrl] : [],
  }));
}

const PopularContent = ({ category }: { category: string }) => {
  const { data } = usePopularPlacesQuery({
    latitude: DEFAULT_LOCATION.lat,
    longitude: DEFAULT_LOCATION.lng,
    category: category === 'PUBLIC' ? 'PUBLIC' : 'CAFE',
  });
  return <RecommendedContent places={data} />;
};

const DEFAULT_REGION_CODE = 1168000000; // 서울특별시 강남구

const SimilarContent = ({ category }: { category: string }) => {
  const { data } = useSimilarPlacesQuery({
    regionCode: DEFAULT_REGION_CODE,
    category: category === 'PUBLIC' ? 'PUBLIC' : 'CAFE',
    longitude: DEFAULT_LOCATION.lng,
    latitude: DEFAULT_LOCATION.lat,
  });
  return <RecommendedContent places={data} />;
};

const NewContent = ({ category }: { category: string }) => {
  const { data } = useNewPlacesQuery({
    regionCode: DEFAULT_REGION_CODE,
    category: category === 'PUBLIC' ? 'PUBLIC' : 'CAFE',
    longitude: DEFAULT_LOCATION.lng,
    latitude: DEFAULT_LOCATION.lat,
  });
  return <RecommendedContent places={data} />;
};

const RandomThemeContent = ({ category }: { category: string }) => {
  const { data } = useRandomThemePlacesQuery({
    latitude: DEFAULT_LOCATION.lat,
    longitude: DEFAULT_LOCATION.lng,
    category: category === 'PUBLIC' ? 'PUBLIC' : 'CAFE',
  });
  return <RecommendedContent places={data} />;
};

interface RecommendedContentInnerProps {
  places: PlaceRecommendation[];
}

const RecommendedContent = ({ places }: RecommendedContentInnerProps) => {
  const navigate = useNavigate();
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
        <MapViewer currentLocation={DEFAULT_LOCATION} markers={markers} />
      </div>

      <PlaceListDrawer open places={drawerPlaces} onPlaceClick={handlePlaceClick} />
    </>
  );
};

function MapRecommendedPage() {
  const [searchParams] = useSearchParams();
  const type = (searchParams.get('type') || 'popular') as RecommendationType;
  const category = searchParams.get('category') || '인기있는 작업 공간';
  const placeCategory = searchParams.get('placeCategory') || 'CAFE';
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleFilter = () => {
    console.log('필터 클릭');
  };

  return (
    <div className='relative h-screen w-full overflow-hidden bg-white'>
      <div className='absolute top-[72px] right-5 left-5 z-10'>
        <PlaceListHeader
          title={`'${category}' 리스트`}
          onBack={handleBack}
          onFilter={handleFilter}
        />
      </div>

      <Suspense fallback={<Loading />}>
        {type === 'popular' && <PopularContent category={placeCategory} />}
        {type === 'similar' && <SimilarContent category={placeCategory} />}
        {type === 'new' && <NewContent category={placeCategory} />}
        {type === 'random-theme' && <RandomThemeContent category={placeCategory} />}
      </Suspense>
    </div>
  );
}

export default MapRecommendedPage;
