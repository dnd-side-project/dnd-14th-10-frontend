import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { PlaceDetail } from '@/entities/place/model/place.types';
import { placeKeys } from '@/entities/place/model/query-keys';

import { addWishlist, removeWishlist } from '../api/toggle-wishlist.api';

interface ToggleWishlistParams {
  placeId: number;
  isWished: boolean;
}

export const useToggleWishlistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ placeId, isWished }: ToggleWishlistParams) =>
      isWished ? removeWishlist(placeId) : addWishlist(placeId),

    onMutate: async ({ placeId, isWished }) => {
      const queryKey = placeKeys.detail(String(placeId));

      await queryClient.cancelQueries({ queryKey });

      const previousPlace = queryClient.getQueryData<PlaceDetail>(queryKey);

      if (previousPlace) {
        queryClient.setQueryData<PlaceDetail>(queryKey, {
          ...previousPlace,
          isWished: !isWished,
        });
      }

      return { previousPlace, queryKey };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousPlace) {
        queryClient.setQueryData(context.queryKey, context.previousPlace);
      }
    },

    onSettled: (_data, _error, { placeId }) => {
      queryClient.invalidateQueries({ queryKey: placeKeys.detail(String(placeId)) });
    },
  });
};
