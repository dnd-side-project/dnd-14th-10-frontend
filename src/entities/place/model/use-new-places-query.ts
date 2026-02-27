import { useQuery } from '@tanstack/react-query';

import type { SimilarPlacesParams } from './place.types';
import { placeKeys } from './query-keys';
import { getNewPlaces } from '../api/place.api';

export const useNewPlacesQuery = (params: SimilarPlacesParams, enabled = true) => {
  return useQuery({
    queryKey: placeKeys.new(params),
    queryFn: () => getNewPlaces(params),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};
