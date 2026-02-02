import { useMutation } from '@tanstack/react-query';

import { kakaoSignUp } from '../api/auth.api';

export const useKakaoSignUpMutation = () => {
  return useMutation({
    mutationFn: (data: unknown) => kakaoSignUp(data),
  });
};
