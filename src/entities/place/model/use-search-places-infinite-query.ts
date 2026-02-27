import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import type { PlaceSearchParams } from './place.types';
import { placeKeys } from './query-keys';
import { searchPlaces } from '../api/place.api';

type SearchBaseParams = Omit<PlaceSearchParams, 'lastDistance'>;

export const useSearchPlacesInfiniteQuery = (params: SearchBaseParams) => {
  return useSuspenseInfiniteQuery({
    queryKey: placeKeys.searches(params),
    queryFn: ({ pageParam }) =>
      searchPlaces({ ...params, lastDistance: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.lastDistance : undefined),
  });
};
