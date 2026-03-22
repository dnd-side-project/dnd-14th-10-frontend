import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { PopularPlacesParams } from './place.types';
import { placeKeys } from './query-keys';
import { getRandomThemePlaces } from '../api/place.api';

interface Options {
  enabled?: boolean;
  keepPrevious?: boolean;
}

export const useRandomThemePlacesQuery = (params: PopularPlacesParams, options: Options | boolean = true) => {
  const { enabled = true, keepPrevious = false } = typeof options === 'boolean' ? { enabled: options } : options;

  return useQuery({
    queryKey: placeKeys.randomTheme(params),
    queryFn: () => getRandomThemePlaces(params),
    enabled,
    staleTime: 1000 * 60 * 5,
    ...(keepPrevious && { placeholderData: keepPreviousData }),
  });
};
