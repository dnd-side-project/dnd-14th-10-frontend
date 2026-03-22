import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { PopularPlacesParams } from './place.types';
import { placeKeys } from './query-keys';
import { getPopularPlaces } from '../api/place.api';

interface Options {
  enabled?: boolean;
  keepPrevious?: boolean;
}

export const usePopularPlacesQuery = (params: PopularPlacesParams, options: Options | boolean = true) => {
  const { enabled = true, keepPrevious = false } = typeof options === 'boolean' ? { enabled: options } : options;

  return useQuery({
    queryKey: placeKeys.popular(params),
    queryFn: () => getPopularPlaces(params),
    enabled,
    staleTime: 1000 * 60 * 5,
    ...(keepPrevious && { placeholderData: keepPreviousData }),
  });
};
