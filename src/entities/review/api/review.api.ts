import { apiClient } from '@/shared/api/client';
import type { PagedReviewResponse } from '@/shared/types/review';

export interface GetMyReviewsParams {
  page?: number;
  size?: number;
  sort?: string;
}

export const getMyReviews = (params: GetMyReviewsParams = {}) => {
  const { page = 0, size = 10, sort = 'createdAt,desc' } = params;
  return apiClient.get<PagedReviewResponse>('/reviews/me', {
    params: { page, size, sort },
  });
};

export const deleteReview = (reviewId: number) => {
  return apiClient.delete(`/reviews/${reviewId}`);
};
