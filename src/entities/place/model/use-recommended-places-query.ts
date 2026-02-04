import { useSuspenseQuery } from '@tanstack/react-query';

import { placeKeys } from './query-keys';
import { getRecommendedPlaces } from '../api/place.api';

export const useRecommendedPlacesQuery = () => {
  return useSuspenseQuery({
    queryKey: placeKeys.recommended(),
    queryFn: getRecommendedPlaces,
  });
};
