import { useCallback, useState } from 'react';

import { useDebounce } from '@/shared/lib/hooks/use-debounce';

import type { PlaceSearchResult } from '../api/search-place.api';
import { useNaverSearchQuery } from '../model/use-naver-search-query';

interface UsePlaceSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: PlaceSearchResult[];
  isSearching: boolean;
  handleSearch: () => void;
  clearSearch: () => void;
}

export function usePlaceSearch(): UsePlaceSearchReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery, 300);

  const queryToUse = activeQuery || debouncedQuery;

  const { data, isFetching } = useNaverSearchQuery(queryToUse);

  const isDebouncing = searchQuery.trim().length >= 2 && searchQuery !== queryToUse;

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      setActiveQuery(searchQuery);
    }
  }, [searchQuery]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setActiveQuery('');
  }, []);

  return {
    searchQuery,
    setSearchQuery: (query: string) => {
      setSearchQuery(query);
      setActiveQuery('');
    },
    searchResults: data ?? [],
    isSearching: isFetching || isDebouncing,
    handleSearch,
    clearSearch,
  };
}
