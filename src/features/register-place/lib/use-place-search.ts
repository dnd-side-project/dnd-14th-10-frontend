import { useCallback, useEffect, useState } from 'react';

import { useDebounce } from '@/shared/lib/hooks/use-debounce';

import { searchPlace, type PlaceSearchResult } from '../api/search-place.api';

interface UsePlaceSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: PlaceSearchResult[];
  isSearching: boolean;
  handleSearch: () => Promise<void>;
  clearSearch: () => void;
}

export function usePlaceSearch(): UsePlaceSearchReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PlaceSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedQuery = useDebounce(searchQuery, 300);

  // 디바운스된 검색어로 검색 실행
  useEffect(() => {
    const search = async () => {
      if (debouncedQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchPlace(debouncedQuery);
        setSearchResults(results);
      } catch (error) {
        console.error('검색 실패:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    search();
  }, [debouncedQuery]);

  // 즉시 검색 (Enter 키용)
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const results = await searchPlace(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('검색 실패:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    handleSearch,
    clearSearch,
  };
}
