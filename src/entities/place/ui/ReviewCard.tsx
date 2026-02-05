import type { Review } from '../model/place.types';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const visibleTags = review.tags.slice(0, 1);
  const remainingCount = review.tags.length - 1;

  return (
    <div className='flex flex-col gap-[8px]'>
      <div className='flex items-center gap-[8px]'>
        <span className='text-sm font-bold'>{review.authorName}</span>
        <span className='text-[10px] text-gray-500'>{review.createdAt}</span>
      </div>
      <div className='flex items-center gap-3'>
        {review.imageUrl && (
          <img
            src={review.imageUrl}
            alt='리뷰 이미지'
            className='h-[100px] w-[100px] flex-shrink-0 rounded-lg border border-gray-300 object-cover'
          />
        )}
        <div className='flex flex-col gap-3'>
          <p className='line-clamp-3 text-xs leading-[1.3] text-gray-900'>{review.content}</p>
          <div className='flex items-center gap-1'>
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className='bg-primary-50 text-primary-700 rounded-full px-[8px] py-[4px] text-xs font-medium'
              >
                {tag}
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
