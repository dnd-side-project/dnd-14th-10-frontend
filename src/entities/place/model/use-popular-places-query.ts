import { useSuspenseQuery } from '@tanstack/react-query';

import type { PopularPlacesParams } from './place.types';
import { placeKeys } from './query-keys';
import { getPopularPlaces } from '../api/place.api';

export const usePopularPlacesQuery = (params: PopularPlacesParams) => {
  return useSuspenseQuery({
    queryKey: placeKeys.popular(params),
    queryFn: () => getPopularPlaces(params),
  });
};
