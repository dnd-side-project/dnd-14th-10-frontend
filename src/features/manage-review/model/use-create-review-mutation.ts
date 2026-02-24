import { useMutation } from '@tanstack/react-query';

import type { CreateReviewRequest } from '../api/review.api';
import { createReview } from '../api/review.api';

export const useCreateReviewMutation = () => {
  return useMutation({
    mutationFn: (data: CreateReviewRequest) => createReview(data),
  });
};
