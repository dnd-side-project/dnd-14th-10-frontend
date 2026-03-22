import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { SimilarPlacesParams } from './place.types';
import { placeKeys } from './query-keys';
import { getSimilarPlaces } from '../api/place.api';

interface Options {
  enabled?: boolean;
  keepPrevious?: boolean;
}

export const useSimilarPlacesQuery = (params: SimilarPlacesParams, options: Options | boolean = true) => {
  const { enabled = true, keepPrevious = false } = typeof options === 'boolean' ? { enabled: options } : options;

  return useQuery({
    queryKey: placeKeys.similar(params),
    queryFn: () => getSimilarPlaces(params),
    enabled,
    staleTime: 1000 * 60 * 5,
    ...(keepPrevious && { placeholderData: keepPreviousData }),
  });
};
