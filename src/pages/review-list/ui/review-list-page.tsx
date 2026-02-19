import { Suspense } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { usePlaceDetailQuery } from '@/entities/place/model/use-place-detail-query';
import { ReviewCard } from '@/entities/place/ui/ReviewCard';
import StarIcon from '@/shared/ui/icons/Star.svg?react';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

function ReviewListContent({ id }: { id: string }) {
  const navigate = useNavigate();
  const { data: place } = usePlaceDetailQuery(id);

  return (
    <div className='min-h-screen bg-white'>
      <NavigationBar onBack={() => navigate(-1)} title={`${place.name} 리뷰`} />

      <div className='flex flex-col gap-5 p-5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-0.5'>
            <StarIcon className='text-primary-700 h-6 w-6' />
            <span className='text-lg font-medium'>{place.rating}</span>
          </div>
          <span className='text-base text-gray-700'>리뷰 {place.reviewCount}개</span>
        </div>

        <div className='flex flex-col gap-5'>
          {place.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ReviewListPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <span>페이지를 찾을 수 없습니다.</span>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className='flex min-h-screen items-center justify-center'>
          <span>로딩 중...</span>
        </div>
      }
    >
      <ReviewListContent id={id} />
    </Suspense>
  );
}
