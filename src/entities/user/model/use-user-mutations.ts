import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userKeys } from './query-keys';
import {
  updateNickname,
  updateBirth,
  updateGender,
  updateRegion,
  updateProfileImage,
  getPresignedUrl,
  withdraw,
} from '../api/user.api';

export const useUpdateNicknameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nickname: string) => updateNickname(nickname),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
};

export const useUpdateBirthMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (birth: string) => updateBirth(birth),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
};

export const useUpdateGenderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gender: 'MALE' | 'FEMALE') => updateGender(gender),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
};

export const useUpdateRegionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (regionCode: number) => updateRegion(regionCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
};

export const useUpdateProfileImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (objectKey: string | null) => updateProfileImage(objectKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
};

export const useGetPresignedUrlMutation = () => {
  return useMutation({
    mutationFn: (filenames: string[]) => getPresignedUrl(filenames),
  });
};

export const useWithdrawMutation = () => {
  return useMutation({
    mutationFn: ({
      reason,
      detail,
    }: {
      reason: 'LOW_USAGE' | 'PRIVACY_CONCERN' | 'OTHER';
      detail?: string;
    }) => withdraw(reason, detail),
  });
};
