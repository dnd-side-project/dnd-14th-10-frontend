import { useEffect, useRef, useState } from 'react';

import MoreVerticalIcon from '@/shared/ui/icons/MoreVertical.svg?react';

interface ReviewItemProps {
  placeId: number;
  placeName: string;
  date: string;
  content: string;
  images: string[];
  tags: string[];
  onMoreClick: () => void;
  onCardClick: (placeId: number) => void;
}

export default function ReviewItem({
  placeId,
  placeName,
  date,
  content,
  images,
  tags,
  onMoreClick,
  onCardClick,
}: ReviewItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      setIsTruncated(el.scrollHeight > el.clientHeight);
    }
  }, [content]);

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoreClick();
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  const handleCardClick = () => {
    onCardClick(placeId);
  };

  const visibleTags = tags.slice(0, 1);
  const remainingTagsCount = tags.length - 1;

  return (
    <button
      type='button'
      onClick={handleCardClick}
      className='flex w-full flex-col items-start text-left'
    >
      {/* 이미지 영역 */}
      {images.length > 0 && (
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
      )}

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
        <p
          ref={contentRef}
          className={`text-[12px] leading-[1.3] tracking-tight text-black ${
            isExpanded ? '' : 'line-clamp-3'
          }`}
        >
          {content}
        </p>
        {isTruncated && (
          <button
            type='button'
            onClick={handleExpandClick}
            className='self-start text-[14px] leading-[1.3] tracking-tight text-gray-500'
          >
            {isExpanded ? '접기' : '더보기'}
          </button>
        )}

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
