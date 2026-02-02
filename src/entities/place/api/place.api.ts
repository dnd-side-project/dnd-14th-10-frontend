import { apiClient } from '@/shared/api/client';

// GET /api/places/{place-id} (상세 조회)
export const getPlaceDetail = (placeId: string) => {
  return apiClient.get(`/places/${placeId}`);
};

// GET /api/places (필터 검색)
export const searchPlaces = (params: unknown) => {
  return apiClient.get('/places', { params });
};

// GET /api/places/nearby (주변 조회)
export const getNearbyPlaces = (params: unknown) => {
  return apiClient.get('/places/nearby', { params });
};

// GET /api/places/recommend (추천 조회)
export const getRecommendedPlaces = () => {
  return apiClient.get('/places/recommend');
};

