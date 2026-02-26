export const placeKeys = {
  all: ['place'] as const,
  myPlaces: () => [...placeKeys.all, 'my'] as const,
  myPlacesList: (sortType: string, size: number) =>
    [...placeKeys.myPlaces(), sortType, size] as const,
};
