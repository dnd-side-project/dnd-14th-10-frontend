import { apiClient } from '@/shared/api/client';

// POST /api/wishlists (찜 추가)
export const addWishlist = (placeId: number) => {
  return apiClient.post('/wishlists', { placeId });
};

// DELETE /api/wishlists/places/{placeId} (찜 삭제)
export const removeWishlist = (placeId: number) => {
  return apiClient.delete(`/wishlists/places/${placeId}`);
};
