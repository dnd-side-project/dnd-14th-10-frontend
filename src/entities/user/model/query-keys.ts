export const userKeys = {
  all: ['users'] as const,
  detail: (userId: string) => [...userKeys.all, 'detail', userId] as const,
  me: () => [...userKeys.all, 'me'] as const,
  badges: () => [...userKeys.me(), 'badges'] as const,
  wishlist: () => [...userKeys.me(), 'wishlist'] as const,
  histories: () => [...userKeys.me(), 'histories'] as const,
};
