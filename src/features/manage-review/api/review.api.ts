import { apiClient } from '@/shared/api/client';
import type { Mood, SpaceSize, OutletScore, CrowdStatus } from '@/shared/types/review';

export interface ReviewImageRequest {
  imageKey: string;
  sequence: number;
  isPrimary: boolean;
}

export interface CreateReviewRequest {
  placeId: number;
  rating: number;
  tagIds: number[];
  mood: string;
  spaceSize: string;
  outletScore: string;
  crowdStatus: string;
  content: string;
  images: ReviewImageRequest[];
  visitedAt: string;
}

export interface CreateReviewResponse {
  reviewId: number;
  representativeImageUrl: string;
  reviewOrder: number;
}

export interface UpdateReviewRequest {
  rating: number;
  tagIds: number[];
  mood: Mood;
  spaceSize: SpaceSize;
  outletScore: OutletScore;
  crowdStatus: CrowdStatus;
  content: string;
  images: ReviewImageRequest[];
  visitedAt: string;
}

export const createReview = (data: CreateReviewRequest) => {
  return apiClient.post<CreateReviewResponse>('/reviews', data);
};

export const updateReview = (reviewId: number, data: UpdateReviewRequest) => {
  return apiClient.patch(`/reviews/${reviewId}`, data);
};
