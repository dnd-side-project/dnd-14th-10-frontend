export const userKeys = {
  all: ['user'] as const,
  me: () => [...userKeys.all, 'me'] as const,
  detail: (id: number | string) => [...userKeys.all, 'detail', id] as const,
};
