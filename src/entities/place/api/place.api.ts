import { apiClient } from '@/shared/api/client';

// GET /api/places/{place-id} (상세 조회)
export const getPlaceDetail = (placeId: string) => {
  return apiClient.get(`/places/${placeId}`);
};

// GET /api/places (필터 검색)
export const searchPlaces = (params: unknown) => {
  return apiClient.get('/places', { params });
};

export interface NearbyParams {
  lat: number;
  lng: number;
  radius?: number; // 미터 단위 반경
}

export interface Place {
  id: string;
  name: string;
  locationPoint: { lat: number; lng: number };
  outletScore: number;
  noiseLevel: number;
  address: string;
}

// GET /api/places/nearby (주변 조회)
export const getNearbyPlaces = async (params: NearbyParams): Promise<Place[]> => {
  const { data } = await apiClient.get<Place[]>('/places/nearby', { params });
  return data;
};

export interface RecommendedPlace {
  id: string;
  name: string;
  location: string;
  likeCount: number;
  tags: string[];
  images: string[];
}

// GET /api/places/recommend (추천 조회)
export const getRecommendedPlaces = async (): Promise<RecommendedPlace[]> => {
  const { data } = await apiClient.get<RecommendedPlace[]>('/places/recommend');
  return data;
};
