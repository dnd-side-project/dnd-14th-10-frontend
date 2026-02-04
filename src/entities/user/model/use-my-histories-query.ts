import { useSuspenseQuery } from '@tanstack/react-query';

import { userKeys } from './query-keys.ts';
import { getMyHistories } from '../api/user.api';

export const useMyHistoriesQuery = () => {
  return useSuspenseQuery({
    queryKey: userKeys.histories(),
    queryFn: getMyHistories,
  });
};
