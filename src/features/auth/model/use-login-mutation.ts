import { useMutation } from '@tanstack/react-query';

import { login, type OAuthRequest } from '../api/auth.api';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: OAuthRequest) => login(data),
  });
};
