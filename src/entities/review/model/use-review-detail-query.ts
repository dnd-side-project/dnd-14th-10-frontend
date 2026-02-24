import { useQuery } from '@tanstack/react-query';

import { reviewKeys } from './query-keys';
import { getReview } from '../api/review.api';

export const useReviewDetailQuery = (reviewId: number) => {
  return useQuery({
    queryKey: reviewKeys.detail(reviewId),
    queryFn: async () => {
      const response = await getReview(reviewId);
      return response.data;
    },
    enabled: !!reviewId,
  });
};
