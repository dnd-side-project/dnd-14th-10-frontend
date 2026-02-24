import { useSuspenseQuery } from '@tanstack/react-query';

import type { SimilarPlacesParams } from './place.types';
import { placeKeys } from './query-keys';
import { getSimilarPlaces } from '../api/place.api';

export const useSimilarPlacesQuery = (params: SimilarPlacesParams) => {
  return useSuspenseQuery({
    queryKey: placeKeys.similar(params),
    queryFn: () => getSimilarPlaces(params),
  });
};
