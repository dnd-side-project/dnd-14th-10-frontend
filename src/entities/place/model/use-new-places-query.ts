import { useSuspenseQuery } from '@tanstack/react-query';

import type { SimilarPlacesParams } from './place.types';
import { placeKeys } from './query-keys';
import { getNewPlaces } from '../api/place.api';

export const useNewPlacesQuery = (params: SimilarPlacesParams) => {
  return useSuspenseQuery({
    queryKey: placeKeys.new(params),
    queryFn: () => getNewPlaces(params),
  });
};
