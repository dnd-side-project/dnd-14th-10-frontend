import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { reviewKeys } from './query-keys';
import { getMyReviews, deleteReview } from '../api/review.api';

export type ReviewSortType = 'latest' | 'name';

const getSortParam = (sortType: ReviewSortType): string => {
  switch (sortType) {
    case 'latest':
      return 'createdAt,desc';
    case 'name':
      return 'placeName,asc';
    default:
      return 'createdAt,desc';
  }
};

export const useMyReviewsInfiniteQuery = (sortType: ReviewSortType = 'latest') => {
  const sortParam = getSortParam(sortType);

  return useInfiniteQuery({
    queryKey: reviewKeys.myReviewsList(sortParam),
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getMyReviews({
        page: pageParam,
        size: 10,
        sort: sortParam,
      });
      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },
  });
};

export const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.myReviews() });
    },
  });
};
