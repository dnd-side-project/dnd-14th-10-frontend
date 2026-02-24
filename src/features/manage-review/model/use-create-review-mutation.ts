import { useMutation, useQueryClient } from '@tanstack/react-query';

import { reviewKeys } from '@/entities/review/model/query-keys';
import { userKeys } from '@/entities/user/model/query-keys';

import type { CreateReviewRequest } from '../api/review.api';
import { createReview } from '../api/review.api';

export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewRequest) => createReview(data),
    onSuccess: () => {
      // MY 페이지의 리뷰 개수 업데이트를 위해 user 캐시 무효화
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
      // 리뷰 히스토리 페이지의 리뷰 목록 업데이트를 위해 reviews 캐시 무효화
      queryClient.invalidateQueries({ queryKey: reviewKeys.myReviews() });
    },
  });
};
