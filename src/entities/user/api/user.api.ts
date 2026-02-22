import { apiClient, authClient } from '@/shared/api/client';
import type { UserProfile, WithdrawReason, WithdrawReasonItem } from '@/shared/types/user';

export interface NicknameCheckResponse {
  available: boolean;
}

export interface PresignedUrlItem {
  filename: string;
  url: string;
  objectKey: string;
}

export interface PresignedUrlResponse {
  urls: PresignedUrlItem[];
}

export const getMe = () => {
  return apiClient.get<UserProfile>('/users/me');
};

export const getUserInfo = (userId: string) => {
  return apiClient.get(`/users/${userId}`);
};

export const checkNickname = (nickname: string) => {
  return authClient.get<NicknameCheckResponse>('/users/nickname/check', {
    params: { nickname },
  });
};

export const updateNickname = (nickname: string) => {
  return apiClient.patch('/users/me/nickname', { nickname });
};

export const updateBirth = (birth: string) => {
  return apiClient.patch('/users/me/birth', { birth });
};

export const updateGender = (gender: 'MALE' | 'FEMALE') => {
  return apiClient.patch('/users/me/gender', { gender });
};

export const updateRegion = (regionCode: number) => {
  return apiClient.patch('/users/me/region', { regionCode });
};

export const updateProfileImage = (objectKey: string | null) => {
  return apiClient.patch('/users/me/profile-image', { objectKey });
};

export const getPresignedUrl = (filenames: string[]) => {
  return apiClient.post<PresignedUrlResponse>('/users/images/presigned-url', { filenames });
};

export const getWithdrawReasons = () => {
  return apiClient.get<WithdrawReasonItem[]>('/users/withdraw-reasons');
};

export const withdraw = (reason: WithdrawReason, detail?: string) => {
  return apiClient.post('/users/me/withdraw', { reason, detail });
};
