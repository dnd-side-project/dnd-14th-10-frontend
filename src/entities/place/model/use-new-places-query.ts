import { useQuery } from '@tanstack/react-query';

import type { PlaceRecommendationParams } from './place.types';
import { placeKeys } from './query-keys';
import { getNewPlaces } from '../api/place.api';

type NewPlacesParams = PlaceRecommendationParams & { regionCode: number };

export const useNewPlacesQuery = (params: NewPlacesParams, enabled = true) => {
  return useQuery({
    queryKey: placeKeys.new(params),
    queryFn: () => getNewPlaces(params),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};
