import { useMutation } from '@tanstack/react-query';

import { toggleWishlist } from '@/entities/place/api/place.api';

export const useToggleWishlistMutation = () => {
  return useMutation({
    mutationFn: (placeId: string) => toggleWishlist(placeId),
  });
};
