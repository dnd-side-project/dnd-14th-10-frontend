import HeartFilledIcon from '@/shared/ui/icons/HeartFilled.svg?react';

interface RecentPlace {
  id: string;
  name: string;
  imageUrl: string;
  likeCount: number;
}

interface RecentPlacesSectionProps {
  places: RecentPlace[];
  onPlaceClick?: (id: string) => void;
}

export default function RecentPlacesSection({ places, onPlaceClick }: RecentPlacesSectionProps) {
  return (
    <div className='border-gray-150 flex flex-col gap-4 border-b px-5 py-8'>
      <h2 className='text-body1 font-bold tracking-tight text-gray-950'>최근 본 장소</h2>
      <div className='scrollbar-hide -mx-5 flex gap-4 overflow-x-auto px-5'>
        {places.map((place) => (
          <div
            key={place.id}
            className='flex w-[120px] shrink-0 cursor-pointer flex-col gap-2'
            onClick={() => onPlaceClick?.(place.id)}
          >
            <div className='aspect-square w-full overflow-hidden rounded-xl border border-gray-300'>
              <img src={place.imageUrl} alt={place.name} className='size-full object-cover' />
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-body1 font-medium tracking-tight text-gray-950'>
                {place.name}
              </span>
              <div className='flex items-center gap-1'>
                <HeartFilledIcon className='text-primary-700 size-4.5' />
                <span className='text-caption1 text-primary-700 tracking-tight'>
                  {place.likeCount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
