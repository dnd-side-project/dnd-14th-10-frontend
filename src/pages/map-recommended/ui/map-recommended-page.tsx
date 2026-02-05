import { Suspense } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { useRecommendedPlacesQuery } from '@/entities/place/model/use-recommended-places-query';
import Loading from '@/shared/ui/loading/loading';
import { MapViewer } from '@/widgets/map-viewer/ui/MapViewer';
import { PlaceListDrawer } from '@/widgets/place-list-drawer/ui/PlaceListDrawer';
import { PlaceListHeader } from '@/widgets/place-list-header/ui/PlaceListHeader';

const DEFAULT_LOCATION = {
  lat: 37.5665,
  lng: 126.978,
  address: '서울특별시 중구',
};

export interface MapRecommendedContentProps {
  category: string;
}

const MapRecommendedContent = ({ category }: MapRecommendedContentProps) => {
  const navigate = useNavigate();
  const { data: places } = useRecommendedPlacesQuery();

  const handleBack = () => {
    navigate(-1);
  };

  const handleFilter = () => {
    // TODO: 필터 모달 열기
    console.log('필터 클릭');
  };

  const handlePlaceClick = (index: number) => {
    // TODO: 장소 상세 페이지로 이동
    console.log('장소 클릭:', index);
  };

  return (
    <div className='relative h-screen w-full overflow-hidden bg-white'>
      <div className='absolute inset-0'>
        <MapViewer currentLocation={DEFAULT_LOCATION} places={[]} />
      </div>

      <div className='absolute top-[72px] right-5 left-5 z-10'>
        <PlaceListHeader
          title={`'${category}' 리스트`}
          onBack={handleBack}
          onFilter={handleFilter}
        />
      </div>

      <PlaceListDrawer open places={places} onPlaceClick={handlePlaceClick} />
    </div>
  );
};

function MapRecommendedPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '인기있는 작업 공간';
  return (
    <Suspense fallback={<Loading />}>
      <MapRecommendedContent category={category} />
    </Suspense>
  );
}

export default MapRecommendedPage;
