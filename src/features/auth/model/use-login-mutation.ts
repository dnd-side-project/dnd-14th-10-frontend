import { useMutation } from '@tanstack/react-query';

import { login } from '../api/auth.api';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: unknown) => login(data),
  });
};
