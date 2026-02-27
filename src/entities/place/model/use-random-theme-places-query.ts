import { useSuspenseQuery } from '@tanstack/react-query';

import type { PopularPlacesParams } from './place.types';
import { placeKeys } from './query-keys';
import { getRandomThemePlaces } from '../api/place.api';

export const useRandomThemePlacesQuery = (params: PopularPlacesParams) => {
  return useSuspenseQuery({
    queryKey: placeKeys.randomTheme(params),
    queryFn: async () => {
      const response = await getRandomThemePlaces(params);
      return response.places;
    },
  });
};
