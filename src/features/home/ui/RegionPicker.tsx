import { useState } from 'react';

import { Input } from '@/components/ui/input';
import CheckIcon from '@/shared/ui/icons/Check.svg?react';
import ChevronRightIcon from '@/shared/ui/icons/ChevronRight.svg?react';
import SearchIcon from '@/shared/ui/icons/Search.svg?react';
import SearchInput from '@/shared/ui/inputs/SearchInput';

interface RegionPickerProps {
  cities: readonly string[];
  districts: Readonly<Record<string, readonly string[]>>;
  selectedCity: string | null;
  selectedDistricts: Record<string, string[]>;
  regionSummary: string;
  isExpanded: boolean;
  searchTerm: string;
  onToggle: () => void;
  onCityChange: (city: string) => void;
  onDistrictToggle: (city: string, district: string) => void;
  onSelectAllDistricts: (city: string) => void;
  onSearchTermChange: (term: string) => void;
}

export default function RegionPicker({
  cities,
  districts,
  selectedCity,
  selectedDistricts,
  regionSummary,
  isExpanded,
  searchTerm,
  onToggle,
  onCityChange,
  onDistrictToggle,
  onSelectAllDistricts,
  onSearchTermChange,
}: RegionPickerProps) {
  const [isInputActive, setIsInputActive] = useState(false);

  const currentDistricts = selectedCity ? districts[selectedCity] || [] : [];
  const citySelected = selectedCity ? selectedDistricts[selectedCity] || [] : [];
  const isAllSelected =
    selectedCity !== null &&
    currentDistricts.length > 0 &&
    citySelected.length === currentDistricts.length;

  const searchInput = (
    <div className='relative'>
      {isInputActive ? (
        <>
          <Input
            type='text'
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className='h-[52px] w-full rounded-full bg-white pr-4 pl-12 text-[16px] leading-[130%] font-medium tracking-[-0.002px] placeholder:text-gray-400'
            onBlur={() => setIsInputActive(false)}
            autoFocus={isInputActive}
          />
          <SearchIcon className='text-primary-700 absolute top-1/2 left-4 size-7 -translate-y-1/2' />
        </>
      ) : (
        <SearchInput
          onClick={() => setIsInputActive(true)}
          placeholder={searchTerm || '작업 공간을 찾아보아요'}
        />
      )}
    </div>
  );

  if (!isExpanded) {
    return (
      <div className='overflow-hidden rounded-lg bg-gray-100'>
        <div className='px-5 pt-4 pb-4'>{searchInput}</div>
        <button
          type='button'
          onClick={() => onToggle()}
          className='flex w-full flex-col items-center gap-2 pb-5'
        >
          <span className='text-[16px] leading-[130%] font-medium text-gray-950'>지역</span>
          {regionSummary && (
            <span className='text-center text-[16px] leading-[130%] font-normal text-gray-500'>
              {regionSummary}
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className='overflow-hidden rounded-lg bg-gray-100'>
      <div className='px-5 pt-4'>{searchInput}</div>

      <button
        type='button'
        onClick={() => onToggle()}
        className='flex h-11 w-full items-center justify-center border-b border-gray-200'
      >
        <span className='text-[16px] font-medium text-gray-950'>지역</span>
      </button>

      <div className='flex h-[260px]'>
        <div className='relative w-[90px] shrink-0 border-r border-gray-200 px-1 py-2.5'>
          <div className='scrollbar-hide h-full overflow-y-auto'>
            {cities.map((city) => {
              const hasSelection = (selectedDistricts[city] || []).length > 0;
              return (
                <button
                  key={city}
                  type='button'
                  onClick={() => onCityChange(city)}
                  className='flex w-full items-center justify-between px-3 py-2.5'
                >
                  <span
                    className={`text-[14px] font-medium ${
                      selectedCity === city
                        ? 'text-gray-950'
                        : hasSelection
                          ? 'text-gray-700'
                          : 'text-gray-950'
                    }`}
                  >
                    {city}
                  </span>
                  {selectedCity === city && (
                    <ChevronRightIcon width={13} className='text-gray-500' />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className='relative flex-1 overflow-hidden'>
          <div className='scrollbar-hide h-full overflow-y-auto py-2.5'>
            {selectedCity ? (
              <div className='grid grid-cols-2 justify-items-center'>
                <button
                  type='button'
                  onClick={() => onSelectAllDistricts(selectedCity)}
                  className='flex w-[80px] items-center justify-between py-2.5'
                >
                  <span className='text-[14px] font-medium text-gray-950'>{selectedCity} 전체</span>
                  <CheckIcon
                    className={`h-5 w-5 ${isAllSelected ? 'text-primary-700' : 'text-gray-300'}`}
                  />
                </button>
                {currentDistricts.map((district) => {
                  const isChecked = citySelected.includes(district);
                  return (
                    <button
                      key={district}
                      type='button'
                      onClick={() => onDistrictToggle(selectedCity, district)}
                      className='flex w-[80px] items-center justify-between py-2.5'
                    >
                      <span className='text-[14px] font-medium text-gray-950'>{district}</span>
                      <CheckIcon
                        className={`h-5 w-5 ${isChecked ? 'text-primary-700' : 'text-gray-300'}`}
                      />
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className='flex h-full items-center justify-center text-[14px] text-gray-400'>
                시/도를 먼저 선택해주세요
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
