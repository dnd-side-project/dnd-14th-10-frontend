import { useSuspenseQuery } from '@tanstack/react-query';

import { placeKeys } from './query-keys';
import { getPlaceReviews } from '../api/place.api';

export const usePlaceReviewsQuery = (
  placeId: string,
  params: { page: number; size: number; sort?: string[] },
) => {
  return useSuspenseQuery({
    queryKey: [...placeKeys.reviews(placeId, params.page), params],
    queryFn: () => getPlaceReviews(placeId, params),
  });
};
