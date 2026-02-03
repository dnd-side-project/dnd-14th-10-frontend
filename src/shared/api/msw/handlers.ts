import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/places/nearby', () => {
    const mockPlaces = Array.from({ length: 100 }, (_, i) => ({
      id: String(i + 1),
      name: `카공하기 좋은 카페 ${i + 1}`,
      locationPoint: {
        lat: 37.5665 + (Math.random() - 0.5) * 0.1, // Random lat around Seoul
        lng: 126.978 + (Math.random() - 0.5) * 0.1, // Random lng around Seoul
      },
      outletScore: Math.floor(Math.random() * 5) + 1, // 1 to 5
      noiseLevel: Math.floor(Math.random() * 3) + 1, // 1 to 3
      address: `서울특별시 중구 테스트 주소 ${i + 1}`,
    }));
    return HttpResponse.json(mockPlaces);
  }),
];
