import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { mockRegisteredPlaces } from '@/features/registered-places/model/mock-data';
import EmptyRegisteredPlaces from '@/features/registered-places/ui/EmptyRegisteredPlaces';
import PlaceManageBottomSheet from '@/features/registered-places/ui/PlaceManageBottomSheet';
import RegisteredPlaceItem from '@/features/registered-places/ui/RegisteredPlaceItem';
import SortDropdown from '@/features/registered-places/ui/SortDropdown';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

export default function RegisteredPlacesPage() {
  const [isManageSheetOpen, setIsManageSheetOpen] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleMoreClick = () => {
    setIsManageSheetOpen(true);
  };

  const handlePlaceClick = (placeId: string) => {
    navigate(`/place/${placeId}`);
  };

  const handleEdit = () => {
    // TODO: 정보 수정 페이지로 이동
    setIsManageSheetOpen(false);
  };

  const handleDelete = () => {
    // TODO: 삭제 API 호출
    setIsManageSheetOpen(false);
  };

  const handleRegisterClick = () => {
    navigate('/registration');
  };

  const hasPlaces = mockRegisteredPlaces.length > 0;

  return (
    <div className='flex min-h-screen flex-col bg-white pt-6 pb-10'>
      <NavigationBar title='등록 장소 히스토리' onBack={handleBack} />

      {hasPlaces ? (
        <div className='flex flex-col pt-6'>
          <div className='flex items-center justify-between px-5'>
            <SortDropdown value='최신순' />
          </div>

          <div className='mt-4.5 flex flex-col gap-5 px-5'>
            {mockRegisteredPlaces.map((place) => (
              <RegisteredPlaceItem
                key={place.id}
                name={place.name}
                imageUrl={place.imageUrl}
                likeCount={place.likeCount}
                tags={place.tags}
                isLiked={place.isLiked}
                onMoreClick={handleMoreClick}
                onClick={() => handlePlaceClick(place.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyRegisteredPlaces onRegisterClick={handleRegisterClick} />
      )}

      <PlaceManageBottomSheet
        isOpen={isManageSheetOpen}
        onClose={() => setIsManageSheetOpen(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
