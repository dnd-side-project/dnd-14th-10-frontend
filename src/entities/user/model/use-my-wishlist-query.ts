import { useSuspenseQuery } from '@tanstack/react-query';

import { userKeys } from './query-keys.ts';
import { getMyWishlist } from '../api/user.api';

export const useMyWishlistQuery = () => {
  return useSuspenseQuery({
    queryKey: userKeys.wishlist(),
    queryFn: getMyWishlist,
  });
};
