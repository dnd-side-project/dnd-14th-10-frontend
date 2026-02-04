import { useSuspenseQuery } from '@tanstack/react-query';

import { userKeys } from './query-keys.ts';
import { getMyBadges } from '../api/user.api';

export const useMyBadgesQuery = () => {
  return useSuspenseQuery({
    queryKey: userKeys.badges(),
    queryFn: getMyBadges,
  });
};
