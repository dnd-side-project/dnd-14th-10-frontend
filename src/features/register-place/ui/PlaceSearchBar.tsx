import { useEffect, useRef } from 'react';

import MapPinIcon from '@/shared/ui/icons/MapPin.svg?react';

import type { PlaceSearchResult } from '../api/search-place.api';

interface PlaceSearchBarProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
  searchResults: PlaceSearchResult[];
  isSearching: boolean;
  onSelectResult: (result: PlaceSearchResult) => void;
}

export function PlaceSearchBar({
  isOpen,
  onOpen,
  onClose,
  searchQuery,
  onSearchQueryChange,
  onSearch,
  searchResults,
  isSearching,
  onSelectResult,
}: PlaceSearchBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 검색창 열릴 때 포커스
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  };

  if (!isOpen) {
    return (
      <button
        type='button'
        onClick={onOpen}
        className='inline-flex h-[52px] w-full items-center justify-center gap-[8px] rounded-xl bg-white px-[60px] py-[13px] shadow-[0px_4px_4px_rgba(0,0,0,0.1)]'
      >
        <MapPinIcon className='text-primary-700 h-5 w-5' />
        <span className='text-body1 text-primary-700 font-medium'>작업 공간을 찾아보아요</span>
      </button>
    );
  }

  return (
    <div className='overflow-hidden rounded-xl bg-white shadow-[0px_0px_12px_rgba(0,0,0,0.1)]'>
      {/* 검색 입력 */}
      <div className='border-gray-150 flex h-[52px] items-center gap-[8px] border-b p-4'>
        <MapPinIcon className='text-primary-700 h-5 w-5 flex-shrink-0' />
        <input
          ref={searchInputRef}
          type='text'
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='카페, 도서관 등 장소명 검색'
          className='text-body1 flex-1 font-medium text-gray-950 placeholder:text-gray-500 focus:outline-none'
        />
        <button type='button' onClick={onClose} className='text-gray-500'>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <path
              d='M15 5L5 15M5 5L15 15'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
            />
          </svg>
        </button>
      </div>

      {/* 검색 결과 */}
      {searchResults.length > 0 && (
        <ul className='max-h-[50vh] overflow-y-auto'>
          {searchResults.map((result, index) => (
            <li key={index}>
              <button
                type='button'
                onClick={() => onSelectResult(result)}
                className='flex w-full flex-col gap-1 p-4 text-left hover:bg-gray-50'
              >
                <span className='text-body2 font-bold text-gray-950'>{result.placeName}</span>
                <span className='text-body2 text-gray-500'>
                  {result.roadAddress || result.address}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* 검색 중 */}
      {isSearching && <div className='text-body2 p-4 text-center text-gray-500'>검색 중...</div>}

      {/* 검색 결과 없음 */}
      {!isSearching && searchQuery.length > 1 && searchResults.length === 0 && (
        <div className='text-body2 p-4 text-center text-gray-500'>검색 결과가 없습니다</div>
      )}
    </div>
  );
}
