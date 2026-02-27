import { useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import {
  useMyReviewsInfiniteQuery,
  useDeleteReviewMutation,
  type ReviewSortType,
} from '@/entities/review/model/use-my-reviews-query';
import SortDropdown from '@/features/registered-places/ui/SortDropdown';
import EmptyReviews from '@/features/review-history/ui/EmptyReviews';
import ReviewItem from '@/features/review-history/ui/ReviewItem';
import ActionMenuBottomSheet from '@/shared/ui/bottom-sheet/ActionMenuBottomSheet';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

const SORT_OPTIONS: { label: string; value: ReviewSortType }[] = [
  { label: '최신순', value: 'latest' },
  { label: '이름순', value: 'name' },
];

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export default function ReviewHistoryPage() {
  const [sortType, setSortType] = useState<ReviewSortType>('latest');
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
  const [isManageSheetOpen, setIsManageSheetOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);

  const navigate = useNavigate();
  const { ref: loadMoreRef, inView } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyReviewsInfiniteQuery(sortType);
  const deleteReviewMutation = useDeleteReviewMutation();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSortClick = () => {
    setIsSortSheetOpen(true);
  };

  const handleSortSelect = (value: ReviewSortType) => {
    setSortType(value);
    setIsSortSheetOpen(false);
  };

  const handleMoreClick = (reviewId: number) => {
    setSelectedReviewId(reviewId);
    setIsManageSheetOpen(true);
  };

  const handleCardClick = (placeId: number) => {
    navigate(`/place/${placeId}/reviews`);
  };

  const handleEdit = () => {
    setIsManageSheetOpen(false);
    if (selectedReviewId) {
      navigate(`/my/reviews/${selectedReviewId}/edit`);
    }
  };

  const handleDelete = async () => {
    if (!selectedReviewId) return;

    setIsManageSheetOpen(false);

    try {
      await deleteReviewMutation.mutateAsync(selectedReviewId);
      setSelectedReviewId(null);
    } catch (error) {
      console.error('리뷰 삭제 실패:', error);
      alert('리뷰 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const allReviews = data?.pages.flatMap((page) => page.content) ?? [];
  const hasReviews = allReviews.length > 0;

  const currentSortLabel = SORT_OPTIONS.find((opt) => opt.value === sortType)?.label ?? '최신순';

  if (isLoading) {
    return (
      <div className='flex min-h-screen flex-col bg-white'>
        <NavigationBar title='리뷰 히스토리' backPath='/my' />
        <div className='flex flex-1 items-center justify-center'>
          <div className='border-t-primary-500 h-8 w-8 animate-spin rounded-full border-4 border-gray-200' />
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <NavigationBar title='리뷰 히스토리' backPath='/my' />

      {hasReviews ? (
        <div className='flex flex-col pt-6'>
          <div className='flex items-center justify-between px-5'>
            <SortDropdown value={currentSortLabel} onClick={handleSortClick} />
          </div>

          <div className='mt-4.5 flex flex-col gap-8 px-5'>
            {allReviews.map((review) => (
              <ReviewItem
                key={review.reviewId}
                placeId={review.placeId}
                placeName={review.userNickname}
                date={formatDate(review.createdAt)}
                content={review.content}
                images={review.images.map((img) => img.imageUrl)}
                tags={review.tags.map((tag) => tag.name)}
                onMoreClick={() => handleMoreClick(review.reviewId)}
                onCardClick={handleCardClick}
              />
            ))}
          </div>

          <div ref={loadMoreRef} className='h-10'>
            {isFetchingNextPage && (
              <div className='flex justify-center py-4'>
                <div className='border-t-primary-500 h-6 w-6 animate-spin rounded-full border-4 border-gray-200' />
              </div>
            )}
          </div>
        </div>
      ) : (
        <EmptyReviews />
      )}

      <ActionMenuBottomSheet
        isOpen={isSortSheetOpen}
        onClose={() => setIsSortSheetOpen(false)}
        title='정렬'
        items={SORT_OPTIONS.map((opt) => ({
          label: opt.label,
          onClick: () => handleSortSelect(opt.value),
        }))}
      />

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
