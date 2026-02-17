import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import SortDropdown from '@/features/registered-places/ui/SortDropdown';
import { mockWishlistItems } from '@/features/wishlist/model/mock-data';
import EmptyWishlist from '@/features/wishlist/ui/EmptyWishlist';
import ConfirmBottomSheet from '@/shared/ui/bottom-sheet/ConfirmBottomSheet';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';
import PlaceListItem from '@/shared/ui/place-list-item/PlaceListItem';

export default function WishlistPage() {
  const [isDeleteSheetOpen, setIsDeleteSheetOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handlePlaceClick = (item: (typeof mockWishlistItems)[0]) => {
    if (item.isDeleted) {
      navigate('/place-not-found');
    } else {
      navigate(`/place/${item.id}`);
    }
  };

  const handleHeartClick = (itemId: string) => {
    setSelectedItemId(itemId);
    setIsDeleteSheetOpen(true);
  };

  const handleDeleteConfirm = () => {
    // TODO: 삭제 API 호출
    console.log('Delete item:', selectedItemId);
    setIsDeleteSheetOpen(false);
    setSelectedItemId(null);
  };

  const hasItems = mockWishlistItems.length > 0;

  return (
    <div className='flex min-h-screen flex-col bg-white pt-6 pb-10'>
      <NavigationBar title='위시리스트' onBack={handleBack} />

      {hasItems ? (
        <div className='flex flex-col pt-6'>
          <div className='flex items-center justify-between px-5'>
            <SortDropdown value='최신순' />
          </div>

          <div className='mt-4.5 flex flex-col gap-5 px-5'>
            {mockWishlistItems.map((item) => (
              <PlaceListItem
                key={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                likeCount={item.likeCount}
                tags={item.tags}
                isLiked={item.isLiked}
                showMoreButton={false}
                onHeartClick={() => handleHeartClick(item.id)}
                onClick={() => handlePlaceClick(item)}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyWishlist />
      )}

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
