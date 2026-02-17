import { apiClient } from '@/shared/api/client';

import type { PlaceRegisterRequest, PlaceRegisterResponse } from '../model/register-place.types';

// POST /api/places (장소 등록)
export const registerPlace = (data: PlaceRegisterRequest) => {
  return apiClient.post<PlaceRegisterResponse>('/places', data);
};

// PATCH /api/places/{place-id} (정보 수정)
export const updatePlace = (placeId: string, data: Partial<PlaceRegisterRequest>) => {
  return apiClient.patch(`/places/${placeId}`, data);
};
