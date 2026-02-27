import { apiClient } from '@/shared/api/client';

import type {
  NearbyParams,
  Place,
  PlaceDetail,
  PlaceRecommendationParams,
  PlaceReviewsResponse,
  PlaceSummaryResponse,
  RecommendedPlace,
  ReviewRatingStat,
  ReviewTagStat,
  ThemeRecommendationResponse,
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
  const { data } = await apiClient.get<ReviewRatingStat>(`/places/${placeId}/reviews/rating-stats`);
  return data;
};

// GET /api/places/recommendations/popular (인기 공간 조회)
export const getPopularPlaces = async (
  params: PlaceRecommendationParams,
): Promise<PlaceSummaryResponse[]> => {
  const { data } = await apiClient.get<PlaceSummaryResponse[]>('/places/recommendations/popular', {
    params,
  });
  return data;
};

// GET /api/places/recommendations/similar (비슷한 성향 공간 조회 - 로그인 필요)
export const getSimilarPlaces = async (
  params: PlaceRecommendationParams & { regionCode: number },
): Promise<PlaceSummaryResponse[]> => {
  const { data } = await apiClient.get<PlaceSummaryResponse[]>('/places/recommendations/similar', {
    params,
  });
  return data;
};

// GET /api/places/recommendations/random-theme (랜덤 테마 추천 - 비로그인용)
export const getRandomThemePlaces = async (
  params: PlaceRecommendationParams,
): Promise<ThemeRecommendationResponse> => {
  const { data } = await apiClient.get<ThemeRecommendationResponse>(
    '/places/recommendations/random-theme',
    { params },
  );
  return data;
};

// GET /api/places/recommendations/new (신규 공간 조회)
export const getNewPlaces = async (
  params: PlaceRecommendationParams & { regionCode: number },
): Promise<PlaceSummaryResponse[]> => {
  const { data } = await apiClient.get<PlaceSummaryResponse[]>('/places/recommendations/new', {
    params,
  });
  return data;
};
