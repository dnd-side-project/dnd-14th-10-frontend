export const historyKeys = {
  all: ['history'] as const,
  myHistories: () => [...historyKeys.all, 'my'] as const,
};
