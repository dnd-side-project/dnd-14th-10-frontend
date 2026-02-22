import { useEffect, useState, useMemo } from 'react';

import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import {
  useMyWishlistsInfiniteQuery,
  useRemoveWishlistMutation,
  useWishCountsQueries,
  type WishlistSortType,
} from '@/entities/wishlist/model/use-wishlist-query';
import SortDropdown from '@/features/registered-places/ui/SortDropdown';
import EmptyWishlist from '@/features/wishlist/ui/EmptyWishlist';
import { getImageUrl } from '@/shared/lib/image-utils';
import ActionMenuBottomSheet from '@/shared/ui/bottom-sheet/ActionMenuBottomSheet';
import ConfirmBottomSheet from '@/shared/ui/bottom-sheet/ConfirmBottomSheet';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';
import PlaceListItem from '@/shared/ui/place-list-item/PlaceListItem';

const SORT_OPTIONS: { label: string; value: WishlistSortType }[] = [
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'popularity' },
];

export default function WishlistPage() {
  const [sortType, setSortType] = useState<WishlistSortType>('latest');
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
  const [isDeleteSheetOpen, setIsDeleteSheetOpen] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);

  const navigate = useNavigate();
  const { ref: loadMoreRef, inView } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyWishlistsInfiniteQuery(sortType);
  const removeWishlistMutation = useRemoveWishlistMutation();

  const allItems = useMemo(() => data?.pages.flatMap((page) => page.content) ?? [], [data]);
  const placeIds = useMemo(() => allItems.map((item) => item.placeId), [allItems]);
  const wishCountsQueries = useWishCountsQueries(placeIds);

  const wishCountMap = useMemo(() => {
    const map = new Map<number, number>();
    wishCountsQueries.forEach((query) => {
      if (query.data) {
        map.set(query.data.placeId, query.data.wishCount);
      }
    });
    return map;
  }, [wishCountsQueries]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleBack = () => {
    navigate(-1);
  };

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

  const handleHeartClick = (placeId: number) => {
    setSelectedPlaceId(placeId);
    setIsDeleteSheetOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedPlaceId) {
      try {
        await removeWishlistMutation.mutateAsync(selectedPlaceId);
      } catch (error) {
        console.error('위시리스트 삭제 실패:', error);
      }
    }
    setIsDeleteSheetOpen(false);
    setSelectedPlaceId(null);
  };

  const hasItems = allItems.length > 0;
  const currentSortLabel = SORT_OPTIONS.find((opt) => opt.value === sortType)?.label ?? '최신순';

  if (isLoading) {
    return (
      <div className='flex min-h-screen flex-col bg-white'>
        <NavigationBar title='위시리스트' onBack={handleBack} />
        <div className='flex flex-1 items-center justify-center'>
          <div className='border-t-primary-500 h-8 w-8 animate-spin rounded-full border-4 border-gray-200' />
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <NavigationBar title='위시리스트' onBack={handleBack} />

      {hasItems ? (
        <div className='flex flex-col pt-6'>
          <div className='flex items-center justify-between px-5'>
            <SortDropdown value={currentSortLabel} onClick={handleSortClick} />
          </div>

          <div className='mt-4.5 flex flex-col gap-5 px-5'>
            {allItems.map((item) => (
              <PlaceListItem
                key={item.wishlistId}
                name={item.placeName}
                imageUrl={getImageUrl(item.representativeImageKey)}
                likeCount={wishCountMap.get(item.placeId) ?? 0}
                tags={[item.addressDetail]}
                isLiked={true}
                showMoreButton={false}
                onHeartClick={() => handleHeartClick(item.placeId)}
                onClick={() => handlePlaceClick(item.placeId)}
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
        isOpen={isDeleteSheetOpen}
        onClose={() => setIsDeleteSheetOpen(false)}
        title='위시리스트 삭제'
        message='위시리스트에서 삭제하시겠습니까?'
        confirmText='삭제'
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
