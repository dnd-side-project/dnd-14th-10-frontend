import { useSuspenseQuery } from '@tanstack/react-query';

import { userKeys } from './query-keys.ts';
import { getUserInfo } from '../api/user.api';

export const useUserInfoQuery = (userId: string) => {
  return useSuspenseQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUserInfo(userId),
  });
};
