import { useQuery } from '@tanstack/react-query';

import type { PopularPlacesParams } from './place.types';
import { placeKeys } from './query-keys';
import { getRandomThemePlaces } from '../api/place.api';

export const useRandomThemePlacesQuery = (params: PopularPlacesParams, enabled = true) => {
  return useQuery({
    queryKey: placeKeys.randomTheme(params),
    queryFn: () => getRandomThemePlaces(params),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};
