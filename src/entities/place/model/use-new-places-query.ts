import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { SimilarPlacesParams } from './place.types';
import { placeKeys } from './query-keys';
import { getNewPlaces } from '../api/place.api';

interface Options {
  enabled?: boolean;
  keepPrevious?: boolean;
}

export const useNewPlacesQuery = (params: SimilarPlacesParams, options: Options | boolean = true) => {
  const { enabled = true, keepPrevious = false } = typeof options === 'boolean' ? { enabled: options } : options;

  return useQuery({
    queryKey: placeKeys.new(params),
    queryFn: () => getNewPlaces(params),
    enabled,
    staleTime: 1000 * 60 * 5,
    ...(keepPrevious && { placeholderData: keepPreviousData }),
  });
};
