import type { PlaceRecommendationParams } from './place.types';

export const placeKeys = {
  all: ['places'] as const,
  detail: (placeId: string) => [...placeKeys.all, 'detail', placeId] as const,
  lists: () => [...placeKeys.all, 'list'] as const,
  searches: (params: unknown) => [...placeKeys.lists(), 'search', params] as const,
  nearby: (params: unknown) => [...placeKeys.lists(), 'nearby', params] as const,
  recommended: () => [...placeKeys.lists(), 'recommended'] as const,
  reviews: (placeId: string, page: number) => [...placeKeys.all, 'reviews', placeId, page] as const,
  reviewTagStats: (placeId: string) => [...placeKeys.all, 'reviews', 'tag-stats', placeId] as const,
  reviewRatingStats: (placeId: string) =>
    [...placeKeys.all, 'reviews', 'rating-stats', placeId] as const,

  // 홈 화면 추천 관련 키
  popular: (params: PlaceRecommendationParams) =>
    [...placeKeys.lists(), 'popular', params] as const,
  similar: (params: PlaceRecommendationParams & { regionCode: number }) =>
    [...placeKeys.lists(), 'similar', params] as const,
  randomTheme: (params: PlaceRecommendationParams) =>
    [...placeKeys.lists(), 'random-theme', params] as const,
  new: (params: PlaceRecommendationParams & { regionCode: number }) =>
    [...placeKeys.lists(), 'new', params] as const,
};
