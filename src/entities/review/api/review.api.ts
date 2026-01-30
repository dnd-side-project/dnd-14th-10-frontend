import { apiClient } from '@/shared/api/client';

// POST /api/places/{place-id}/reviews (리뷰 등록)
export const createReview = (placeId: string, data: unknown) => {
  return apiClient.post(`/places/${placeId}/reviews`, data);
};

// PATCH /api/places/{place-id}/reviews/{review-id} (수정)
export const updateReview = (placeId: string, reviewId: string, data: unknown) => {
  return apiClient.patch(`/places/${placeId}/reviews/${reviewId}`, data);
};

// DELETE /api/places/{place-id}/reviews/{review-id} (삭제)
export const deleteReview = (placeId: string, reviewId: string) => {
  return apiClient.delete(`/places/${placeId}/reviews/${reviewId}`);
};
