export const badgeKeys = {
  all: ['badge'] as const,
  progress: () => [...badgeKeys.all, 'progress'] as const,
};
