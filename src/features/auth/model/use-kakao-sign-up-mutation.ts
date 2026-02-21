import { useMutation } from '@tanstack/react-query';

import { kakaoSignUp, type SignupRequest } from '../api/auth.api';

export const useKakaoSignUpMutation = () => {
  return useMutation({
    mutationFn: (data: SignupRequest) => kakaoSignUp(data),
  });
};
