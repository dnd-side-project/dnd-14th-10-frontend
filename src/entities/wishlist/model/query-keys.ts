export const wishlistKeys = {
  all: ['wishlist'] as const,
  myWishlists: () => [...wishlistKeys.all, 'my'] as const,
  myWishlistsList: (sort: string) => [...wishlistKeys.myWishlists(), sort] as const,
  wishCount: (placeId: number) => [...wishlistKeys.all, 'wish-count', placeId] as const,
};
