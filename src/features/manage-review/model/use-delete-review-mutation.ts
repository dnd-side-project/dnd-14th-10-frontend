import { useMutation } from '@tanstack/react-query';

import { deleteReview } from '../api/review.api';

export const useDeleteReviewMutation = () => {
  return useMutation({
    mutationFn: ({ placeId, reviewId }: { placeId: string; reviewId: string }) =>
      deleteReview(placeId, reviewId),
  });
};
