import type { Place } from '@/entities/place/model/place.types';

import { useRegistrationStore } from '../model/use-registration-store';

interface CompleteStepProps {
  placeId: Place['id'];
  placeName: string;
  placeCategory: string;
}

export function CompleteStep({ placeName, placeCategory }: CompleteStepProps) {
  const thumbnail = useRegistrationStore((state) => state.completeData.thumbnail);

  return (
    <div className='flex h-[calc(100vh-48px)] flex-col items-center justify-center bg-white'>
      <div className='flex flex-col items-center gap-[60px]'>
        <div className='text-center text-2xl leading-tight font-bold text-black'>
          장소가 등록되었습니다!
        </div>
        <div className='flex flex-col items-center gap-6'>
          <img
            className='h-60 w-60 rounded-xl border border-gray-300'
            src={thumbnail ?? ''}
            alt='placeholder'
          />
          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='text-center text-[22px] leading-snug font-bold text-black'>
              {placeName}
            </div>
            <div className='text-center text-lg leading-normal font-normal text-gray-500'>
              {placeCategory}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
