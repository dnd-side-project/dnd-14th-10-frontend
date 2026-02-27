import { useQuery } from '@tanstack/react-query';

import type { PopularPlacesParams } from './place.types';
import { placeKeys } from './query-keys';
import { getPopularPlaces } from '../api/place.api';

export const usePopularPlacesQuery = (params: PopularPlacesParams, enabled = true) => {
  return useQuery({
    queryKey: placeKeys.popular(params),
    queryFn: () => getPopularPlaces(params),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};
