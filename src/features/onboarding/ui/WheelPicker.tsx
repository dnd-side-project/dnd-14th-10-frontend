import { memo, useCallback, useEffect, useRef, useState } from 'react';

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

// 애니메이션 설정
const FRICTION = 0.92; // 마찰 계수 (1에 가까울수록 오래 미끄러짐)
const MIN_VELOCITY = 0.5; // 최소 속도 (이 이하면 스냅)
const SNAP_DURATION = 300; // 스냅 애니메이션 지속시간 (ms)

// 값 제한 유틸리티
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

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
  const contentRef = useRef<HTMLDivElement>(null);

  // 터치/드래그 관련 ref
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const lastTouchY = useRef(0);
  const lastTouchTime = useRef(0);
  const currentTranslateY = useRef(0);
  const velocityRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);

  // translateY 경계 계산
  const minTranslateY = -((items.length - 1) * ITEM_HEIGHT);
  const maxTranslateY = 0;

  // DOM에 translateY 적용
  const applyTranslateY = useCallback((y: number) => {
    if (contentRef.current) {
      contentRef.current.style.transform = `translateY(${y}px)`;
    }
  }, []);

  // 진행 중인 애니메이션 취소
  const cancelAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    isAnimatingRef.current = false;
  }, []);

  // 특정 위치로 부드럽게 이동 (스냅 애니메이션)
  const animateToPosition = useCallback(
    (targetY: number, onComplete?: () => void) => {
      cancelAnimation();
      isAnimatingRef.current = true;

      const startY = currentTranslateY.current;
      const distance = targetY - startY;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / SNAP_DURATION, 1);

        // easeOutCubic 이징 함수
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const newY = startY + distance * easeProgress;

        currentTranslateY.current = newY;
        applyTranslateY(newY);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          currentTranslateY.current = targetY;
          applyTranslateY(targetY);
          isAnimatingRef.current = false;
          animationRef.current = null;
          onComplete?.();
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    },
    [applyTranslateY, cancelAnimation],
  );

  // 가장 가까운 아이템으로 스냅
  const snapToNearest = useCallback(() => {
    const targetIndex = Math.round(-currentTranslateY.current / ITEM_HEIGHT);
    const clampedIndex = clamp(targetIndex, 0, items.length - 1);
    const targetY = -clampedIndex * ITEM_HEIGHT;

    animateToPosition(targetY, () => {
      if (clampedIndex !== selectedIndex) {
        onSelect(clampedIndex);
      }
    });
  }, [items.length, selectedIndex, onSelect, animateToPosition]);

  // 관성 스크롤 애니메이션 (ref 패턴으로 재귀 호출 해결)
  const animateMomentumRef = useRef<() => void>(() => {});

  const animateMomentum = useCallback(() => {
    velocityRef.current *= FRICTION;
    const newY = currentTranslateY.current + velocityRef.current;
    currentTranslateY.current = clamp(newY, minTranslateY, maxTranslateY);
    applyTranslateY(currentTranslateY.current);

    // 경계에 도달하면 속도 0으로
    if (newY <= minTranslateY || newY >= maxTranslateY) {
      velocityRef.current = 0;
    }

    if (Math.abs(velocityRef.current) < MIN_VELOCITY) {
      snapToNearest();
      return;
    }

    animationRef.current = requestAnimationFrame(animateMomentumRef.current);
  }, [minTranslateY, maxTranslateY, applyTranslateY, snapToNearest]);

  // 최신 animateMomentum 함수를 ref에 저장
  useEffect(() => {
    animateMomentumRef.current = animateMomentum;
  }, [animateMomentum]);

  // 터치 시작
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      cancelAnimation();
      const touch = e.touches[0];
      touchStartY.current = touch.clientY;
      touchStartTime.current = performance.now();
      lastTouchY.current = touch.clientY;
      lastTouchTime.current = performance.now();
      velocityRef.current = 0;
    },
    [cancelAnimation],
  );

  // 터치 이동
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      const currentTime = performance.now();
      const deltaY = touch.clientY - lastTouchY.current;
      const deltaTime = currentTime - lastTouchTime.current;

      // 속도 계산 (px/ms)
      if (deltaTime > 0) {
        velocityRef.current = (deltaY / deltaTime) * 16; // 60fps 기준으로 정규화
      }

      // 새 위치 계산 및 경계 제한
      const newY = currentTranslateY.current + deltaY;
      currentTranslateY.current = clamp(newY, minTranslateY, maxTranslateY);
      applyTranslateY(currentTranslateY.current);

      lastTouchY.current = touch.clientY;
      lastTouchTime.current = currentTime;
    },
    [minTranslateY, maxTranslateY, applyTranslateY],
  );

  // 터치 종료
  const handleTouchEnd = useCallback(() => {
    isAnimatingRef.current = true;

    // 속도가 충분하면 관성 스크롤, 아니면 바로 스냅
    if (Math.abs(velocityRef.current) > MIN_VELOCITY) {
      animationRef.current = requestAnimationFrame(animateMomentum);
    } else {
      snapToNearest();
    }
  }, [animateMomentum, snapToNearest]);

  // 마우스 휠 처리 (ref에 저장하여 최신 상태 유지)
  const containerRef = useRef<HTMLDivElement>(null);
  const handleWheelRef = useRef<(e: WheelEvent) => void>(() => {});

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      cancelAnimation();

      const deltaY = -e.deltaY;
      const newY = currentTranslateY.current + deltaY;
      currentTranslateY.current = clamp(newY, minTranslateY, maxTranslateY);
      applyTranslateY(currentTranslateY.current);

      // 휠 종료 후 스냅 (디바운스)
      velocityRef.current = deltaY * 0.3;
      if (Math.abs(velocityRef.current) > MIN_VELOCITY) {
        animationRef.current = requestAnimationFrame(animateMomentum);
      } else {
        snapToNearest();
      }
    },
    [
      cancelAnimation,
      minTranslateY,
      maxTranslateY,
      applyTranslateY,
      animateMomentum,
      snapToNearest,
    ],
  );

  // 최신 handleWheel 함수를 ref에 저장
  useEffect(() => {
    handleWheelRef.current = handleWheel;
  }, [handleWheel]);

  // 네이티브 휠 이벤트 리스너 등록 (passive: false)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wheelHandler = (e: WheelEvent) => {
      handleWheelRef.current(e);
    };

    container.addEventListener('wheel', wheelHandler, { passive: false });
    return () => {
      container.removeEventListener('wheel', wheelHandler);
    };
  }, []);

  // 아이템 클릭
  const handleItemClick = useCallback(
    (index: number) => {
      cancelAnimation();
      const targetY = -index * ITEM_HEIGHT;
      animateToPosition(targetY, () => {
        onSelect(index);
      });
    },
    [cancelAnimation, animateToPosition, onSelect],
  );

  // selectedIndex 변경 시 해당 위치로 이동
  useEffect(() => {
    if (!isAnimatingRef.current) {
      const targetY = -selectedIndex * ITEM_HEIGHT;
      if (Math.abs(currentTranslateY.current - targetY) > 1) {
        animateToPosition(targetY);
      }
    }
  }, [selectedIndex, animateToPosition]);

  // 초기 위치 설정 (마운트 시 1회만 실행)
  useEffect(() => {
    const initialY = -selectedIndex * ITEM_HEIGHT;
    currentTranslateY.current = initialY;
    applyTranslateY(initialY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 컴포넌트 언마운트 시 애니메이션 정리
  useEffect(() => {
    return () => {
      cancelAnimation();
    };
  }, [cancelAnimation]);

  return (
    <div
      ref={containerRef}
      className='scrollbar-hide relative flex-1 touch-none overflow-hidden'
      style={{ height: WHEEL_HEIGHT }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={contentRef}
        style={{
          paddingTop: ITEM_HEIGHT * 2,
          paddingBottom: ITEM_HEIGHT * 2,
        }}
      >
        {items.map((item, index) => {
          const style = getItemStyle(index, selectedIndex);

          return (
            <div
              key={item}
              className='flex cursor-pointer items-center justify-center transition-all duration-200'
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
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()} handleOnly>
      <DrawerContent showOverlay hideHandle className='mb-5 border-none bg-transparent'>
        <DrawerTitle className='sr-only'>생년월일 선택</DrawerTitle>
        <div className='mx-auto w-full max-w-[350px] rounded-xl bg-white pb-6'>
          <div
            data-vaul-handle
            className='mx-auto mt-4 h-1 w-[42px] cursor-grab rounded-full bg-gray-300 active:cursor-grabbing'
          />

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
