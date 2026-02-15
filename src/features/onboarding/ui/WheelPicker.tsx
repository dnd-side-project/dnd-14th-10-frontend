import { memo, useEffect, useRef, useState } from 'react';

import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';

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

const ITEM_HEIGHT = 45;
const VISIBLE_ITEMS = 5;
const WHEEL_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

const getItemStyle = (index: number, selectedIndex: number) => {
  const distance = Math.abs(index - selectedIndex);

  if (distance === 0) {
    return {
      fontSize: '18px',
      fontWeight: 500,
      color: '#171719',
    };
  } else if (distance === 1) {
    return {
      fontSize: '16px',
      fontWeight: 400,
      color: '#868e96',
    };
  } else {
    return {
      fontSize: '14px',
      fontWeight: 400,
      color: '#ced4da',
    };
  }
};

interface WheelColumnProps {
  items: number[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  suffix: string;
}

const WheelColumn = memo(function WheelColumn({
  items,
  selectedIndex,
  onSelect,
  suffix,
}: WheelColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (containerRef.current && !isScrollingRef.current) {
      containerRef.current.scrollTo({
        top: selectedIndex * ITEM_HEIGHT,
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const newIndex = Math.round(scrollTop / ITEM_HEIGHT);
      if (newIndex !== selectedIndex && newIndex >= 0 && newIndex < items.length) {
        onSelect(newIndex);
      }
    }
  };

  const handleItemClick = (index: number) => {
    if (containerRef.current) {
      isScrollingRef.current = true;
      containerRef.current.scrollTo({
        top: index * ITEM_HEIGHT,
        behavior: 'smooth',
      });
      setTimeout(() => {
        onSelect(index);
        isScrollingRef.current = false;
      }, 300);
    }
  };

  return (
    <div
      ref={containerRef}
      className='scrollbar-hide flex-1 snap-y snap-mandatory overflow-y-auto scroll-smooth'
      onScroll={handleScroll}
      style={{
        height: WHEEL_HEIGHT,
        paddingTop: ITEM_HEIGHT * 2,
        paddingBottom: ITEM_HEIGHT * 2,
      }}
    >
      {items.map((item, index) => {
        const style = getItemStyle(index, selectedIndex);

        return (
          <div
            key={item}
            className='flex cursor-pointer snap-center items-center justify-center transition-all duration-200'
            style={{ height: ITEM_HEIGHT }}
            onClick={() => handleItemClick(index)}
          >
            <span style={style}>
              {item}
              {suffix}
            </span>
          </div>
        );
      })}
    </div>
  );
});

export default function WheelPicker({ isOpen, onClose, onConfirm, initialDate }: WheelPickerProps) {
  const [date, setDate] = useState<DateValue>(
    initialDate || {
      year: 2001,
      month: 2,
      day: 13,
    },
  );

  const days = Array.from({ length: getDaysInMonth(date.year, date.month) }, (_, i) => i + 1);

  const handleYearChange = (index: number) => {
    const newYear = years[index];
    const maxDay = getDaysInMonth(newYear, date.month);
    setDate((prev) => ({
      ...prev,
      year: newYear,
      day: Math.min(prev.day, maxDay),
    }));
  };

  const handleMonthChange = (index: number) => {
    const newMonth = months[index];
    const maxDay = getDaysInMonth(date.year, newMonth);
    setDate((prev) => ({
      ...prev,
      month: newMonth,
      day: Math.min(prev.day, maxDay),
    }));
  };

  const handleDayChange = (index: number) => {
    setDate((prev) => ({
      ...prev,
      day: days[index],
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
        <div className='mx-auto w-full max-w-[350px] rounded-xl bg-white pb-6'>
          <div className='mx-auto mt-4 h-1 w-[42px] rounded-full bg-gray-300' />

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

          <div className='relative px-8'>
            <div
              className='pointer-events-none absolute right-8 left-8 z-10 rounded-lg bg-gray-100'
              style={{
                height: 48,
                top: ITEM_HEIGHT * 2 - 1,
              }}
            />

            <div className='relative z-20 flex'>
              <WheelColumn
                items={years}
                selectedIndex={years.indexOf(date.year)}
                onSelect={handleYearChange}
                suffix='년'
              />
              <WheelColumn
                items={months}
                selectedIndex={date.month - 1}
                onSelect={handleMonthChange}
                suffix='월'
              />
              <WheelColumn
                items={days}
                selectedIndex={date.day - 1}
                onSelect={handleDayChange}
                suffix='일'
              />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
