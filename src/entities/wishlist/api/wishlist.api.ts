import { apiClient } from '@/shared/api/client';
import type { PagedWishlistResponse, WishCountResponse } from '@/shared/types/wishlist';

export interface GetMyWishlistsParams {
  page?: number;
  size?: number;
  sort?: string;
}

export const getMyWishlists = (params: GetMyWishlistsParams = {}) => {
  const { page = 0, size = 10, sort = 'createdAt,desc' } = params;
  return apiClient.get<PagedWishlistResponse>('/wishlists/me', {
    params: { page, size, sort },
  });
};

export const removeWishlist = (placeId: number) => {
  return apiClient.delete(`/wishlists/places/${placeId}`);
};

export const getWishCount = (placeId: number) => {
  return apiClient.get<WishCountResponse>(`/places/${placeId}/wish-count`);
};
