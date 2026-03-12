import { useCallback, useEffect, useMemo, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import type { PlaceSearchItem } from '@/entities/place/model/place.types';
import { useBatchPlacesQuery } from '@/entities/place/model/use-batch-places-query';
import { useNewPlacesQuery } from '@/entities/place/model/use-new-places-query';
import { usePopularPlacesQuery } from '@/entities/place/model/use-popular-places-query';
import { useRandomThemePlacesQuery } from '@/entities/place/model/use-random-theme-places-query';
import { useSimilarPlacesQuery } from '@/entities/place/model/use-similar-places-query';
import SearchDialog from '@/features/home/ui/SearchDialog';
import {
  MOOD_OPTIONS,
  SPACE_SIZE_OPTIONS,
} from '@/features/register-place/model/register-place.types';
import { useLocationStore } from '@/shared/model/use-location-store';
import type { PlaceCategory } from '@/shared/types/place';
import type { MapMarker } from '@/widgets/map-viewer/ui/MapViewer';
import { MapViewer } from '@/widgets/map-viewer/ui/MapViewer';
import { PlaceListDrawer } from '@/widgets/place-list-drawer/ui/PlaceListDrawer';
import { PlaceListHeader } from '@/widgets/place-list-header/ui/PlaceListHeader';

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
  regionCode: number;
  placeCategory: PlaceCategory;
  isFilterOpen: boolean;
  onMarkersChange: (markers: MapMarker[]) => void;
}

function PopularContent({ mapState, placeCategory, isFilterOpen, onMarkersChange }: ContentProps) {
  const { data } = usePopularPlacesQuery(
    {
      latitude: mapState.lat,
      longitude: mapState.lng,
      category: placeCategory,
      radiusMeters: Math.round(mapState.radiusMeters),
    },
    { keepPrevious: true },
  );

  const ids = useMemo(() => (data ?? []).map((p) => p.id), [data]);
  return (
    <RecommendedContent ids={ids} isFilterOpen={isFilterOpen} onMarkersChange={onMarkersChange} />
  );
}

function SimilarContent({ mapState, regionCode, placeCategory, isFilterOpen, onMarkersChange }: ContentProps) {
  const { data } = useSimilarPlacesQuery(
    {
      regionCode,
      category: placeCategory,
      longitude: mapState.lng,
      latitude: mapState.lat,
    },
    { keepPrevious: true },
  );

  const ids = useMemo(() => (data ?? []).map((p) => p.id), [data]);
  return (
    <RecommendedContent ids={ids} isFilterOpen={isFilterOpen} onMarkersChange={onMarkersChange} />
  );
}

function NewContent({ mapState, regionCode, placeCategory, isFilterOpen, onMarkersChange }: ContentProps) {
  const { data } = useNewPlacesQuery(
    {
      regionCode,
      category: placeCategory,
      longitude: mapState.lng,
      latitude: mapState.lat,
    },
    { keepPrevious: true },
  );

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
  const { data } = useRandomThemePlacesQuery(
    {
      latitude: mapState.lat,
      longitude: mapState.lng,
      category: placeCategory,
      radiusMeters: Math.round(mapState.radiusMeters),
    },
    { keepPrevious: true },
  );

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

  const storeLat = useLocationStore((s) => s.lat);
  const storeLng = useLocationStore((s) => s.lng);
  const storeAddress = useLocationStore((s) => s.address);
  const regionCode = useLocationStore((s) => s.regionCode);

  const currentLocation = useMemo(
    () => ({ lat: storeLat, lng: storeLng, address: storeAddress }),
    [storeLat, storeLng, storeAddress],
  );

  const [mapState, setMapState] = useState<MapState>({
    lat: storeLat,
    lng: storeLng,
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
    regionCode,
    placeCategory,
    isFilterOpen,
    onMarkersChange: handleMarkersChange,
  };

  return (
    <div className='relative h-screen w-full overflow-hidden bg-white'>
      <div className='absolute top-0 right-0 left-0 h-[calc(50vh+92px)]'>
        <MapViewer
          currentLocation={currentLocation}
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
