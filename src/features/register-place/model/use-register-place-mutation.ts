import { useMutation } from '@tanstack/react-query';

import { registerPlace } from '../api/register-place.api';

export const useRegisterPlaceMutation = () => {
  return useMutation({
    mutationFn: (data: unknown) => registerPlace(data),
  });
};
