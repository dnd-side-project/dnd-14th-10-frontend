import axios from 'axios';

import { apiClient } from '@/shared/api/client';

import type {
  PlaceRegisterRequest,
  PlaceRegisterResponse,
  PresignedUrlRequest,
  PresignedUrlResponse,
} from '../model/register-place.types';

// POST /api/places (장소 등록)
export const registerPlace = (data: PlaceRegisterRequest) => {
  return apiClient.post<PlaceRegisterResponse>('/places', data);
};

// PATCH /api/places/{place-id} (정보 수정)
export const updatePlace = (placeId: string, data: Partial<PlaceRegisterRequest>) => {
  return apiClient.patch(`/places/${placeId}`, data);
};

// POST /api/places/images/presigned-url (Presigned URL 발급)
export const getPresignedUrls = (data: PresignedUrlRequest) => {
  return apiClient.post<PresignedUrlResponse>('/places/images/presigned-url', data);
};

// Presigned URL로 이미지 업로드 (PUT)
export const uploadImageToPresignedUrl = (url: string, file: File) => {
  return axios.put(url, file, {
    headers: { 'Content-Type': file.type },
  });
};
