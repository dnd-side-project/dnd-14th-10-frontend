import { useQuery } from '@tanstack/react-query';

import { badgeKeys } from './query-keys';
import { getBadgeProgress } from '../api/badge.api';

export const useBadgeProgressQuery = () => {
  return useQuery({
    queryKey: badgeKeys.progress(),
    queryFn: async () => {
      const response = await getBadgeProgress();
      return response.data;
    },
  });
};
