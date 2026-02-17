import { useMutation } from '@tanstack/react-query';

import type { PlaceRegisterRequest } from './register-place.types';
import { registerPlace } from '../api/register-place.api';

export const useRegisterPlaceMutation = () => {
  return useMutation({
    mutationFn: (data: PlaceRegisterRequest) => registerPlace(data),
  });
};
