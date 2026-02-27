import { useState } from 'react';

import type { DateValue, Gender } from '@/features/onboarding/model/onboarding.types';
import OnboardingLayout from '@/features/onboarding/ui/OnboardingLayout';
import WheelPicker from '@/features/onboarding/ui/WheelPicker';
import PrimaryButton from '@/shared/ui/buttons/PrimaryButton';
import FormLabel from '@/shared/ui/forms/FormLabel';

interface BirthdayStepProps {
  onNext: (birthday: string, gender: Gender) => void;
  onBack: () => void;
  initialValue?: string;
  initialGender?: Gender;
  buttonText?: string;
}

const parseInitialDate = (value?: string): DateValue | null => {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return { year, month, day };
};

export default function BirthdayStep({
  onNext,
  onBack,
  initialValue,
  initialGender,
  buttonText = '다음 단계',
}: BirthdayStepProps) {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(initialGender || null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(
    parseInitialDate(initialValue),
  );

  const handleOpenPicker = () => {
    setIsPickerOpen(true);
  };

  const handleConfirmDate = (date: DateValue) => {
    setSelectedDate(date);
  };

  const handleNext = () => {
    if (selectedDate && selectedGender) {
      const formattedDate = `${selectedDate.year}-${String(selectedDate.month).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`;
      onNext(formattedDate, selectedGender);
    }
  };

  const formatDisplayDate = (date: DateValue) => {
    return `${date.year}년 ${date.month}월 ${date.day}일`;
  };

  const isValid = selectedDate !== null && selectedGender !== null;

  return (
    <OnboardingLayout
      title='성별, 생년월일을 알려주세요.'
      onBack={onBack}
      footer={
        <div className='px-5'>
          <PrimaryButton onClick={handleNext} disabled={!isValid}>
            {buttonText}
          </PrimaryButton>
        </div>
      }
    >
      <div className='mt-12'>
        <FormLabel>성별</FormLabel>
        <div className='mt-4 flex gap-8'>
          <button
            type='button'
            onClick={() => setSelectedGender('MALE')}
            className='flex items-center gap-2'
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                selectedGender === 'MALE' ? 'border-gray-500' : 'border-gray-300'
              }`}
            >
              {selectedGender === 'MALE' && (
                <div className='bg-primary-700 h-2.5 w-2.5 rounded-full' />
              )}
            </div>
            <span className='text-[16px] font-medium text-gray-950'>남성</span>
          </button>
          <button
            type='button'
            onClick={() => setSelectedGender('FEMALE')}
            className='flex items-center gap-2'
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                selectedGender === 'FEMALE' ? 'border-gray-500' : 'border-gray-300'
              }`}
            >
              {selectedGender === 'FEMALE' && (
                <div className='bg-primary-700 h-2.5 w-2.5 rounded-full' />
              )}
            </div>
            <span className='text-[16px] font-medium text-gray-950'>여성</span>
          </button>
        </div>
      </div>

      <div className='mt-14'>
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
