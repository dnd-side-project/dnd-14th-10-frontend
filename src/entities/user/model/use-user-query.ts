import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '@/shared/store/use-auth-store';
import type { UserProfile } from '@/shared/types/user';

import { userKeys } from './query-keys';
import { getMe } from '../api/user.api';

export const useUserQuery = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery<UserProfile>({
    queryKey: userKeys.me(),
    queryFn: async () => {
      const response = await getMe();
      return response.data;
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
