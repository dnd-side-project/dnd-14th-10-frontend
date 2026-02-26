import { apiClient } from '@/shared/api/client';

export const deletePlace = (placeId: number) => {
  return apiClient.delete(`/places/${placeId}`);
};
