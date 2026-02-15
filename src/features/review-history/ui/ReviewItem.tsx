import MoreVerticalIcon from '@/shared/ui/icons/MoreVertical.svg?react';

interface ReviewItemProps {
  placeName: string;
  date: string;
  content: string;
  images: string[];
  tags: string[];
  onMoreClick: () => void;
  onClick?: () => void;
}

export default function ReviewItem({
  placeName,
  date,
  content,
  images,
  tags,
  onMoreClick,
  onClick,
}: ReviewItemProps) {
  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoreClick();
  };

  const visibleTags = tags.slice(0, 1);
  const remainingTagsCount = tags.length - 1;

  return (
    <button type='button' onClick={onClick} className='flex w-full flex-col items-start text-left'>
      {/* 이미지 영역 */}
      <div className='flex w-full gap-4 overflow-x-auto'>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${placeName} 이미지 ${index + 1}`}
            className='h-[207px] w-[260px] shrink-0 rounded-[12px] object-cover'
          />
        ))}
      </div>

      {/* 카페 정보 */}
      <div className='flex w-full flex-col border-b border-[#efefef] py-4'>
        <div className='flex items-center justify-between'>
          <span className='text-body1 leading-[1.3] font-bold tracking-tight text-black'>
            {placeName}
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
        <span className='text-caption1 leading-[1.3] tracking-tight text-[#676767]'>{date}</span>
      </div>

      {/* 리뷰 내용 */}
      <div className='flex w-full flex-col gap-2 pt-3'>
        <p className='line-clamp-3 text-[12px] leading-[1.3] tracking-tight text-black'>
          {content}
        </p>
        <span className='text-[14px] leading-[1.3] tracking-tight text-[#868e96]'>더보기</span>

        {/* 태그 */}
        {tags.length > 0 && (
          <div className='flex items-center gap-1 pt-1'>
            {visibleTags.map((tag, index) => (
              <span
                key={index}
                className='rounded-full bg-[#EAE6E3] px-3 py-1 text-[12px] leading-[1.3] font-medium tracking-tight text-[#7F5D38]'
              >
                {tag}
              </span>
            ))}
            {remainingTagsCount > 0 && (
              <span className='rounded-full bg-[#EAE6E3] px-3 py-1 text-[12px] leading-[1.3] font-medium tracking-tight text-[#7F5D38]'>
                +{remainingTagsCount}
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  );
}
