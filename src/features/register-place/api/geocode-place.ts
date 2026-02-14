interface GeocodeResult {
  latitude: number;
  longitude: number;
}

/** 주소 → 좌표 변환 (geocode) */
export function geocodeAddress(address: string): Promise<GeocodeResult> {
  return new Promise((resolve, reject) => {
    if (!window.naver?.maps?.Service) {
      return reject(new Error('Naver Maps Service를 사용할 수 없습니다.'));
    }

    window.naver.maps.Service.geocode({ query: address }, (status, response) => {
      if (status !== window.naver.maps.Service.Status.OK || !response.v2.addresses.length) {
        return reject(new Error('좌표 조회 실패'));
      }

      const addr = response.v2.addresses[0];
      const latitude = parseFloat(addr.y);
      const longitude = parseFloat(addr.x);

      if (isNaN(latitude) || isNaN(longitude)) {
        return reject(new Error('유효하지 않은 좌표'));
      }

      resolve({ latitude, longitude });
    });
  });
}

/** 좌표 → 행정동 코드 조회 (reverse geocode) */
export function reverseGeocodeRegionCode(lat: number, lng: number): Promise<number | undefined> {
  return new Promise((resolve) => {
    if (!window.naver?.maps?.Service) {
      return resolve(undefined);
    }

    const coords = new window.naver.maps.LatLng(lat, lng);

    window.naver.maps.Service.reverseGeocode({ coords }, (status, response) => {
      if (status !== window.naver.maps.Service.Status.OK) {
        return resolve(undefined);
      }

      const admResult = response.v2.results?.find((r) => r.name === 'admcode');
      const codeId = admResult?.code?.id;

      resolve(codeId ? parseInt(codeId, 10) || undefined : undefined);
    });
  });
}
