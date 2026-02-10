import { useSuspenseQuery } from '@tanstack/react-query';

import { placeKeys } from './query-keys';
import { getNearbyPlaces, type NearbyParams } from '../api/place.api';

export const useNearbyPlacesQuery = (params: NearbyParams) => {
  return useSuspenseQuery({
    queryKey: placeKeys.nearby(params),
    queryFn: () => getNearbyPlaces(params),
  });
};
