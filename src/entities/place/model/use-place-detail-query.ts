import { useSuspenseQuery } from '@tanstack/react-query';

import { placeKeys } from './query-keys';
import { getPlaceDetail } from '../api/place.api';

export const usePlaceDetailQuery = (placeId: string) => {
  return useSuspenseQuery({
    queryKey: placeKeys.detail(placeId),
    queryFn: async () => {
      const result = await getPlaceDetail(placeId);
      return result;
    },
  });
};
