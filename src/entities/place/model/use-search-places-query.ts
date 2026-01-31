import { useSuspenseQuery } from '@tanstack/react-query';

import { placeKeys } from './query-keys';
import { searchPlaces } from '../api/place.api';

export const useSearchPlacesQuery = (params: unknown) => {
  return useSuspenseQuery({
    queryKey: placeKeys.searches(params),
    queryFn: () => searchPlaces(params),
  });
};
