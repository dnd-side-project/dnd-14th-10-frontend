import { useMutation, useQueryClient } from '@tanstack/react-query';

import { reviewKeys } from '@/entities/review/model/query-keys';

import type { UpdateReviewRequest } from '../api/review.api';
import { updateReview } from '../api/review.api';

export const useUpdateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, data }: { reviewId: number; data: UpdateReviewRequest }) =>
      updateReview(reviewId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.myReviews() });
      queryClient.invalidateQueries({ queryKey: reviewKeys.detail(variables.reviewId) });
    },
  });
};
