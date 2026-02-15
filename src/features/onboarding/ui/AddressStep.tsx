import { useState } from 'react';

import { KOREAN_CITIES, KOREAN_DISTRICTS } from '@/features/onboarding/model/onboarding.types';
import OnboardingLayout from '@/features/onboarding/ui/OnboardingLayout';
import PrimaryButton from '@/shared/ui/buttons/PrimaryButton';
import FormLabel from '@/shared/ui/forms/FormLabel';

interface AddressStepProps {
  onNext: (address: string) => void;
  onBack: () => void;
}

export default function AddressStep({ onNext, onBack }: AddressStepProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSelectedDistrict(null);
  };

  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
  };

  const handleNext = () => {
    if (selectedCity && selectedDistrict) {
      onNext(`${selectedCity} ${selectedDistrict}`);
    }
  };

  const isValid = selectedCity !== null && selectedDistrict !== null;

  const displayValue =
    selectedCity && selectedDistrict ? `${selectedCity} ${selectedDistrict}` : '';

  const districts = selectedCity ? KOREAN_DISTRICTS[selectedCity] || [] : [];

  return (
    <OnboardingLayout
      title='거주지를 입력해주세요.'
      onBack={onBack}
      footer={
        <div className='px-5 pb-8'>
          <PrimaryButton onClick={handleNext} disabled={!isValid}>
            다음 단계
          </PrimaryButton>
        </div>
      }
    >
      <div className='mt-10'>
        <FormLabel>주소</FormLabel>

        <div
          className={`relative mt-4 overflow-hidden rounded-lg bg-gray-100 transition-all duration-200 ${
            isExpanded ? 'h-[304px]' : 'h-12'
          }`}
        >
          {/* 접힌 상태: placeholder 표시 */}
          {!isExpanded && (
            <button
              type='button'
              onClick={handleToggleExpand}
              className='flex h-12 w-full items-center px-4 text-left'
            >
              <span
                className={displayValue ? 'text-[16px] text-gray-900' : 'text-[16px] text-gray-500'}
              >
                {displayValue || '거주지 입력'}
              </span>
            </button>
          )}

          {/* 펼쳐진 상태: 지역 선택 UI */}
          {isExpanded && (
            <div className='flex h-full flex-col'>
              {/* 지역 헤더 */}
              <button
                type='button'
                onClick={handleToggleExpand}
                className='flex h-11 items-center justify-center border-b border-gray-200'
              >
                <span className='text-[16px] font-medium text-gray-950'>지역</span>
              </button>

              {/* 컨텐츠 영역 */}
              <div className='flex flex-1 overflow-hidden'>
                {/* 시/도 선택 */}
                <div className='relative w-[90px] shrink-0 border-r border-gray-200 px-1 py-2.5'>
                  <div className='scrollbar-hide h-full overflow-y-auto'>
                    {KOREAN_CITIES.map((city) => (
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
                  {/* 시/도 하단 그라데이션 */}
                  <div className='pointer-events-none absolute right-0 bottom-0 left-0 h-10 bg-linear-to-t from-gray-100 to-transparent' />
                </div>

                {/* 구/군 선택 - 2열 그리드 */}
                <div className='relative flex-1 overflow-hidden'>
                  <div className='scrollbar-hide h-full overflow-y-auto py-2.5'>
                    {selectedCity ? (
                      <div className='grid grid-cols-2 justify-items-center'>
                        {districts.map((district) => (
                          <button
                            key={district}
                            type='button'
                            onClick={() => handleDistrictSelect(district)}
                            className='flex w-[80px] items-center justify-between py-2.5'
                          >
                            <span className='text-[14px] font-medium text-gray-950'>
                              {district}
                            </span>
                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                selectedDistrict === district
                                  ? 'border-gray-500'
                                  : 'border-gray-300'
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
                  {/* 구/군 하단 그라데이션 */}
                  {selectedCity && (
                    <div className='pointer-events-none absolute right-0 bottom-0 left-0 h-10 bg-linear-to-t from-gray-100 to-transparent' />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </OnboardingLayout>
  );
}
