import { useSuspenseQuery } from '@tanstack/react-query';

import type { NearbyParams } from './place.types';
import { placeKeys } from './query-keys';
import { getNearbyPlaces } from '../api/place.api';

export const useNearbyPlacesQuery = (params: NearbyParams) => {
  return useSuspenseQuery({
    queryKey: placeKeys.nearby(params),
    queryFn: () => getNearbyPlaces(params),
  });
};
