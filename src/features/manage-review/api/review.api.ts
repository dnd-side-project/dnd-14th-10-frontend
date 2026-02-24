import { apiClient } from '@/shared/api/client';

export interface CreateReviewRequest {
  placeId: number;
  rating: number;
  tagIds: number[];
  mood: string;
  spaceSize: string;
  outletScore: string;
  crowdStatus: string;
  content: string;
  images: { imageKey: string; sequence: number; isPrimary: boolean }[];
  visitedAt: string;
}

export interface CreateReviewResponse {
  reviewId: number;
  representativeImageUrl: string;
  reviewOrder: number;
}

// POST /api/reviews (리뷰 작성)
export const createReview = (data: CreateReviewRequest) => {
  return apiClient.post<CreateReviewResponse>('/reviews', data);
};

// PATCH /api/places/{place-id}/reviews/{review-id} (수정)
export const updateReview = (placeId: string, reviewId: string, data: unknown) => {
  return apiClient.patch(`/places/${placeId}/reviews/${reviewId}`, data);
};

// DELETE /api/places/{place-id}/reviews/{review-id} (삭제)
export const deleteReview = (placeId: string, reviewId: string) => {
  return apiClient.delete(`/places/${placeId}/reviews/${reviewId}`);
};
