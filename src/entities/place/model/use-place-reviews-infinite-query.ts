import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { placeKeys } from './query-keys';
import { getPlaceReviews } from '../api/place.api';

const PAGE_SIZE = 10;

export const usePlaceReviewsInfiniteQuery = (placeId: string) => {
  return useSuspenseInfiniteQuery({
    queryKey: [...placeKeys.all, 'reviews-infinite', placeId],
    queryFn: ({ pageParam }) => getPlaceReviews(placeId, { page: pageParam, size: PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
  });
};
