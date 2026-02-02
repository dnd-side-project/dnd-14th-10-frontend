import { useMutation } from '@tanstack/react-query';

import { updateReview } from '../api/review.api';

export const useUpdateReviewMutation = () => {
  return useMutation({
    mutationFn: ({
      placeId,
      reviewId,
      data,
    }: {
      placeId: string;
      reviewId: string;
      data: unknown;
    }) => updateReview(placeId, reviewId, data),
  });
};
