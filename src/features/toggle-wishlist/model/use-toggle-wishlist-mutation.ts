import { useMutation, useQueryClient } from '@tanstack/react-query';

import type {
  PlaceSummaryResponse,
  ThemeRecommendationResponse,
} from '@/entities/place/model/place.types';
import { placeKeys } from '@/entities/place/model/query-keys';
import { addWishlist, removeWishlist } from '@/entities/wishlist/api/wishlist.api';
import { wishlistKeys } from '@/entities/wishlist/model/query-keys';

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
      await queryClient.cancelQueries({ queryKey: placeKeys.lists() });

      const updatePlaceList = (old: PlaceSummaryResponse[] | undefined) => {
        if (!old) return old;
        return old.map((place) =>
          place.id === placeId ? { ...place, isWished: !isWished } : place,
        );
      };

      const updateThemeResponse = (old: ThemeRecommendationResponse | undefined) => {
        if (!old) return old;
        return {
          ...old,
          places: old.places.map((place) =>
            place.id === placeId ? { ...place, isWished: !isWished } : place,
          ),
        };
      };

      queryClient.setQueriesData<PlaceSummaryResponse[]>(
        {
          queryKey: placeKeys.lists(),
          predicate: (query) => !query.queryKey.includes('random-theme'),
        },
        updatePlaceList,
      );

      queryClient.setQueriesData<ThemeRecommendationResponse>(
        {
          queryKey: placeKeys.lists(),
          predicate: (query) => query.queryKey.includes('random-theme'),
        },
        updateThemeResponse,
      );

      return { placeId, isWished };
    },

    onError: (_err, _variables, context) => {
      if (context) {
        const updatePlaceList = (old: PlaceSummaryResponse[] | undefined) => {
          if (!old) return old;
          return old.map((place) =>
            place.id === context.placeId ? { ...place, isWished: context.isWished } : place,
          );
        };

        const updateThemeResponse = (old: ThemeRecommendationResponse | undefined) => {
          if (!old) return old;
          return {
            ...old,
            places: old.places.map((place) =>
              place.id === context.placeId ? { ...place, isWished: context.isWished } : place,
            ),
          };
        };

        queryClient.setQueriesData<PlaceSummaryResponse[]>(
          {
            queryKey: placeKeys.lists(),
            predicate: (query) => !query.queryKey.includes('random-theme'),
          },
          updatePlaceList,
        );

        queryClient.setQueriesData<ThemeRecommendationResponse>(
          {
            queryKey: placeKeys.lists(),
            predicate: (query) => query.queryKey.includes('random-theme'),
          },
          updateThemeResponse,
        );
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.myWishlists() });
    },
  });
};
