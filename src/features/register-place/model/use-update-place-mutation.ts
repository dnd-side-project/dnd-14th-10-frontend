import { useMutation } from '@tanstack/react-query';

import { updatePlace } from '../api/register-place.api';

export const useUpdatePlaceMutation = () => {
  return useMutation({
    mutationFn: ({ placeId, data }: { placeId: string; data: unknown }) =>
      updatePlace(placeId, data),
  });
};
