import { useFormContext } from 'react-hook-form';

import FloorIcon from '@/shared/ui/icons/Floor.svg?react';
import RestroomIcon from '@/shared/ui/icons/Restroom.svg?react';

import type { DetailFormValues } from './DetailInputStep';
import { SectionCard } from './SectionCard';

export function AdditionalInfoSection() {
  const { register } = useFormContext<DetailFormValues>();

  return (
    <SectionCard>
      <div className='space-y-7'>
        {/* 화장실 위치 */}
        <div className='space-y-3'>
          <div className='flex items-center gap-1'>
            <RestroomIcon className='h-5 w-5 text-[#7F5D38]' />
            <span className='text-base font-medium text-gray-950'>화장실 위치</span>
          </div>
          <input
            type='text'
            placeholder='예) 1층, 외부에 있어요'
            {...register('restroomInfo')}
            className='bg-gray-150 focus:ring-primary-500 w-full rounded-lg px-4 py-3 text-base text-gray-950 placeholder:text-gray-500 focus:ring-1 focus:outline-none'
          />
        </div>

        {/* 층수 정보 */}
        <div className='space-y-3'>
          <div className='flex items-center gap-1'>
            <FloorIcon className='h-5 w-5 text-[#7F5D38]' />
            <span className='text-base font-medium text-gray-950'>층수 정보</span>
          </div>
          <input
            type='text'
            placeholder='예) 1층-3층'
            {...register('floorInfo')}
            className='bg-gray-150 focus:ring-primary-500 w-full rounded-lg px-4 py-3 text-base text-gray-950 placeholder:text-gray-500 focus:ring-1 focus:outline-none'
          />
        </div>
      </div>
    </SectionCard>
  );
}
