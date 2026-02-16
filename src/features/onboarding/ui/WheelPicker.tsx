import { useEffect, useState } from 'react';

import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import {
  WheelPicker as WheelPickerComponent,
  WheelPickerWrapper,
} from '@/components/wheel-picker/wheel-picker';

import type { DateValue } from '@/features/onboarding/model/onboarding.types';

interface WheelPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (date: DateValue) => void;
  initialDate?: DateValue;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1970 + 1 }, (_, i) => 1970 + i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

// vaul drawer 애니메이션 시간 (500ms)
const DRAWER_ANIMATION_DURATION = 500;

export default function WheelPicker({ isOpen, onClose, onConfirm, initialDate }: WheelPickerProps) {
  const [date, setDate] = useState<DateValue>(
    initialDate || {
      year: 2001,
      month: 2,
      day: 13,
    },
  );

  // 바텀 시트 애니메이션 완료 후 휠 피커 표시 (텍스트 겹침 방지)
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  useEffect(() => {
    // isOpen이 false면 타이머를 설정하지 않음
    if (!isOpen) return;

    const timer = setTimeout(() => {
      setIsPickerVisible(true);
    }, DRAWER_ANIMATION_DURATION);

    // cleanup: 컴포넌트 언마운트 또는 isOpen 변경 시
    return () => {
      clearTimeout(timer);
      setIsPickerVisible(false);
    };
  }, [isOpen]);

  const days = Array.from({ length: getDaysInMonth(date.year, date.month) }, (_, i) => i + 1);

  // 옵션 생성
  const yearOptions = years.map((y) => ({ value: y, label: `${y}년` }));
  const monthOptions = months.map((m) => ({ value: m, label: `${m}월` }));
  const dayOptions = days.map((d) => ({ value: d, label: `${d}일` }));

  const handleYearChange = (newYear: number) => {
    const maxDay = getDaysInMonth(newYear, date.month);
    setDate((prev) => ({
      ...prev,
      year: newYear,
      day: Math.min(prev.day, maxDay),
    }));
  };

  const handleMonthChange = (newMonth: number) => {
    const maxDay = getDaysInMonth(date.year, newMonth);
    setDate((prev) => ({
      ...prev,
      month: newMonth,
      day: Math.min(prev.day, maxDay),
    }));
  };

  const handleDayChange = (newDay: number) => {
    setDate((prev) => ({
      ...prev,
      day: newDay,
    }));
  };

  const handleConfirm = () => {
    onConfirm(date);
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent showOverlay hideHandle className='mb-5 border-none bg-transparent'>
        <DrawerTitle className='sr-only'>생년월일 선택</DrawerTitle>
        <div className='mx-5 rounded-xl bg-white pb-6'>
          <div className='mx-auto mt-4 h-1 w-[42px] cursor-grab rounded-full bg-gray-300 active:cursor-grabbing' />

          <div className='flex items-center justify-between px-8 pt-5 pb-4'>
            <span className='text-2xl font-bold text-gray-950'>생년월일 입력</span>
            <button
              type='button'
              onClick={handleConfirm}
              className='bg-primary-700 rounded-full px-4 py-2 text-sm font-bold text-white'
            >
              완료
            </button>
          </div>

          <div
            className={`px-4 transition-opacity duration-200 ${isPickerVisible ? 'opacity-100' : 'opacity-0'}`}
            data-vaul-no-drag
          >
            <WheelPickerWrapper className='w-full border-none bg-transparent px-0 shadow-none'>
              <WheelPickerComponent
                options={yearOptions}
                value={date.year}
                onValueChange={handleYearChange}
                optionItemHeight={45}
                classNames={{
                  highlightWrapper: 'bg-gray-100 rounded-l-lg rounded-r-none',
                  optionItem: 'text-gray-400',
                  highlightItem: 'font-medium text-gray-950',
                }}
              />
              <WheelPickerComponent
                options={monthOptions}
                value={date.month}
                onValueChange={handleMonthChange}
                optionItemHeight={45}
                classNames={{
                  highlightWrapper: 'bg-gray-100 rounded-none',
                  optionItem: 'text-gray-400',
                  highlightItem: 'font-medium text-gray-950',
                }}
              />
              <WheelPickerComponent
                options={dayOptions}
                value={date.day}
                onValueChange={handleDayChange}
                optionItemHeight={45}
                classNames={{
                  highlightWrapper: 'bg-gray-100 rounded-r-lg rounded-l-none',
                  optionItem: 'text-gray-400',
                  highlightItem: 'font-medium text-gray-950',
                }}
              />
            </WheelPickerWrapper>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
