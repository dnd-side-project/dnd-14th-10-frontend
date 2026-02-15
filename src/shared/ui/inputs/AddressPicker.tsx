import { useState } from 'react';

interface AddressPickerProps {
  cities: readonly string[];
  districts: Readonly<Record<string, readonly string[]>>;
  selectedCity: string | null;
  selectedDistrict: string | null;
  onCityChange: (city: string) => void;
  onDistrictChange: (district: string) => void;
  placeholder?: string;
}

export default function AddressPicker({
  cities,
  districts,
  selectedCity,
  selectedDistrict,
  onCityChange,
  onDistrictChange,
  placeholder = '거주지 입력',
}: AddressPickerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCitySelect = (city: string) => {
    onCityChange(city);
  };

  const handleDistrictSelect = (district: string) => {
    onDistrictChange(district);
  };

  const displayValue =
    selectedCity && selectedDistrict ? `${selectedCity} ${selectedDistrict}` : '';

  const currentDistricts = selectedCity ? districts[selectedCity] || [] : [];

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-gray-100 transition-all duration-200 ${
        isExpanded ? 'h-[304px]' : 'h-12'
      }`}
    >
      {!isExpanded && (
        <button
          type='button'
          onClick={handleToggleExpand}
          className='flex h-12 w-full items-center px-4 text-left'
        >
          <span
            className={displayValue ? 'text-[16px] text-gray-900' : 'text-[16px] text-gray-500'}
          >
            {displayValue || placeholder}
          </span>
        </button>
      )}

      {isExpanded && (
        <div className='flex h-full flex-col'>
          <button
            type='button'
            onClick={handleToggleExpand}
            className='flex h-11 items-center justify-center border-b border-gray-200'
          >
            <span className='text-[16px] font-medium text-gray-950'>지역</span>
          </button>

          <div className='flex flex-1 overflow-hidden'>
            <div className='relative w-[90px] shrink-0 border-r border-gray-200 px-1 py-2.5'>
              <div className='scrollbar-hide h-full overflow-y-auto'>
                {cities.map((city) => (
                  <button
                    key={city}
                    type='button'
                    onClick={() => handleCitySelect(city)}
                    className='flex w-full items-center justify-between px-3 py-2.5'
                  >
                    <span className='text-[14px] font-medium text-gray-950'>{city}</span>
                    {selectedCity === city && (
                      <svg width='13' height='12' viewBox='0 0 13 12' fill='none'>
                        <path
                          d='M4.47897 2.02141L7.74364 5.25171C8.12919 5.63321 8.12919 6.25747 7.74364 6.63896L4.47897 9.86926'
                          stroke='#868E96'
                          strokeWidth='1.5'
                          strokeMiterlimit='10'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              <div className='pointer-events-none absolute right-0 bottom-0 left-0 h-10 bg-linear-to-t from-gray-100 to-transparent' />
            </div>

            <div className='relative flex-1 overflow-hidden'>
              <div className='scrollbar-hide h-full overflow-y-auto py-2.5'>
                {selectedCity ? (
                  <div className='grid grid-cols-2 justify-items-center'>
                    {currentDistricts.map((district) => (
                      <button
                        key={district}
                        type='button'
                        onClick={() => handleDistrictSelect(district)}
                        className='flex w-[80px] items-center justify-between py-2.5'
                      >
                        <span className='text-[14px] font-medium text-gray-950'>{district}</span>
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                            selectedDistrict === district ? 'border-gray-500' : 'border-gray-300'
                          }`}
                        >
                          {selectedDistrict === district && (
                            <div className='bg-primary-700 h-2.5 w-2.5 rounded-full' />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className='flex h-full items-center justify-center text-[14px] text-gray-400'>
                    시/도를 먼저 선택해주세요
                  </div>
                )}
              </div>
              {selectedCity && (
                <div className='pointer-events-none absolute right-0 bottom-0 left-0 h-10 bg-linear-to-t from-gray-100 to-transparent' />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
