import { useQuery } from '@tanstack/react-query';

import type { SimilarPlacesParams } from './place.types';
import { placeKeys } from './query-keys';
import { getSimilarPlaces } from '../api/place.api';

export const useSimilarPlacesQuery = (params: SimilarPlacesParams, enabled = true) => {
  return useQuery({
    queryKey: placeKeys.similar(params),
    queryFn: () => getSimilarPlaces(params),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};
