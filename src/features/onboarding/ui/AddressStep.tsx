import { useState } from 'react';

import {
  KOREAN_CITIES,
  KOREAN_DISTRICTS,
  REGION_CODES,
} from '@/features/onboarding/model/onboarding.types';
import OnboardingLayout from '@/features/onboarding/ui/OnboardingLayout';
import PrimaryButton from '@/shared/ui/buttons/PrimaryButton';
import FormLabel from '@/shared/ui/forms/FormLabel';
import AddressPicker from '@/shared/ui/inputs/AddressPicker';

interface AddressStepProps {
  onNext: (regionCode: number) => void;
  onBack: () => void;
  initialRegionCode?: number;
  buttonText?: string;
}

const findCityDistrictByRegionCode = (
  regionCode?: number,
): { city: string | null; district: string | null } => {
  if (!regionCode) return { city: null, district: null };

  for (const [city, districts] of Object.entries(REGION_CODES)) {
    for (const [district, code] of Object.entries(districts)) {
      if (code === regionCode) {
        return { city, district };
      }
    }
  }
  return { city: null, district: null };
};

export default function AddressStep({
  onNext,
  onBack,
  initialRegionCode,
  buttonText = '다음 단계',
}: AddressStepProps) {
  const initialAddress = findCityDistrictByRegionCode(initialRegionCode);
  console.log(
    '[AddressStep] initialRegionCode:',
    initialRegionCode,
    'initialAddress:',
    initialAddress,
  );
  const [selectedCity, setSelectedCity] = useState<string | null>(initialAddress.city);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(initialAddress.district);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedDistrict(null);
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
  };

  const handleNext = () => {
    if (selectedCity && selectedDistrict) {
      const regionCode = REGION_CODES[selectedCity]?.[selectedDistrict];
      if (regionCode !== undefined) {
        onNext(regionCode);
      } else {
        console.error('지역 코드를 찾을 수 없습니다:', selectedCity, selectedDistrict);
      }
    }
  };

  const isValid = selectedCity !== null && selectedDistrict !== null;

  return (
    <OnboardingLayout
      title='거주지를 입력해주세요.'
      onBack={onBack}
      footer={
        <div className='px-5'>
          <PrimaryButton onClick={handleNext} disabled={!isValid}>
            {buttonText}
          </PrimaryButton>
        </div>
      }
    >
      <div className='mt-10'>
        <FormLabel>주소</FormLabel>
        <div className='mt-4'>
          <AddressPicker
            cities={KOREAN_CITIES}
            districts={KOREAN_DISTRICTS}
            selectedCity={selectedCity}
            selectedDistrict={selectedDistrict}
            onCityChange={handleCityChange}
            onDistrictChange={handleDistrictChange}
            placeholder='거주지 입력'
          />
        </div>
      </div>
    </OnboardingLayout>
  );
}
