import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useMyHistoriesQuery } from '@/entities/history/model/use-my-histories-query';
import { useUserQuery } from '@/entities/user/model/use-user-query';
import { logout } from '@/features/auth/api/auth.api';
import { createStatsData, mockMenuItems } from '@/features/my/model/mock-data';
import MenuSection from '@/features/my/ui/MenuSection';
import ProfileSection from '@/features/my/ui/ProfileSection';
import RecentPlacesSection from '@/features/my/ui/RecentPlacesSection';
import StatsSection from '@/features/my/ui/StatsSection';
import { getErrorMessage } from '@/shared/api/error.utils';
import { getImageUrl } from '@/shared/lib/image-utils';
import { useAuthStore } from '@/shared/store/use-auth-store';
import ConfirmBottomSheet from '@/shared/ui/bottom-sheet/ConfirmBottomSheet';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

export default function MyPage() {
  const [isLogoutSheetOpen, setIsLogoutSheetOpen] = useState(false);
  const { data: user, isLoading: isUserLoading } = useUserQuery();
  const { data: historiesData, isLoading: isHistoriesLoading } = useMyHistoriesQuery(10);

  const navigate = useNavigate();

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

  const statsData = createStatsData({
    placeCount: user?.placeCount ?? 0,
    reviewCount: user?.reviewCount ?? 0,
    badgeCount: user?.badgeCount ?? 0,
  });

  const recentPlaces = (historiesData?.content ?? []).map((history) => ({
    id: String(history.placeId),
    name: history.placeName,
    imageUrl: getImageUrl(history.representativeImageKey),
    likeCount: 0,
  }));

  const menuItemsWithHandlers = mockMenuItems.map((item) => ({
    ...item,
    onClick: () => handleMenuClick(item.label),
  }));

  const isLoading = isUserLoading || isHistoriesLoading;

  if (isLoading) {
    return (
      <div className='flex min-h-screen flex-col bg-white'>
        <NavigationBar title='MY' backPath='/' />
        <div className='flex flex-1 items-center justify-center'>
          <div className='border-t-primary-500 h-8 w-8 animate-spin rounded-full border-4 border-gray-200' />
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <NavigationBar title='MY' backPath='/' />

      <div className='flex flex-col pt-6'>
        <div className='flex flex-col gap-7 px-5'>
          <ProfileSection
            name={user?.nickname || ''}
            avatarUrl={user?.profileImg || undefined}
            onEditClick={handleEditProfile}
          />
          <StatsSection stats={statsData} onStatClick={handleStatClick} />
        </div>

        <RecentPlacesSection places={recentPlaces} onPlaceClick={handlePlaceClick} />

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
