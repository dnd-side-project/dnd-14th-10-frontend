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
import { Header } from '@/shared/ui/header/Header';

function MyPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditProfile = () => {
    // TODO: 프로필 수정 페이지로 이동
  };

  const handlePlaceClick = (id: string) => {
    navigate(`/place/${id}`);
  };

  const handleMenuClick = (label: string) => {
    switch (label) {
      case '공지사항':
        // TODO: 공지사항 페이지로 이동
        break;
      case '로그아웃':
        // TODO: 로그아웃 처리
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
      <Header title='MY' onBack={handleBack} />

      <div className='flex flex-col pt-6 pb-10'>
        {/* 프로필 섹션 */}
        <div className='flex flex-col gap-7 px-5'>
          <ProfileSection
            name={mockUserData.name}
            avatarUrl={mockUserData.avatarUrl}
            onEditClick={handleEditProfile}
          />
          <StatsSection stats={statsData} />
        </div>

        {/* 최근 본 장소 섹션 */}
        <RecentPlacesSection places={mockRecentPlaces} onPlaceClick={handlePlaceClick} />

        {/* 메뉴 섹션 */}
        <MenuSection items={menuItemsWithHandlers} />
      </div>
    </div>
  );
}

export default MyPage;
