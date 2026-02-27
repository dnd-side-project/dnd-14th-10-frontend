export const placeKeys = {
  all: ['places'] as const,
  detail: (placeId: string) => [...placeKeys.all, 'detail', placeId] as const,
  lists: () => [...placeKeys.all, 'list'] as const,
  searches: (params: unknown) => [...placeKeys.lists(), 'search', params] as const,
  nearby: (params: unknown) => [...placeKeys.lists(), 'nearby', params] as const,
  recommended: () => [...placeKeys.lists(), 'recommended'] as const,
  popular: (params: unknown) => [...placeKeys.lists(), 'popular', params] as const,
  similar: (params: unknown) => [...placeKeys.lists(), 'similar', params] as const,
  new: (params: unknown) => [...placeKeys.lists(), 'new', params] as const,
  randomTheme: (params: unknown) => [...placeKeys.lists(), 'random-theme', params] as const,
  batch: (ids: number[]) => [...placeKeys.lists(), 'batch', ids] as const,
  reviews: (placeId: string, page: number) => [...placeKeys.all, 'reviews', placeId, page] as const,
  reviewTagStats: (placeId: string) => [...placeKeys.all, 'reviews', 'tag-stats', placeId] as const,
  reviewRatingStats: (placeId: string) =>
    [...placeKeys.all, 'reviews', 'rating-stats', placeId] as const,
};
