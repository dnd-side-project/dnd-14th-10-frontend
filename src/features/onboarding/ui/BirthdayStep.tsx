import { useState } from 'react';

import type { DateValue } from '@/features/onboarding/model/onboarding.types';
import OnboardingLayout from '@/features/onboarding/ui/OnboardingLayout';
import WheelPicker from '@/features/onboarding/ui/WheelPicker';
import PrimaryButton from '@/shared/ui/buttons/PrimaryButton';
import FormLabel from '@/shared/ui/forms/FormLabel';

interface BirthdayStepProps {
  onNext: (birthday: string) => void;
  onBack: () => void;
}

export default function BirthdayStep({ onNext, onBack }: BirthdayStepProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);

  const handleOpenPicker = () => {
    setIsPickerOpen(true);
  };

  const handleConfirmDate = (date: DateValue) => {
    setSelectedDate(date);
  };

  const handleNext = () => {
    if (selectedDate) {
      const formattedDate = `${selectedDate.year}-${String(selectedDate.month).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`;
      onNext(formattedDate);
    }
  };

  const formatDisplayDate = (date: DateValue) => {
    return `${date.year}년 ${date.month}월 ${date.day}일`;
  };

  const isValid = selectedDate !== null;

  return (
    <OnboardingLayout
      title='생년월일을 입력해주세요.'
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
        <FormLabel>생년월일</FormLabel>
        <button
          type='button'
          onClick={handleOpenPicker}
          className='mt-4 flex h-12 w-full items-center rounded-lg bg-gray-100 px-4 text-left'
        >
          <span
            className={selectedDate ? 'text-[16px] text-gray-900' : 'text-[16px] text-gray-500'}
          >
            {selectedDate ? formatDisplayDate(selectedDate) : '생년월일 입력'}
          </span>
        </button>
      </div>

      <WheelPicker
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onConfirm={handleConfirmDate}
        initialDate={selectedDate || undefined}
      />
    </OnboardingLayout>
  );
}
