import { useQuery } from '@tanstack/react-query';

import type { PlaceRecommendationParams } from './place.types';
import { placeKeys } from './query-keys';
import { getPopularPlaces } from '../api/place.api';

export const usePopularPlacesQuery = (params: PlaceRecommendationParams, enabled = true) => {
  return useQuery({
    queryKey: placeKeys.popular(params),
    queryFn: () => getPopularPlaces(params),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};
