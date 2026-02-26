interface GeocodeResult {
  latitude: number;
  longitude: number;
}

interface NaverLocalItem {
  address: string;
  roadAddress: string;
}

interface NaverLocalResponse {
  total: number;
  items: NaverLocalItem[];
}

/** 키워드 → 첫 번째 결과 주소 반환 (네이버 지역 검색 API) */
export async function localSearchAddress(query: string): Promise<string | null> {
  const params = new URLSearchParams({ query, display: '1' });
  const res = await fetch(`/naver-search/local.json?${params.toString()}`);
  if (!res.ok) return null;

  const data: NaverLocalResponse = await res.json();
  if (!data.total || !data.items.length) return null;

  const { roadAddress, address } = data.items[0];
  return roadAddress || address || null;
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
export function reverseGeocodeRegionCode(lat: number, lng: number): Promise<number> {
  return new Promise((resolve, reject) => {
    if (!window.naver?.maps?.Service) {
      return reject(new Error('Naver Maps Service를 사용할 수 없습니다.'));
    }

    const coords = new window.naver.maps.LatLng(lat, lng);

    window.naver.maps.Service.reverseGeocode({ coords }, (status, response) => {
      if (status !== window.naver.maps.Service.Status.OK) {
        return reject(new Error('역지오코딩 실패'));
      }

      const admResult = response.v2.results?.find((r) => r.name === 'admcode');
      const codeId = admResult?.code?.id;

      if (codeId === undefined) {
        reject(new Error('행정동 코드를 찾을 수 없습니다.'));
      } else {
        resolve(parseInt(codeId, 10));
      }
    });
  });
}
