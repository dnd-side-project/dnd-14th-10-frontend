import { apiClient } from '@/shared/api/client';
import type { UserProfile } from '@/shared/types/user';

export const getMe = () => {
  return apiClient.get<UserProfile>('/users/me');
};
