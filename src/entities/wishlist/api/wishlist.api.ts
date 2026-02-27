import { apiClient } from '@/shared/api/client';
import type { PagedWishlistResponse, WishlistSortType } from '@/shared/types/wishlist';

export interface GetMyWishlistsParams {
  page?: number;
  size?: number;
  sortType?: WishlistSortType;
}

export const getMyWishlists = (params: GetMyWishlistsParams = {}) => {
  const { page = 0, size = 10, sortType = 'LATEST' } = params;
  return apiClient.get<PagedWishlistResponse>('/wishlists/me', {
    params: { page, size, sortType },
  });
};

export const addWishlist = (placeId: number) => {
  return apiClient.post('/wishlists', { placeId });
};

export const removeWishlist = (placeId: number) => {
  return apiClient.delete(`/wishlists/places/${placeId}`);
};
