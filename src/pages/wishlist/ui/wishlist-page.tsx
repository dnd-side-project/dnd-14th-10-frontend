import { useEffect, useState, useMemo } from 'react';

import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import {
  useMyWishlistsInfiniteQuery,
  useRemoveWishlistMutation,
  type WishlistSortType,
} from '@/entities/wishlist/model/use-wishlist-query';
import SortDropdown from '@/features/registered-places/ui/SortDropdown';
import EmptyWishlist from '@/features/wishlist/ui/EmptyWishlist';
import ActionMenuBottomSheet from '@/shared/ui/bottom-sheet/ActionMenuBottomSheet';
import ConfirmBottomSheet from '@/shared/ui/bottom-sheet/ConfirmBottomSheet';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';
import PlaceListItem from '@/shared/ui/place-list-item/PlaceListItem';

const MOOD_LABELS: Record<string, string> = {
  NOISY: '시끌벅적',
  CHATTING: '대화하기 좋은',
  CALM: '잔잔한',
  SILENT: '조용한',
};

const SIZE_LABELS: Record<string, string> = {
  SMALL: '소형',
  MEDIUM: '중형',
  LARGE: '대형',
};

const SORT_OPTIONS: { label: string; value: WishlistSortType }[] = [
  { label: '최신순', value: 'LATEST' },
  { label: '이름순', value: 'NAME' },
  { label: '인기순', value: 'POPULAR' },
];

export default function WishlistPage() {
  const [sortType, setSortType] = useState<WishlistSortType>('LATEST');
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
  const [isManageSheetOpen, setIsManageSheetOpen] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);

  const navigate = useNavigate();
  const { ref: loadMoreRef, inView } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyWishlistsInfiniteQuery(sortType);
  const removeWishlistMutation = useRemoveWishlistMutation();

  const allItems = useMemo(() => data?.pages.flatMap((page) => page.content) ?? [], [data]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSortClick = () => {
    setIsSortSheetOpen(true);
  };

  const handleSortSelect = (value: WishlistSortType) => {
    setSortType(value);
    setIsSortSheetOpen(false);
  };

  const handlePlaceClick = (placeId: number) => {
    navigate(`/place/${placeId}`);
  };

  const handleMoreClick = (placeId: number) => {
    setSelectedPlaceId(placeId);
    setIsManageSheetOpen(true);
  };

  const handleDelete = async () => {
    if (selectedPlaceId) {
      try {
        await removeWishlistMutation.mutateAsync(selectedPlaceId);
      } catch (error) {
        console.error('위시리스트 삭제 실패:', error);
      }
    }
    setIsManageSheetOpen(false);
    setSelectedPlaceId(null);
  };

  const hasItems = allItems.length > 0;
  const currentSortLabel = SORT_OPTIONS.find((opt) => opt.value === sortType)?.label ?? '최신순';

  if (isLoading) {
    return (
      <div className='flex min-h-screen flex-col bg-white'>
        <NavigationBar title='위시리스트' backPath='/' />
        <div className='flex flex-1 items-center justify-center'>
          <div className='border-t-primary-500 h-8 w-8 animate-spin rounded-full border-4 border-gray-200' />
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <NavigationBar title='위시리스트' backPath='/' />

      {hasItems ? (
        <div className='flex flex-col pt-6'>
          <div className='flex items-center justify-between px-5'>
            <SortDropdown value={currentSortLabel} onClick={handleSortClick} />
          </div>

          <div className='mt-4.5 flex flex-col gap-5 px-5'>
            {allItems.map((item) => {
              const tags = [
                `#${MOOD_LABELS[item.mood] || item.mood}`,
                `#${SIZE_LABELS[item.spaceSize] || item.spaceSize}`,
              ];

              return (
                <PlaceListItem
                  key={item.wishlistId}
                  name={item.placeName}
                  imageUrl={item.representativeImageUrl || undefined}
                  likeCount={item.wishCount}
                  tags={tags}
                  isLiked={true}
                  showMoreButton
                  onMoreClick={() => handleMoreClick(item.placeId)}
                  onClick={() => handlePlaceClick(item.placeId)}
                />
              );
            })}
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
        <EmptyWishlist />
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

      <ConfirmBottomSheet
        isOpen={isManageSheetOpen}
        onClose={() => setIsManageSheetOpen(false)}
        title='찜 삭제'
        message='위시리스트에서 삭제하시겠습니까?'
        confirmText='삭제'
        onConfirm={handleDelete}
      />
    </div>
  );
}
