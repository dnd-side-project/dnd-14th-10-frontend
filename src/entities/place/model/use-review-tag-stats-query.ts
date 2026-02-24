import { useSuspenseQuery } from '@tanstack/react-query';

import { placeKeys } from './query-keys';
import { getReviewTagStats } from '../api/place.api';

export const useReviewTagStatsQuery = (placeId: string) => {
  return useSuspenseQuery({
    queryKey: placeKeys.reviewTagStats(placeId),
    queryFn: () => getReviewTagStats(placeId),
  });
};
