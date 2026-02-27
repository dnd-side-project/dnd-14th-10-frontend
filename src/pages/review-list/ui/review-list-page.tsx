import { Suspense, useEffect, useRef } from 'react';

import { useParams } from 'react-router-dom';

import { usePlaceDetailQuery } from '@/entities/place/model/use-place-detail-query';
import { usePlaceReviewsInfiniteQuery } from '@/entities/place/model/use-place-reviews-infinite-query';
import { ReviewCard } from '@/entities/place/ui/ReviewCard';
import PlaceNotFoundPage from '@/pages/place-not-found/ui/place-not-found-page';
import PlaceErrorBoundary from '@/shared/ui/error-boundary/PlaceErrorBoundary';
import StarIcon from '@/shared/ui/icons/Star.svg?react';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

function ReviewListContent({ id }: { id: string }) {
  const { data: place } = usePlaceDetailQuery(id);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePlaceReviewsInfiniteQuery(id);

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const reviews = data.pages.flatMap((page) => page.content);
  const totalElements = data.pages[0]?.totalElements ?? 0;

  return (
    <div className='min-h-screen bg-white'>
      <NavigationBar backPath={`/place/${id}`} title={`${place.name} 리뷰`} />

      <div className='flex flex-col gap-5 p-5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-0.5'>
            <StarIcon className='text-primary-700 h-6 w-6' />
            <span className='text-lg font-medium'>{place.averageRating}</span>
          </div>
          <span className='text-base text-gray-700'>리뷰 {totalElements}개</span>
        </div>

        <div className='flex flex-col gap-5'>
          {reviews.map((review) => (
            <ReviewCard key={review.reviewId} review={review} />
          ))}
        </div>

        <div ref={sentinelRef} className='h-4' />

        {isFetchingNextPage && (
          <div className='flex justify-center py-4 text-sm text-gray-400'>로딩 중...</div>
        )}
      </div>
    </div>
  );
}

export default function ReviewListPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <PlaceNotFoundPage />;
  }

  return (
    <PlaceErrorBoundary>
      <Suspense
        fallback={
          <div className='flex min-h-screen items-center justify-center'>
            <span>로딩 중...</span>
          </div>
        }
      >
        <ReviewListContent id={id} />
      </Suspense>
    </PlaceErrorBoundary>
  );
}
