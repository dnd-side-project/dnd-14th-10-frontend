import { useCallback, useEffect, useMemo, useState } from 'react';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  getNewPlaces,
  getPopularPlaces,
  getRandomThemePlaces,
  getSimilarPlaces,
} from '@/entities/place/api/place.api';
import type { PlaceSearchItem } from '@/entities/place/model/place.types';
import { placeKeys } from '@/entities/place/model/query-keys';
import { useBatchPlacesQuery } from '@/entities/place/model/use-batch-places-query';
import SearchDialog from '@/features/home/ui/SearchDialog';
import {
  MOOD_OPTIONS,
  SPACE_SIZE_OPTIONS,
} from '@/features/register-place/model/register-place.types';
import type { PlaceCategory } from '@/shared/types/place';
import type { MapMarker } from '@/widgets/map-viewer/ui/MapViewer';
import { MapViewer } from '@/widgets/map-viewer/ui/MapViewer';
import { PlaceListDrawer } from '@/widgets/place-list-drawer/ui/PlaceListDrawer';
import { PlaceListHeader } from '@/widgets/place-list-header/ui/PlaceListHeader';

const DEFAULT_LOCATION = {
  lat: 37.4979,
  lng: 127.0276,
  address: '서울특별시 강남구',
};

const DEFAULT_REGION_CODE = 1168000000;

type RecommendationType = 'popular' | 'similar' | 'random-theme' | 'new';

interface MapState {
  lat: number;
  lng: number;
  radiusMeters: number;
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

interface RecommendedContentProps {
  ids: number[];
  isFilterOpen: boolean;
  onMarkersChange: (markers: MapMarker[]) => void;
}

function RecommendedContent({ ids, isFilterOpen, onMarkersChange }: RecommendedContentProps) {
  const navigate = useNavigate();
  const { data: batchData } = useBatchPlacesQuery(ids);

  const places = useMemo(() => batchData ?? [], [batchData]);
  const markers = useMemo(() => toMapMarkers(places), [places]);
  const drawerPlaces = useMemo(() => toDrawerPlaces(places), [places]);

  useEffect(() => {
    onMarkersChange(markers);
  }, [markers, onMarkersChange]);

  const handlePlaceClick = (index: number) => {
    const place = places[index];
    if (place) navigate(`/place/${place.id}`);
  };

  return (
    <PlaceListDrawer open={!isFilterOpen} places={drawerPlaces} onPlaceClick={handlePlaceClick} />
  );
}

const PLACE_CATEGORIES: PlaceCategory[] = ['CAFE', 'PUBLIC'];

function toPlaceCategory(value: string): PlaceCategory {
  return (PLACE_CATEGORIES as string[]).includes(value) ? (value as PlaceCategory) : 'CAFE';
}

interface ContentProps {
  mapState: MapState;
  placeCategory: PlaceCategory;
  isFilterOpen: boolean;
  onMarkersChange: (markers: MapMarker[]) => void;
}

function PopularContent({ mapState, placeCategory, isFilterOpen, onMarkersChange }: ContentProps) {
  const { data } = useQuery({
    queryKey: placeKeys.popular({
      latitude: mapState.lat,
      longitude: mapState.lng,
      category: placeCategory,
      radiusMeters: Math.round(mapState.radiusMeters),
    }),
    queryFn: () =>
      getPopularPlaces({
        latitude: mapState.lat,
        longitude: mapState.lng,
        category: placeCategory,
        radiusMeters: Math.round(mapState.radiusMeters),
      }),
    placeholderData: keepPreviousData,
  });

  const ids = useMemo(() => (data ?? []).map((p) => p.id), [data]);
  return (
    <RecommendedContent ids={ids} isFilterOpen={isFilterOpen} onMarkersChange={onMarkersChange} />
  );
}

function SimilarContent({ mapState, placeCategory, isFilterOpen, onMarkersChange }: ContentProps) {
  const { data } = useQuery({
    queryKey: placeKeys.similar({
      regionCode: DEFAULT_REGION_CODE,
      category: placeCategory,
      longitude: mapState.lng,
      latitude: mapState.lat,
    }),
    queryFn: () =>
      getSimilarPlaces({
        regionCode: DEFAULT_REGION_CODE,
        category: placeCategory,
        longitude: mapState.lng,
        latitude: mapState.lat,
      }),
    placeholderData: keepPreviousData,
  });

  const ids = useMemo(() => (data ?? []).map((p) => p.id), [data]);
  return (
    <RecommendedContent ids={ids} isFilterOpen={isFilterOpen} onMarkersChange={onMarkersChange} />
  );
}

function NewContent({ mapState, placeCategory, isFilterOpen, onMarkersChange }: ContentProps) {
  const { data } = useQuery({
    queryKey: placeKeys.new({
      regionCode: DEFAULT_REGION_CODE,
      category: placeCategory,
      longitude: mapState.lng,
      latitude: mapState.lat,
    }),
    queryFn: () =>
      getNewPlaces({
        regionCode: DEFAULT_REGION_CODE,
        category: placeCategory,
        longitude: mapState.lng,
        latitude: mapState.lat,
      }),
    placeholderData: keepPreviousData,
  });

  const ids = useMemo(() => (data ?? []).map((p) => p.id), [data]);
  return (
    <RecommendedContent ids={ids} isFilterOpen={isFilterOpen} onMarkersChange={onMarkersChange} />
  );
}

function RandomThemeContent({
  mapState,
  placeCategory,
  isFilterOpen,
  onMarkersChange,
}: ContentProps) {
  const { data } = useQuery({
    queryKey: placeKeys.randomTheme({
      latitude: mapState.lat,
      longitude: mapState.lng,
      category: placeCategory,
      radiusMeters: Math.round(mapState.radiusMeters),
    }),
    queryFn: () =>
      getRandomThemePlaces({
        latitude: mapState.lat,
        longitude: mapState.lng,
        category: placeCategory,
        radiusMeters: Math.round(mapState.radiusMeters),
      }),
    placeholderData: keepPreviousData,
  });

  const ids = useMemo(() => (data?.places ?? []).map((p) => p.id), [data]);
  return (
    <RecommendedContent ids={ids} isFilterOpen={isFilterOpen} onMarkersChange={onMarkersChange} />
  );
}

function MapRecommendedPage() {
  const [searchParams] = useSearchParams();
  const type = (searchParams.get('type') || 'popular') as RecommendationType;
  const category = searchParams.get('category') || '인기있는 작업 공간';
  const placeCategory = toPlaceCategory(searchParams.get('placeCategory') || 'CAFE');
  const navigate = useNavigate();

  const [mapState, setMapState] = useState<MapState>({
    lat: DEFAULT_LOCATION.lat,
    lng: DEFAULT_LOCATION.lng,
    radiusMeters: 5000,
  });
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleMarkersChange = useCallback((newMarkers: MapMarker[]) => {
    setMarkers(newMarkers);
  }, []);

  useEffect(() => {
    if (!isFilterOpen) {
      document.body.style.removeProperty('pointer-events');
    }
  }, [isFilterOpen]);

  const handleBack = () => {
    navigate(-1);
  };

  const contentProps: ContentProps = {
    mapState,
    placeCategory,
    isFilterOpen,
    onMarkersChange: handleMarkersChange,
  };

  return (
    <div className='relative h-screen w-full overflow-hidden bg-white'>
      <div className='absolute top-0 right-0 left-0 h-[calc(50vh+92px)]'>
        <MapViewer
          currentLocation={DEFAULT_LOCATION}
          markers={markers}
          disableFitBounds
          onMapChange={(center, radiusMeters) =>
            setMapState({ lat: center.lat, lng: center.lng, radiusMeters })
          }
        />
      </div>

      <div className='absolute top-[72px] right-5 left-5 z-10'>
        <PlaceListHeader
          title={`'${category}' 리스트`}
          onBack={handleBack}
          onFilter={() => setIsFilterOpen(true)}
        />
      </div>

      {type === 'popular' && <PopularContent {...contentProps} />}
      {type === 'similar' && <SimilarContent {...contentProps} />}
      {type === 'new' && <NewContent {...contentProps} />}
      {type === 'random-theme' && <RandomThemeContent {...contentProps} />}

      <SearchDialog
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onSearch={(params) => navigate(`/map/search?${params.toString()}`)}
        disableCategory
      />
    </div>
  );
}

export default MapRecommendedPage;
