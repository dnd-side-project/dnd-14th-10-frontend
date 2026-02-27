import { useQuery } from '@tanstack/react-query';

import { placeKeys } from './place-query-keys';
import { getMyPlaces, type PlaceSortType } from '../api/my-places.api';

export const useMyPlacesQuery = (sortType: PlaceSortType = 'LATEST', size: number = 10) => {
  return useQuery({
    queryKey: placeKeys.myPlacesList(sortType, size),
    queryFn: async () => {
      const response = await getMyPlaces({ page: 0, size, sortType });
      return response.data;
    },
  });
};
