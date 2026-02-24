import StarIcon from '@/shared/ui/icons/Star.svg?react';

import type { PlaceReview } from '../model/place.types';

interface ReviewCardProps {
  review: PlaceReview;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const visibleTags = review.tags.slice(0, 1);
  const remainingCount = review.tags.length - 1;
  const primaryImage = review.images.find((img) => img.isPrimary) ?? review.images[0];

  return (
    <div className='flex flex-col gap-[8px]'>
      <div className='flex items-center gap-[8px]'>
        <span className='text-sm font-bold'>{review.userNickname}</span>
        <div className='flex items-center gap-0.5'>
          <StarIcon className='text-primary-700 h-3.5 w-3.5' />
          <span className='text-xs text-gray-700'>{review.rating}</span>
        </div>
        <span className='text-[10px] text-gray-500'>{formatDate(review.createdAt)}</span>
      </div>
      <div className='flex items-center gap-3'>
        {primaryImage && (
          <img
            src={primaryImage.imageUrl}
            alt='리뷰 이미지'
            className='h-[100px] w-[100px] flex-shrink-0 rounded-lg border border-gray-300 object-cover'
          />
        )}
        <div className='flex flex-col gap-3'>
          <p className='line-clamp-3 text-xs leading-[1.3] text-gray-900'>{review.content}</p>
          <div className='flex items-center gap-1'>
            {visibleTags.map((tag) => (
              <span
                key={tag.tagId}
                className='bg-primary-50 text-primary-700 rounded-full px-[8px] py-[4px] text-xs font-medium'
              >
                {tag.name}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className='bg-primary-50 text-primary-700 rounded-full px-[8px] py-[4px] text-xs font-medium'>
                +{remainingCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
