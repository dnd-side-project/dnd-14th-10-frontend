import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import SortDropdown from '@/features/registered-places/ui/SortDropdown';
import { mockReviews } from '@/features/review-history/model/mock-data';
import EmptyReviews from '@/features/review-history/ui/EmptyReviews';
import ReviewItem from '@/features/review-history/ui/ReviewItem';
import { ActionMenuBottomSheet } from '@/shared/ui/bottom-sheet';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

export default function ReviewHistoryPage() {
  const [isManageSheetOpen, setIsManageSheetOpen] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleMoreClick = () => {
    setIsManageSheetOpen(true);
  };

  const handleReviewClick = (reviewId: string) => {
    // TODO: 리뷰 상세 페이지로 이동
    console.log('Review clicked:', reviewId);
  };

  const handleEdit = () => {
    // TODO: 리뷰 수정 페이지로 이동
    setIsManageSheetOpen(false);
  };

  const handleDelete = () => {
    // TODO: 삭제 API 호출
    setIsManageSheetOpen(false);
  };

  const hasReviews = mockReviews.length > 0;

  return (
    <div className='flex min-h-screen flex-col bg-white pt-6 pb-10'>
      <NavigationBar title='리뷰 히스토리' onBack={handleBack} />

      {hasReviews ? (
        <div className='flex flex-col pt-6'>
          <div className='flex items-center justify-between px-5'>
            <SortDropdown value='최신순' />
          </div>

          <div className='mt-4.5 flex flex-col gap-8 px-5'>
            {mockReviews.map((review) => (
              <ReviewItem
                key={review.id}
                placeName={review.placeName}
                date={review.date}
                content={review.content}
                images={review.images}
                tags={review.tags}
                onMoreClick={handleMoreClick}
                onClick={() => handleReviewClick(review.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyReviews />
      )}

      <ActionMenuBottomSheet
        isOpen={isManageSheetOpen}
        onClose={() => setIsManageSheetOpen(false)}
        title='리뷰 관리'
        items={[
          { label: '리뷰 수정', onClick: handleEdit },
          { label: '삭제', onClick: handleDelete, variant: 'danger' },
        ]}
      />
    </div>
  );
}
