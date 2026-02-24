import { useSuspenseQuery } from '@tanstack/react-query';

import { placeKeys } from './query-keys';
import { getReviewRatingStats } from '../api/place.api';

export const useReviewRatingStatsQuery = (placeId: string) => {
  return useSuspenseQuery({
    queryKey: placeKeys.reviewRatingStats(placeId),
    queryFn: () => getReviewRatingStats(placeId),
  });
};
