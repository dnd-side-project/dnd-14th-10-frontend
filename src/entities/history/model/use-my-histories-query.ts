import { useQuery } from '@tanstack/react-query';

import { historyKeys } from './query-keys';
import { getMyHistories } from '../api/history.api';

export const useMyHistoriesQuery = (size: number = 10) => {
  return useQuery({
    queryKey: [...historyKeys.myHistories(), size],
    queryFn: async () => {
      const response = await getMyHistories({ page: 0, size });
      return response.data;
    },
  });
};
