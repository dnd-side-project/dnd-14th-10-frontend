import { Suspense, useEffect, useState } from 'react';

import { getCurrentAddress } from '@/entities/place/api/get-current-address';
// import { useNearbyPlacesQuery } from '@/entities/place/model/use-nearby-places-query';
import { geocodeAddress } from '@/features/register-place/api/geocode-place';
import { useNaverMapScript } from '@/shared/lib/naver-map/use-naver-map-script';
// import { MapViewer } from '@/widgets/map-viewer/ui/MapViewer';

// 서비스의 기준점이 되는 기본 위치 (예: 서울시청)
const DEFAULT_LOCATION = {
  lat: 37.5665,
  lng: 126.978,
  address: '서울특별시 중구 태평로1가 31 (기본 위치)',
};

type Location = {
  lat: number;
  lng: number;
  address: string;
};

function MapContent({ currentLocation }: { currentLocation: Location }) {
  // const { data: places = [] } = useNearbyPlacesQuery({
  //   lat: currentLocation.lat,
  //   lng: currentLocation.lng,
  // });

  return (
    <>
      <div className='z-10 bg-white p-4 shadow-md'>
        <span>현위치: {currentLocation.address}</span>
      </div>
      <div className='flex-1'>
        {/* <MapViewer currentLocation={currentLocation} places={places} /> */}
      </div>
    </>
  );
}

function MapPage() {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const isScriptLoaded = useNaverMapScript(import.meta.env.VITE_NAVER_CLIENT_ID);

  useEffect(
    function fetchCurrentLocation() {
      if (!isScriptLoaded) return;

      getCurrentAddress()
        .then((info) => {
          setCurrentLocation(info);
          return info.address;
        })
        .then((address) => {
          return geocodeAddress(address);
        })
        .then((coords) => {
          console.log('현재 위치의 동 위경도:', coords);
        })
        .catch((err) => {
          console.error('실제 위치를 가져올 수 없어 기본 위치를 사용합니다.', err);
          setCurrentLocation(DEFAULT_LOCATION);
        });
    },
    [isScriptLoaded],
  );

  return (
    <div className='flex h-screen w-screen flex-col'>
      {currentLocation ? (
        <Suspense
          fallback={
            <div className='z-10 bg-white p-4 shadow-md'>
              <span>주변 장소를 불러오는 중...</span>
            </div>
          }
        >
          <MapContent currentLocation={currentLocation} />
        </Suspense>
      ) : (
        <div className='z-10 bg-white p-4 shadow-md'>
          <span>위치 정보를 파악하고 있습니다...</span>
        </div>
      )}
    </div>
  );
}

export default MapPage;
