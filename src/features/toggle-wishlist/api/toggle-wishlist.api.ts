import { apiClient } from '@/shared/api/client';

// POST /api/places/{place-id}/wish (찜하기 토글)
export const toggleWishlist = (placeId: string) => {
  return apiClient.post(`/places/${placeId}/wish`);
};
