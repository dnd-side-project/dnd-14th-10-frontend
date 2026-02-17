import { useMutation } from '@tanstack/react-query';

import type { PlaceRegisterRequest } from './register-place.types';
import { updatePlace } from '../api/register-place.api';

export const useUpdatePlaceMutation = () => {
  return useMutation({
    mutationFn: ({ placeId, data }: { placeId: string; data: Partial<PlaceRegisterRequest> }) =>
      updatePlace(placeId, data),
  });
};
