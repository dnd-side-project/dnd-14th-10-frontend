import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '@/features/auth/model/use-auth-store';
import { getMe } from '@/features/user/api/user.api';
import type { UserProfile } from '@/shared/types/user';

import { userKeys } from './query-keys';

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
