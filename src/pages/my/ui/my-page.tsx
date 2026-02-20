import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { logout } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/features/auth/model/use-auth-store';
import { createStatsData, mockMenuItems, mockRecentPlaces } from '@/features/my/model/mock-data';
import MenuSection from '@/features/my/ui/MenuSection';
import ProfileSection from '@/features/my/ui/ProfileSection';
import RecentPlacesSection from '@/features/my/ui/RecentPlacesSection';
import StatsSection from '@/features/my/ui/StatsSection';
import { useUserQuery } from '@/features/user/model/use-user-query';
import { getErrorMessage } from '@/shared/api/error.utils';
import ConfirmBottomSheet from '@/shared/ui/bottom-sheet/ConfirmBottomSheet';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

export default function MyPage() {
  const [isLogoutSheetOpen, setIsLogoutSheetOpen] = useState(false);
  const { data: user, isLoading } = useUserQuery();

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

  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogoutConfirm = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('로그아웃 실패:', getErrorMessage(error));
      // 서버 에러여도 로컬 상태는 초기화
    }
    clearAuth();
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

  const statsData = createStatsData({ placeCount: 0, reviewCount: 0, badgeCount: 0 });
  const menuItemsWithHandlers = mockMenuItems.map((item) => ({
    ...item,
    onClick: () => handleMenuClick(item.label),
  }));

  if (isLoading) {
    return (
      <div className='flex min-h-screen flex-col bg-white'>
        <NavigationBar title='MY' onBack={handleBack} />
        <div className='flex flex-1 items-center justify-center'>
          <div className='border-t-primary-500 h-8 w-8 animate-spin rounded-full border-4 border-gray-200' />
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <NavigationBar title='MY' onBack={handleBack} />

      <div className='flex flex-col pt-6'>
        <div className='flex flex-col gap-7 px-5'>
          <ProfileSection
            name={user?.nickname || ''}
            avatarUrl={user?.profileImg || undefined}
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
