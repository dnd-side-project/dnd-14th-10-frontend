import { apiClient } from '@/shared/api/client';

import type { NearbyParams, Place, PlaceDetail, RecommendedPlace } from '../model/place.types';
export type { Review, ReviewTag } from '../model/place.types';

// GET /api/places/{place-id} (상세 조회)
export const getPlaceDetail = async (placeId: string): Promise<PlaceDetail> => {
  const { data } = await apiClient.get<PlaceDetail>(`/places/${placeId}`);
  return data;
};

// GET /api/places (필터 검색)
export const searchPlaces = (params: unknown) => {
  return apiClient.get('/places', { params });
};

// GET /api/places/nearby (주변 조회)
export const getNearbyPlaces = async (params: NearbyParams): Promise<Place[]> => {
  const { data } = await apiClient.get<Place[]>('/places/nearby', { params });
  return data;
};

// GET /api/places/recommend (추천 조회)
export const getRecommendedPlaces = async (): Promise<RecommendedPlace[]> => {
  const { data } = await apiClient.get<RecommendedPlace[]>('/places/recommend');
  return data;
};
