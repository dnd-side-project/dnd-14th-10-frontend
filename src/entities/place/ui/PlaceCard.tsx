import { cn } from '@/lib/utils';
import HeartIcon from '@/shared/ui/icons/Heart.svg?react';
import HeartFilledIcon from '@/shared/ui/icons/HeartFilled.svg?react';

interface PlaceCardProps {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  isLiked?: boolean;
  onLikeClick?: (e: React.MouseEvent) => void;
  onClick?: () => void;
  className?: string;
}

export function PlaceCard({
  name,
  location,
  imageUrl,
  isLiked = false,
  onLikeClick,
  onClick,
  className,
}: PlaceCardProps) {
  return (
    <div
      className={cn('flex w-[142px] shrink-0 cursor-pointer flex-col gap-2.5', className)}
      onClick={onClick}
    >
      <div className='relative h-[142px] w-full overflow-hidden rounded-[12px]'>
        <img src={imageUrl} alt={name} draggable={false} className='size-full object-cover' />
        <button
          type='button'
          onClick={onLikeClick}
          className='absolute top-2.5 right-2.5 flex size-7 items-center justify-center'
        >
          {isLiked ? (
            <HeartFilledIcon className='size-7 text-gray-50' />
          ) : (
            <HeartIcon className='size-7 text-white drop-shadow-md' />
          )}
        </button>
      </div>

      <div className='flex flex-col gap-1 px-1'>
        <span className='text-body2 font-medium tracking-tight text-gray-950'>{name}</span>
        <span className='text-caption2 tracking-tight text-gray-950'>{location}</span>
      </div>
    </div>
  );
}
