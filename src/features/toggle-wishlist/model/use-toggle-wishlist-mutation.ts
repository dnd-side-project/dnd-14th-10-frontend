import { useMutation } from '@tanstack/react-query';

import { toggleWishlist } from '../api/toggle-wishlist.api';

export const useToggleWishlistMutation = () => {
  return useMutation({
    mutationFn: (placeId: number) => toggleWishlist(placeId),
  });
};
