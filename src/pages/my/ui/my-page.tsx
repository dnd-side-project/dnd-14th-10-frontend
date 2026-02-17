import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  createStatsData,
  mockMenuItems,
  mockRecentPlaces,
  mockUserData,
} from '@/features/my/model/mock-data';
import MenuSection from '@/features/my/ui/MenuSection';
import ProfileSection from '@/features/my/ui/ProfileSection';
import RecentPlacesSection from '@/features/my/ui/RecentPlacesSection';
import StatsSection from '@/features/my/ui/StatsSection';
import ConfirmBottomSheet from '@/shared/ui/bottom-sheet/ConfirmBottomSheet';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

export default function MyPage() {
  const [isLogoutSheetOpen, setIsLogoutSheetOpen] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditProfile = () => {
    navigate('/my/edit');
  };

  const handlePlaceClick = (id: string) => {
    navigate(`/place/${id}`);
  };

  const handleMenuClick = (label: string) => {
    switch (label) {
      case '공지사항':
        navigate('/announcement');
        break;
      case '로그아웃':
        setIsLogoutSheetOpen(true);
        break;
      default:
        break;
    }
  };

  const handleLogoutConfirm = () => {
    // TODO: 로그아웃 API 호출
    setIsLogoutSheetOpen(false);
    navigate('/login');
  };

  const handleStatClick = (label: string) => {
    switch (label) {
      case '장소 등록':
        navigate('/my/registered-places');
        break;
      case '리뷰':
        navigate('/my/reviews');
        break;
      case '배지':
        navigate('/my/badges');
        break;
      default:
        break;
    }
  };

  const statsData = createStatsData(mockUserData.stats);
  const menuItemsWithHandlers = mockMenuItems.map((item) => ({
    ...item,
    onClick: () => handleMenuClick(item.label),
  }));

  return (
    <div className='flex min-h-screen flex-col bg-white pt-6 pb-10'>
      <NavigationBar title='MY' onBack={handleBack} />

      <div className='flex flex-col pt-6'>
        <div className='flex flex-col gap-7 px-5'>
          <ProfileSection
            name={mockUserData.name}
            avatarUrl={mockUserData.avatarUrl}
            onEditClick={handleEditProfile}
          />
          <StatsSection stats={statsData} onStatClick={handleStatClick} />
        </div>

        <RecentPlacesSection places={mockRecentPlaces} onPlaceClick={handlePlaceClick} />

        <MenuSection items={menuItemsWithHandlers} />
      </div>

      <ConfirmBottomSheet
        isOpen={isLogoutSheetOpen}
        onClose={() => setIsLogoutSheetOpen(false)}
        title='로그아웃 확인'
        message='로그아웃 하시겠습니까?'
        confirmText='로그아웃'
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}
