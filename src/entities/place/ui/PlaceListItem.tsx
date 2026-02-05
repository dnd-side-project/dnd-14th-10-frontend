import HeartFilledIcon from '@/shared/ui/icons/HeartFilled.svg?react';

export interface PlaceListItemProps {
  name: string;
  location: string;
  likeCount: number;
  tags: string[];
  images: string[];
  onClick?: () => void;
}

export function PlaceListItem({
  name,
  location,
  likeCount,
  tags,
  images,
  onClick,
}: PlaceListItemProps) {
  return (
    <div className='flex w-full flex-col gap-3' onClick={onClick}>
      {/* 상단 정보 영역 */}
      <div className='flex flex-col gap-[8px] px-5'>
        {/* 이름 + 위치 */}
        <div className='flex items-center gap-[16px]'>
          <span className='text-body1 font-bold tracking-tight text-gray-950'>{name}</span>
          <span className='text-caption2 tracking-tight text-gray-600'>{location}</span>
        </div>

        {/* 좋아요 + 태그 */}
        <div className='flex items-center gap-5'>
          {/* 좋아요 */}
          <div className='flex items-center gap-1'>
            <HeartFilledIcon className='text-primary-700 size-[16px]' />
            <span className='text-caption2 text-primary-700 leading-none font-medium tracking-tight'>
              {likeCount}
            </span>
          </div>

          {/* 태그들 */}
          <div className='flex items-center gap-[18px]'>
            {tags.map((tag) => (
              <span
                key={tag}
                className='text-caption2 text-primary-600 leading-none font-medium tracking-tight'
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 이미지 갤러리 */}
      <div className='scrollbar-hide flex gap-3 overflow-x-auto px-5'>
        {images.map((image, index) => (
          <div key={index} className='h-[160px] w-[155px] shrink-0 overflow-hidden rounded-[12px]'>
            <img
              src={image}
              alt={`${name} 이미지 ${index + 1}`}
              className='h-full w-full object-cover'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
