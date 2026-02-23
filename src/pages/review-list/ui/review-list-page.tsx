import { Suspense } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { usePlaceDetailQuery } from '@/entities/place/model/use-place-detail-query';
import { usePlaceReviewsQuery } from '@/entities/place/model/use-place-reviews-query';
import ReviewItem from '@/features/review-history/ui/ReviewItem';
import PlaceNotFoundPage from '@/pages/place-not-found/ui/place-not-found-page';
import PlaceErrorBoundary from '@/shared/ui/error-boundary/PlaceErrorBoundary';
import StarIcon from '@/shared/ui/icons/Star.svg?react';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

function ReviewListContent({ id }: { id: string }) {
  const navigate = useNavigate();
  const { data: place } = usePlaceDetailQuery(id);
  const { data: reviewsData } = usePlaceReviewsQuery(id, { page: 0, size: 20 });

  return (
    <div className='min-h-screen bg-white'>
      <NavigationBar onBack={() => navigate(-1)} title={`${place.name} 리뷰`} />

      <div className='flex flex-col gap-5 p-5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-0.5'>
            <StarIcon className='text-primary-700 h-6 w-6' />
            <span className='text-lg font-medium'>{place.averageRating}</span>
          </div>
          <span className='text-base text-gray-700'>리뷰 {reviewsData.totalElements}개</span>
        </div>

        <div className='flex flex-col gap-5'>
          {reviewsData.content.map((review) => (
            <ReviewItem
              key={review.reviewId}
              placeName={review.userNickname}
              date={new Date(review.createdAt).toLocaleDateString('ko-KR')}
              content={review.content}
              images={review.images.map((img) => img.imageUrl)}
              tags={review.tags.map((tag) => tag.name)}
              onMoreClick={() => {}}
            />
          ))}
        </div>
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
