import { apiClient } from '@/shared/api/client';

// POST /api/places (장소 등록)
export const registerPlace = (data: unknown) => {
  return apiClient.post('/places', data);
};

// PATCH /api/places/{place-id} (정보 수정)
export const updatePlace = (placeId: string, data: unknown) => {
  return apiClient.patch(`/places/${placeId}`, data);
};
