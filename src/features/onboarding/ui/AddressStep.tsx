import { useState } from 'react';

import { KOREAN_CITIES, KOREAN_DISTRICTS } from '@/features/onboarding/model/onboarding.types';
import OnboardingLayout from '@/features/onboarding/ui/OnboardingLayout';
import PrimaryButton from '@/shared/ui/buttons/PrimaryButton';
import FormLabel from '@/shared/ui/forms/FormLabel';
import AddressPicker from '@/shared/ui/inputs/AddressPicker';

interface AddressStepProps {
  onNext: (address: string) => void;
  onBack: () => void;
}

export default function AddressStep({ onNext, onBack }: AddressStepProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

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
        <div className='px-5 pb-8'>
          <PrimaryButton onClick={handleNext} disabled={!isValid}>
            다음 단계
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
