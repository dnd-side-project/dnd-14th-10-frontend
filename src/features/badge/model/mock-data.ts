import type { BadgeCategory } from '@/features/badge/model/types';
import BadgeLocked from '@/shared/ui/icons/badges/BadgeLocked.svg';
import Photo30 from '@/shared/ui/icons/badges/Photo30.svg';
import Photo5 from '@/shared/ui/icons/badges/Photo5.svg';
import Photo80 from '@/shared/ui/icons/badges/Photo80.svg';
import Place20 from '@/shared/ui/icons/badges/Place20.svg';
import Place7 from '@/shared/ui/icons/badges/Place7.svg';
import PlaceFirst from '@/shared/ui/icons/badges/PlaceFirst.svg';
import Review25 from '@/shared/ui/icons/badges/Review25.svg';
import Review80 from '@/shared/ui/icons/badges/Review80.svg';
import ReviewFirst from '@/shared/ui/icons/badges/ReviewFirst.svg';

export type { Badge, BadgeCategory } from '@/features/badge/model/types';

// 배지 아이콘 매핑
const badgeIcons = {
  reviewFirst: ReviewFirst,
  review25: Review25,
  review80: Review80,
  placeFirst: PlaceFirst,
  place7: Place7,
  place20: Place20,
  photo5: Photo5,
  photo30: Photo30,
  photo80: Photo80,
  locked: BadgeLocked,
};

// 목 데이터 - 일부 배지 획득 상태
export const mockBadgeCategories: BadgeCategory[] = [
  {
    id: 'review',
    name: '리뷰왕',
    actionLabel: '리뷰 작성',
    currentCount: 80,
    badges: [
      {
        id: 'review-first',
        label: '첫 작성',
        requirement: 1,
        isEarned: true,
        earnedIcon: badgeIcons.reviewFirst,
        lockedIcon: badgeIcons.locked,
      },
      {
        id: 'review-25',
        label: '25개',
        requirement: 25,
        isEarned: true,
        earnedIcon: badgeIcons.review25,
        lockedIcon: badgeIcons.locked,
      },
      {
        id: 'review-80',
        label: '80개',
        requirement: 80,
        isEarned: true,
        earnedIcon: badgeIcons.review80,
        lockedIcon: badgeIcons.locked,
      },
    ],
  },
  {
    id: 'place',
    name: '숨은 명소 발견왕',
    actionLabel: '장소 등록',
    currentCount: 20,
    badges: [
      {
        id: 'place-first',
        label: '첫 등록',
        requirement: 1,
        isEarned: true,
        earnedIcon: badgeIcons.placeFirst,
        lockedIcon: badgeIcons.locked,
      },
      {
        id: 'place-7',
        label: '7개',
        requirement: 7,
        isEarned: true,
        earnedIcon: badgeIcons.place7,
        lockedIcon: badgeIcons.locked,
      },
      {
        id: 'place-20',
        label: '20개',
        requirement: 20,
        isEarned: true,
        earnedIcon: badgeIcons.place20,
        lockedIcon: badgeIcons.locked,
      },
    ],
  },
  {
    id: 'photo',
    name: '사진 마스터',
    actionLabel: '사진 업로드',
    currentCount: 80,
    badges: [
      {
        id: 'photo-5',
        label: '5개',
        requirement: 5,
        isEarned: true,
        earnedIcon: badgeIcons.photo5,
        lockedIcon: badgeIcons.locked,
      },
      {
        id: 'photo-30',
        label: '30개',
        requirement: 30,
        isEarned: true,
        earnedIcon: badgeIcons.photo30,
        lockedIcon: badgeIcons.locked,
      },
      {
        id: 'photo-80',
        label: '80개',
        requirement: 80,
        isEarned: true,
        earnedIcon: badgeIcons.photo80,
        lockedIcon: badgeIcons.locked,
      },
    ],
  },
];
