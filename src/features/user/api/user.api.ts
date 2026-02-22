import { apiClient, authClient } from '@/shared/api/client';
import type { UserProfile } from '@/shared/types/user';

export const getMe = () => {
  return apiClient.get<UserProfile>('/users/me');
};

export interface NicknameCheckResponse {
  available: boolean;
}

export const checkNickname = (nickname: string) => {
  return authClient.get<NicknameCheckResponse>('/users/nickname/check', {
    params: { nickname },
  });
};
