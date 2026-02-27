import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import type { WishlistSortType } from '@/shared/types/wishlist';

import { wishlistKeys } from './query-keys';
import { getMyWishlists, removeWishlist } from '../api/wishlist.api';

export type { WishlistSortType } from '@/shared/types/wishlist';

export const useMyWishlistsInfiniteQuery = (sortType: WishlistSortType = 'LATEST') => {
  return useInfiniteQuery({
    queryKey: wishlistKeys.myWishlistsList(sortType),
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getMyWishlists({
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

export const useRemoveWishlistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (placeId: number) => removeWishlist(placeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.myWishlists() });
    },
  });
};
