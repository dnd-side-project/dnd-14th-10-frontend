import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { placeKeys } from './query-keys';
import { getBatchPlaces } from '../api/place.api';

export const useBatchPlacesQuery = (ids: number[]) => {
  return useQuery({
    queryKey: placeKeys.batch(ids),
    queryFn: () => getBatchPlaces(ids),
    enabled: ids.length > 0,
    placeholderData: keepPreviousData,
  });
};
