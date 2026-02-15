import HeartIcon from '@/shared/ui/icons/Heart.svg?react';
import HeartFilledIcon from '@/shared/ui/icons/HeartFilled.svg?react';
import MoreVerticalIcon from '@/shared/ui/icons/MoreVertical.svg?react';

interface PlaceListItemProps {
  name: string;
  imageUrl?: string;
  likeCount: number;
  tags: string[];
  isLiked: boolean;
  onClick?: () => void;
  // 등록 장소용
  showMoreButton?: boolean;
  onMoreClick?: () => void;
  // 위시리스트용
  onHeartClick?: () => void;
}

export default function PlaceListItem({
  name,
  imageUrl,
  likeCount,
  tags,
  isLiked,
  onClick,
  showMoreButton = true,
  onMoreClick,
  onHeartClick,
}: PlaceListItemProps) {
  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoreClick?.();
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onHeartClick?.();
  };

  return (
    <div
      role='button'
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      className='flex w-full cursor-pointer items-center justify-between gap-6 text-left'
    >
      <div className='relative size-[160px] shrink-0'>
        {imageUrl ? (
          <img src={imageUrl} alt={name} className='size-full rounded-[12px] object-cover' />
        ) : (
          <div className='size-full rounded-[12px] bg-gray-400' />
        )}
        <div className='absolute top-3 right-3'>
          {onHeartClick ? (
            <button
              type='button'
              onClick={handleHeartClick}
              className='p-0'
              aria-label={isLiked ? '좋아요 취소' : '좋아요'}
            >
              {isLiked ? (
                <HeartFilledIcon className='size-7 text-gray-50' />
              ) : (
                <HeartIcon className='size-7 text-white drop-shadow-md' />
              )}
            </button>
          ) : isLiked ? (
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
            {showMoreButton && onMoreClick && (
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
            )}
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
    </div>
  );
}
