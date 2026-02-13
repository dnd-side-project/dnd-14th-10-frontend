export const registerPlaceKeys = {
  all: ['register-place'] as const,
  naverSearch: (query: string) => [...registerPlaceKeys.all, 'naver-search', query] as const,
};
