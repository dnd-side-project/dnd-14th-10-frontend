import { useInfiniteQuery, useMutation, useQueries, useQueryClient } from '@tanstack/react-query';

import { wishlistKeys } from './query-keys';
import { getMyWishlists, removeWishlist, getWishCount } from '../api/wishlist.api';

export type WishlistSortType = 'latest' | 'popularity';

const getSortParam = (sortType: WishlistSortType): string => {
  switch (sortType) {
    case 'latest':
      return 'createdAt,desc';
    case 'popularity':
      return 'wishCount,desc';
    default:
      return 'createdAt,desc';
  }
};

export const useMyWishlistsInfiniteQuery = (sortType: WishlistSortType = 'latest') => {
  const sortParam = getSortParam(sortType);

  return useInfiniteQuery({
    queryKey: wishlistKeys.myWishlistsList(sortParam),
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getMyWishlists({
        page: pageParam,
        size: 10,
        sort: sortParam,
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

export const useRemoveWishlistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (placeId: number) => removeWishlist(placeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.myWishlists() });
    },
  });
};

export const useWishCountsQueries = (placeIds: number[]) => {
  return useQueries({
    queries: placeIds.map((placeId) => ({
      queryKey: wishlistKeys.wishCount(placeId),
      queryFn: async () => {
        const response = await getWishCount(placeId);
        return { placeId, wishCount: response.data.wishCount };
      },
      staleTime: 1000 * 60 * 5,
    })),
  });
};
