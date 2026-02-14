import type { Place } from '@/entities/place/model/place.types';

interface CompleteStepProps {
  placeId: Place['id'];
  placeName: string;
  placeCategory?: '공공시설' | '카페';
}

export function CompleteStep({ placeName, placeCategory = '공공시설' }: CompleteStepProps) {
  return (
    <div className='flex h-[calc(100vh-48px)] flex-col items-center justify-center bg-white'>
      <div className='flex flex-col items-center gap-[60px]'>
        <div className='text-center text-2xl leading-tight font-bold text-black'>
          장소가 등록되었습니다!
        </div>
        <div className='flex flex-col items-center gap-6'>
          <img
            className='h-60 w-60 rounded-xl border border-gray-300'
            src='https://placehold.co/240x240'
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
