import { useMutation } from '@tanstack/react-query';

import { createReview } from '../api/review.api';

export const useCreateReviewMutation = () => {
  return useMutation({
    mutationFn: ({ placeId, data }: { placeId: string; data: unknown }) =>
      createReview(placeId, data),
  });
};
