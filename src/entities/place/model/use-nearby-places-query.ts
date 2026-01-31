import { useSuspenseQuery } from '@tanstack/react-query';

import { placeKeys } from './query-keys';
import { getNearbyPlaces } from '../api/place.api';

export const useNearbyPlacesQuery = (params: unknown) => {
  return useSuspenseQuery({
    queryKey: placeKeys.nearby(params),
    queryFn: () => getNearbyPlaces(params),
  });
};
