import { useQuery } from '@tanstack/react-query';

import { registerPlaceKeys } from './query-keys';
import { searchPlace } from '../api/search-place.api';

export function useNaverSearchQuery(query: string) {
  return useQuery({
    queryKey: registerPlaceKeys.naverSearch(query),
    queryFn: () => searchPlace(query),
    enabled: query.trim().length >= 2,
    staleTime: 1000 * 60 * 5,
  });
}
