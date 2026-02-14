import { useRef, useState } from 'react';

import MapPinIcon from '@/shared/ui/icons/MapPin.svg?react';
import SearchIcon from '@/shared/ui/icons/Search.svg?react';

import type { PlaceSearchResult } from '../api/search-place.api';
import type { LocationData } from '../model/use-registration-store';

interface PlaceSearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
  searchResults: PlaceSearchResult[];
  isSearching: boolean;
  onSelectResult: (result: PlaceSearchResult) => void;
  selectedLocation: LocationData | null;
}

export function PlaceSearchBar({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  searchResults,
  isSearching,
  onSelectResult,
  selectedLocation,
}: PlaceSearchBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  };

  const handleSelectResult = (result: PlaceSearchResult) => {
    onSelectResult(result);
    searchInputRef.current?.blur();
  };

  const handleSelectedClick = () => {
    if (selectedLocation) {
      onSearchQueryChange(selectedLocation.placeName ?? '');
    }
    setIsFocused(true);
    setTimeout(() => searchInputRef.current?.focus(), 0);
  };

  const showResults =
    isFocused && (searchResults.length > 0 || isSearching || searchQuery.length > 1);
  const showSelectedLocation = !isFocused && !!selectedLocation;

  return (
    <div className='overflow-hidden rounded-xl bg-white shadow-[0px_0px_12px_rgba(0,0,0,0.1)]'>
      <div className='border-gray-150 flex items-center gap-[8px] border-b px-[16px] py-[10px]'>
        <MapPinIcon className='text-primary-700 h-5 w-5 flex-shrink-0' />
        <div className='relative flex-1'>
          {showSelectedLocation ? (
            <button
              type='button'
              onClick={handleSelectedClick}
              className='flex w-full flex-col gap-1 text-left'
            >
              <span className='text-body1 text-primary-700 font-medium'>
                {selectedLocation.placeName}
              </span>
              <span className='text-caption2 text-gray-500'>
                {selectedLocation.roadAddress || selectedLocation.address}
              </span>
            </button>
          ) : (
            <>
              <input
                ref={searchInputRef}
                type='text'
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={isFocused ? '카페, 도서관 등 장소명 검색' : ''}
                className='text-body1 w-full font-medium text-gray-950 placeholder:text-gray-500 focus:outline-none'
              />
              {!isFocused && !searchQuery && !selectedLocation && (
                <span className='text-body1 text-primary-700 pointer-events-none absolute inset-0 flex items-center font-medium'>
                  작업 공간을 찾아보아요
                </span>
              )}
            </>
          )}
        </div>
        <button type='button' onClick={onSearch} className='text-primary-700'>
          <SearchIcon className='h-5 w-5' />
        </button>
      </div>

      {showResults && (
        <>
          {/* 검색 결과 */}
          {searchResults.length > 0 && (
            <ul className='border-gray-150 max-h-[50vh] overflow-y-auto border-t'>
              {searchResults.map((result, index) => (
                <li key={index}>
                  <button
                    type='button'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelectResult(result)}
                    className='flex w-full flex-col gap-[8px] p-[16px] text-left hover:bg-gray-50'
                  >
                    <span className='text-body2 font-bold text-gray-950'>{result.placeName}</span>
                    <span className='text-body2 text-gray-950'>
                      {result.roadAddress || result.address}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* 검색 중 */}
          {isSearching && (
            <div className='text-body2 border-gray-150 border-t p-4 text-center text-gray-500'>
              검색 중...
            </div>
          )}

          {/* 검색 결과 없음 */}
          {!isSearching && searchQuery.length > 1 && searchResults.length === 0 && (
            <div className='text-body2 border-gray-150 border-t p-4 text-center text-gray-500'>
              검색 결과가 없습니다
            </div>
          )}
        </>
      )}
    </div>
  );
}
