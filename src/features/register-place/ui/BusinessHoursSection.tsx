import { useRef } from 'react';

import { useFormContext } from 'react-hook-form';

import type { DetailFormValues } from './DetailInputStep';
import { SectionCard } from './SectionCard';

function formatTime(value: string | undefined) {
  if (!value) return null;
  const [h, m] = value.split(':').map(Number);
  const period = h < 12 ? '오전' : '오후';
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${period} ${hour12}:${m.toString().padStart(2, '0')}`;
}

export function BusinessHoursSection() {
  const { register, watch } = useFormContext<DetailFormValues>();
  const openTime = watch('openTime');
  const closeTime = watch('closeTime');
  const openTimeRef = useRef<HTMLInputElement | null>(null);
  const closeTimeRef = useRef<HTMLInputElement | null>(null);

  const openTimeRegister = register('openTime');
  const closeTimeRegister = register('closeTime');

  return (
    <SectionCard>
      <h2 className='text-[22px] font-bold text-gray-950'>영업 시간</h2>
      <div className='mt-3 flex items-end gap-3'>
        <div className='flex flex-col gap-1'>
          <span className='text-[10px] font-medium text-gray-600'>시작 시간</span>
          <div className='relative h-[37px]' onClick={() => openTimeRef.current?.showPicker()}>
            <input
              type='time'
              {...openTimeRegister}
              ref={(e) => {
                openTimeRegister.ref(e);
                openTimeRef.current = e;
              }}
              className='absolute inset-0 opacity-0'
            />
            <span
              className={`bg-gray-150 flex h-full w-full items-center rounded-md px-5 text-base ${openTime ? 'text-gray-950' : 'text-gray-400'}`}
            >
              {formatTime(openTime) || '시작 시간 입력'}
            </span>
          </div>
        </div>
        <span className='pb-2 text-[22px] font-medium text-gray-700'>~</span>
        <div className='flex flex-col gap-1'>
          <span className='text-[10px] font-medium text-gray-600'>마감 시간</span>
          <div className='relative h-[37px]' onClick={() => closeTimeRef.current?.showPicker()}>
            <input
              type='time'
              {...closeTimeRegister}
              ref={(e) => {
                closeTimeRegister.ref(e);
                closeTimeRef.current = e;
              }}
              className='absolute inset-0 opacity-0'
            />
            <span
              className={`bg-gray-150 flex h-full w-full items-center rounded-md px-5 text-base ${closeTime ? 'text-gray-950' : 'text-gray-400'}`}
            >
              {formatTime(closeTime) || '마감 시간 입력'}
            </span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
