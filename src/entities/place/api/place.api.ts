import { apiClient } from '@/shared/api/client';

import type {
  NearbyParams,
  Place,
  PlaceDetail,
  PlaceReviewsResponse,
  RecommendedPlace,
  ReviewRatingStat,
  ReviewTagStat,
} from '../model/place.types';
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

// GET /api/places/{placeId}/reviews (리뷰 목록 조회)
export const getPlaceReviews = async (
  placeId: string,
  params: { page: number; size: number; sort?: string[] },
): Promise<PlaceReviewsResponse> => {
  const { data } = await apiClient.get<PlaceReviewsResponse>(`/places/${placeId}/reviews`, {
    params,
  });
  return data;
};

// GET /api/places/{placeId}/reviews/tag-stats (리뷰 태그 통계)
export const getReviewTagStats = async (placeId: string): Promise<ReviewTagStat[]> => {
  const { data } = await apiClient.get<ReviewTagStat[]>(`/places/${placeId}/reviews/tag-stats`);
  return data;
};

// GET /api/places/{placeId}/reviews/rating-stats (리뷰 별점 통계)
export const getReviewRatingStats = async (placeId: string): Promise<ReviewRatingStat> => {
  const { data } = await apiClient.get<ReviewRatingStat>(
    `/places/${placeId}/reviews/rating-stats`,
  );
  return data;
};
