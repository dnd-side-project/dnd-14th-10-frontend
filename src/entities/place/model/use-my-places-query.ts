import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

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

export const useMyPlacesInfiniteQuery = (sortType: PlaceSortType = 'LATEST') => {
  return useInfiniteQuery({
    queryKey: placeKeys.myPlacesInfinite(sortType),
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getMyPlaces({
        page: pageParam,
        size: 10,
        sortType,
      });
      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },
  });
};
