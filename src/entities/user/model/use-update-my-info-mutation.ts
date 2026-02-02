import { useMutation } from '@tanstack/react-query';

import { updateMyInfo } from '../api/user.api';

export const useUpdateMyInfoMutation = () => {
  return useMutation({
    mutationFn: (data: unknown) => updateMyInfo(data),
  });
};
