import type { LocationData } from '../model/use-registration-store';

interface PlaceSummarySectionProps {
  location: LocationData;
}

export function PlaceSummarySection({ location }: PlaceSummarySectionProps) {
  return (
    <div className='flex items-center gap-3 pt-4'>
      {/* <div className='flex h-[60px] w-[60px] items-center justify-center rounded-lg bg-gray-100'>
        <span className='text-3xl'>{category === 'CAFE' ? '☕' : '🏛️'}</span>
      </div> */}
      <div className='flex flex-col gap-2'>
        <span className='text-[22px] font-bold text-gray-950'>
          {location.placeName || '장소명'}
        </span>
        <span className='text-sm text-gray-950'>{location.roadAddress || location.address}</span>
      </div>
    </div>
  );
}
