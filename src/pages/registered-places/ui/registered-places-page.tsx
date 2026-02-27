import { useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import { type PlaceSortType } from '@/entities/place/api/my-places.api';
import { useDeletePlaceMutation } from '@/entities/place/model/use-delete-place-mutation';
import { useMyPlacesInfiniteQuery } from '@/entities/place/model/use-my-places-query';
import EmptyRegisteredPlaces from '@/features/registered-places/ui/EmptyRegisteredPlaces';
import SortDropdown from '@/features/registered-places/ui/SortDropdown';
import { getErrorMessage } from '@/shared/api/error.utils';
import ActionMenuBottomSheet from '@/shared/ui/bottom-sheet/ActionMenuBottomSheet';
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

export default function RegisteredPlacesPage() {
  const [isManageSheetOpen, setIsManageSheetOpen] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const [sortType, setSortType] = useState<PlaceSortType>('LATEST');

  const navigate = useNavigate();
  const { ref: loadMoreRef, inView } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyPlacesInfiniteQuery(sortType);
  const deletePlaceMutation = useDeletePlaceMutation();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleMoreClick = (placeId: number) => {
    setSelectedPlaceId(placeId);
    setIsManageSheetOpen(true);
  };

  const handlePlaceClick = (placeId: number) => {
    navigate(`/place/${placeId}`);
  };

  const handleEdit = () => {
    if (selectedPlaceId) {
      navigate(`/place/${selectedPlaceId}/edit`);
    }
    setIsManageSheetOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedPlaceId) return;

    setIsManageSheetOpen(false);

    try {
      await deletePlaceMutation.mutateAsync(selectedPlaceId);
      setSelectedPlaceId(null);
    } catch (error) {
      console.error('장소 삭제 실패:', getErrorMessage(error));
      alert(`장소 삭제에 실패했습니다.\n${getErrorMessage(error)}`);
    }
  };

  const handleRegisterClick = () => {
    navigate('/registration');
  };

  const handleSortChange = (value: string) => {
    setSortType(value as PlaceSortType);
  };

  const places = data?.pages.flatMap((page) => page.content) ?? [];
  const hasPlaces = places.length > 0;

  const SORT_LABELS: Record<PlaceSortType, string> = {
    LATEST: '최신순',
    NAME: '이름순',
    POPULAR: '인기순',
  };

  if (isLoading) {
    return (
      <div className='flex min-h-screen flex-col bg-white'>
        <NavigationBar title='등록 장소 히스토리' backPath='/my' />
        <div className='flex flex-1 items-center justify-center'>
          <div className='border-t-primary-500 h-8 w-8 animate-spin rounded-full border-4 border-gray-200' />
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <NavigationBar title='등록 장소 히스토리' backPath='/my' />

      {hasPlaces ? (
        <div className='flex flex-col pt-6'>
          <div className='flex items-center justify-between px-5'>
            <SortDropdown
              value={SORT_LABELS[sortType]}
              onClick={() => {
                const sortOptions: PlaceSortType[] = ['LATEST', 'NAME', 'POPULAR'];
                const currentIndex = sortOptions.indexOf(sortType);
                const nextIndex = (currentIndex + 1) % sortOptions.length;
                handleSortChange(sortOptions[nextIndex]);
              }}
            />
          </div>

          <div className='mt-4.5 flex flex-col gap-5 px-5'>
            {places.map((place) => {
              const tags = [
                `#${MOOD_LABELS[place.mood] || place.mood}`,
                `#${SIZE_LABELS[place.spaceSize] || place.spaceSize}`,
              ];

              return (
                <PlaceListItem
                  key={place.placeId}
                  name={place.placeName}
                  imageUrl={place.representativeImageUrl || undefined}
                  likeCount={place.wishCount}
                  tags={tags}
                  isLiked={place.wished}
                  showMoreButton
                  onMoreClick={() => handleMoreClick(place.placeId)}
                  onClick={() => handlePlaceClick(place.placeId)}
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
        <EmptyRegisteredPlaces onRegisterClick={handleRegisterClick} />
      )}

      <ActionMenuBottomSheet
        isOpen={isManageSheetOpen}
        onClose={() => setIsManageSheetOpen(false)}
        title='장소 관리'
        items={[
          { label: '정보 수정', onClick: handleEdit },
          { label: '삭제', onClick: handleDelete, variant: 'danger' },
        ]}
      />
    </div>
  );
}
