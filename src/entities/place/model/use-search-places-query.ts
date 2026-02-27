import { useSuspenseQuery } from '@tanstack/react-query';

import type { PlaceSearchParams } from './place.types';
import { placeKeys } from './query-keys';
import { searchPlaces } from '../api/place.api';

export const useSearchPlacesQuery = (params: PlaceSearchParams) => {
  return useSuspenseQuery({
    queryKey: placeKeys.searches(params),
    queryFn: () => searchPlaces(params),
  });
};
