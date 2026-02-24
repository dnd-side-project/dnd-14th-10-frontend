import { apiClient } from '@/shared/api/client';

// POST /api/wishlists (찜 추가)
export const toggleWishlist = (placeId: number) => {
  return apiClient.post('/wishlists', { placeId });
};
