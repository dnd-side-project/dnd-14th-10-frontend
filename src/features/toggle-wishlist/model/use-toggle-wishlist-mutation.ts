import { useMutation, useQueryClient } from '@tanstack/react-query';

import type {
  PlaceDetail,
  PlaceRecommendation,
  PlaceRecommendationResponse,
} from '@/entities/place/model/place.types';
import { placeKeys } from '@/entities/place/model/query-keys';
import { addWishlist, removeWishlist } from '@/entities/wishlist/api/wishlist.api';
import { wishlistKeys } from '@/entities/wishlist/model/query-keys';
import { useAuthStore } from '@/shared/store/use-auth-store';

interface ToggleWishlistParams {
  placeId: number;
  isWished: boolean;
}

export const useToggleWishlistMutation = () => {
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useMutation({
    mutationFn: ({ placeId, isWished }: ToggleWishlistParams) =>
      isWished ? removeWishlist(placeId) : addWishlist(placeId),

    onMutate: async ({ placeId, isWished }) => {
      await queryClient.cancelQueries({ queryKey: placeKeys.lists() });
      await queryClient.cancelQueries({ queryKey: placeKeys.detail(String(placeId)) });

      const updatePlaceList = (old: PlaceRecommendation[] | undefined) => {
        if (!old) return old;
        return old.map((place) =>
          place.id === placeId ? { ...place, isWished: !isWished } : place,
        );
      };

      const updateThemeResponse = (old: PlaceRecommendationResponse | undefined) => {
        if (!old) return old;
        return {
          ...old,
          places: old.places.map((place) =>
            place.id === placeId ? { ...place, isWished: !isWished } : place,
          ),
        };
      };

      queryClient.setQueriesData<PlaceRecommendation[]>(
        {
          queryKey: placeKeys.lists(),
          predicate: (query) => !query.queryKey.includes('random-theme'),
        },
        updatePlaceList,
      );

      queryClient.setQueriesData<PlaceRecommendationResponse>(
        {
          queryKey: placeKeys.lists(),
          predicate: (query) => query.queryKey.includes('random-theme'),
        },
        updateThemeResponse,
      );

      const detailQueryKey = placeKeys.detail(String(placeId));
      const previousDetail = queryClient.getQueryData<PlaceDetail>(detailQueryKey);

      if (previousDetail) {
        queryClient.setQueryData<PlaceDetail>(detailQueryKey, {
          ...previousDetail,
          isWished: !isWished,
        });
      }

      return { placeId, isWished, previousDetail };
    },

    onError: (_err, _variables, context) => {
      if (context) {
        const updatePlaceList = (old: PlaceRecommendation[] | undefined) => {
          if (!old) return old;
          return old.map((place) =>
            place.id === context.placeId ? { ...place, isWished: context.isWished } : place,
          );
        };

        const updateThemeResponse = (old: PlaceRecommendationResponse | undefined) => {
          if (!old) return old;
          return {
            ...old,
            places: old.places.map((place) =>
              place.id === context.placeId ? { ...place, isWished: context.isWished } : place,
            ),
          };
        };

        queryClient.setQueriesData<PlaceRecommendation[]>(
          {
            queryKey: placeKeys.lists(),
            predicate: (query) => !query.queryKey.includes('random-theme'),
          },
          updatePlaceList,
        );

        queryClient.setQueriesData<PlaceRecommendationResponse>(
          {
            queryKey: placeKeys.lists(),
            predicate: (query) => query.queryKey.includes('random-theme'),
          },
          updateThemeResponse,
        );

        if (context.previousDetail) {
          queryClient.setQueryData(placeKeys.detail(String(context.placeId)), context.previousDetail);
        }
      }
    },

    onSuccess: (_data, { placeId }) => {
      if (isAuthenticated) {
        queryClient.invalidateQueries({ queryKey: wishlistKeys.myWishlists() });
      }
      queryClient.invalidateQueries({ queryKey: placeKeys.detail(String(placeId)) });
    },
  });
};
