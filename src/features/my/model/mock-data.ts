// 활동 통계 아이콘
import badgeIcon from '@/shared/ui/icons/BadgeIcon.svg';
import placeRegisterIcon from '@/shared/ui/icons/PlaceRegisterIcon.svg';
import reviewIcon from '@/shared/ui/icons/ReviewIcon.svg';

export const STATS_ICONS = {
  placeRegister: placeRegisterIcon,
  review: reviewIcon,
  badge: badgeIcon,
};

// Mock 사용자 데이터
export const mockUserData = {
  id: 'user-1',
  name: '홍길동',
  avatarUrl: undefined,
  stats: {
    placeCount: 5,
    reviewCount: 25,
    badgeCount: 3,
  },
};

// Mock 최근 본 장소 데이터
export const mockRecentPlaces = [
  {
    id: 'place-1',
    name: '장소 이름',
    imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400',
    likeCount: 236,
  },
  {
    id: 'place-2',
    name: '장소 이름',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
    likeCount: 450,
  },
  {
    id: 'place-3',
    name: '장소 이름',
    imageUrl: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400',
    likeCount: 103,
  },
];

// Mock 메뉴 아이템
export const mockMenuItems = [
  { label: '공지사항' },
  { label: '앱 버전 정보', value: '1.0.0' },
  { label: '로그아웃' },
];

// 활동 통계 데이터 생성 함수
export const createStatsData = (stats: typeof mockUserData.stats) => [
  {
    icon: STATS_ICONS.placeRegister,
    label: '장소 등록',
    count: stats.placeCount,
  },
  {
    icon: STATS_ICONS.review,
    label: '리뷰',
    count: stats.reviewCount,
  },
  {
    icon: STATS_ICONS.badge,
    label: '배지',
    count: stats.badgeCount,
  },
];
