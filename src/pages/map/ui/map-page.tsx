import { useEffect, useMemo, useState } from 'react';

import { getCurrentAddress } from '@/entities/place/api/get-current-address';
import { useNearbyPlacesQuery } from '@/entities/place/model/use-nearby-places-query';
import { MapViewer } from '@/widgets/map-viewer/ui/MapViewer';

// 서비스의 기준점이 되는 기본 위치 (예: 서울시청)
const DEFAULT_LOCATION = {
  lat: 37.5665,
  lng: 126.978,
  address: '서울특별시 중구 태평로1가 31 (기본 위치)',
};

function MapPage() {
  const [currentLocation, setCurrentLocation] = useState(DEFAULT_LOCATION);
  const [isLocating, setIsLocating] = useState(true);

  const queryParams = useMemo(
    () => ({
      lat: currentLocation.lat,
      lng: currentLocation.lng,
    }),
    [currentLocation],
  );

  const { data: places = [] } = useNearbyPlacesQuery(queryParams);

  useEffect(() => {
    if (currentLocation !== DEFAULT_LOCATION) return;
    getCurrentAddress()
      .then((info) => {
        setCurrentLocation(info);
        setIsLocating(false);
      })
      .catch((err) => {
        console.error('실제 위치를 가져올 수 없어 기본 위치를 유지합니다.', err);
        setIsLocating(false);
      });
  }, [currentLocation]);

  return (
    <div className='w-screen h-screen flex flex-col'>
      <div className='p-4 bg-white shadow-md z-10'>
        {isLocating ? (
          <span>위치 정보를 파악하고 있습니다...</span>
        ) : (
          <span>현위치: {currentLocation.address}</span>
        )}
      </div>
      <div className='flex-1'>
        <MapViewer currentLocation={currentLocation} places={places} />
      </div>
    </div>
  );
}

export default MapPage;
