import { useMutation, useQueryClient } from '@tanstack/react-query';

import { placeKeys } from './place-query-keys';
import { deletePlace } from '../api/delete-place.api';

export const useDeletePlaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (placeId: number) => deletePlace(placeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: placeKeys.myPlaces() });
    },
  });
};
