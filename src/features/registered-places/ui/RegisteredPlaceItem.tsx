import HeartIcon from '@/shared/ui/icons/Heart.svg?react';
import HeartFilledIcon from '@/shared/ui/icons/HeartFilled.svg?react';
import MoreVerticalIcon from '@/shared/ui/icons/MoreVertical.svg?react';

interface RegisteredPlaceItemProps {
  name: string;
  imageUrl?: string;
  likeCount: number;
  tags: string[];
  isLiked: boolean;
  onMoreClick: () => void;
  onClick?: () => void;
}

export default function RegisteredPlaceItem({
  name,
  imageUrl,
  likeCount,
  tags,
  isLiked,
  onMoreClick,
  onClick,
}: RegisteredPlaceItemProps) {
  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoreClick();
  };

  return (
    <button
      type='button'
      onClick={onClick}
      className='flex w-full items-center justify-between gap-6 text-left'
    >
      <div className='relative size-[160px] shrink-0'>
        {imageUrl ? (
          <img src={imageUrl} alt={name} className='size-full rounded-[12px] object-cover' />
        ) : (
          <div className='size-full rounded-[12px] bg-gray-400' />
        )}
        <div className='absolute top-3 right-3'>
          {isLiked ? (
            <HeartFilledIcon className='size-7 text-gray-50' />
          ) : (
            <HeartIcon className='size-7 text-white drop-shadow-md' />
          )}
        </div>
      </div>

      <div className='flex h-[160px] flex-1 flex-col justify-between py-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <span className='text-body1 leading-[1.3] font-bold tracking-tight text-gray-950'>
              {name}
            </span>
            <div
              role='button'
              tabIndex={0}
              onClick={handleMoreClick}
              onKeyDown={(e) =>
                e.key === 'Enter' && handleMoreClick(e as unknown as React.MouseEvent)
              }
              className='p-1'
            >
              <MoreVerticalIcon className='size-6 text-gray-950' />
            </div>
          </div>
          <div className='flex items-center gap-1'>
            <HeartFilledIcon className='text-primary-700 size-5' />
            <span className='text-caption1 text-primary-700 leading-[1.3] tracking-tight'>
              {likeCount}
            </span>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          {tags.map((tag, index) => (
            <span
              key={index}
              className='text-caption1 text-primary-600 leading-[1.3] font-medium tracking-tight'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
