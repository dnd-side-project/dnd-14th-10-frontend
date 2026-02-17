import { useState } from 'react';

import { KOREAN_CITIES, KOREAN_DISTRICTS } from '@/features/onboarding/model/onboarding.types';
import OnboardingLayout from '@/features/onboarding/ui/OnboardingLayout';
import PrimaryButton from '@/shared/ui/buttons/PrimaryButton';
import FormLabel from '@/shared/ui/forms/FormLabel';
import AddressPicker from '@/shared/ui/inputs/AddressPicker';

interface AddressStepProps {
  onNext: (address: string) => void;
  onBack: () => void;
  initialValue?: string;
  buttonText?: string;
}

const parseInitialAddress = (value?: string): { city: string | null; district: string | null } => {
  if (!value) return { city: null, district: null };
  const parts = value.split(' ');
  return { city: parts[0] || null, district: parts[1] || null };
};

export default function AddressStep({
  onNext,
  onBack,
  initialValue,
  buttonText = '다음 단계',
}: AddressStepProps) {
  const initialAddress = parseInitialAddress(initialValue);
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
      onNext(`${selectedCity} ${selectedDistrict}`);
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
