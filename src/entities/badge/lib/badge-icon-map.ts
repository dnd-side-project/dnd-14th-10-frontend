import type { ActivityType } from '@/shared/types/badge';
import BadgeLocked from '@/shared/ui/icons/badges/BadgeLocked.svg';
import Photo30 from '@/shared/ui/icons/badges/png/Photo30.png';
import Photo5 from '@/shared/ui/icons/badges/png/Photo5.png';
import Photo80 from '@/shared/ui/icons/badges/png/Photo80.png';
import Place20 from '@/shared/ui/icons/badges/png/Place20.png';
import Place7 from '@/shared/ui/icons/badges/png/Place7.png';
import PlaceFirst from '@/shared/ui/icons/badges/png/PlaceFirst.png';
import Review25 from '@/shared/ui/icons/badges/png/Review25.png';
import Review80 from '@/shared/ui/icons/badges/png/Review80.png';
import ReviewFirst from '@/shared/ui/icons/badges/png/ReviewFirst.png';

type BadgeIconKey = `${ActivityType}_${number}`;

const badgeIconMap: Record<BadgeIconKey, string> = {
  REVIEW_1: ReviewFirst,
  REVIEW_25: Review25,
  REVIEW_80: Review80,
  PLACE_1: PlaceFirst,
  PLACE_7: Place7,
  PLACE_20: Place20,
  IMAGE_5: Photo5,
  IMAGE_30: Photo30,
  IMAGE_80: Photo80,
};

export const getBadgeIcon = (activityType: ActivityType, threshold: number): string => {
  const key = `${activityType}_${threshold}` as BadgeIconKey;
  return badgeIconMap[key] || BadgeLocked;
};

export const lockedBadgeIcon = BadgeLocked;

export const categoryNames: Record<ActivityType, { name: string; actionLabel: string }> = {
  REVIEW: { name: '리뷰왕', actionLabel: '리뷰 작성' },
  PLACE: { name: '숨은 명소 발견왕', actionLabel: '장소 등록' },
  IMAGE: { name: '사진 마스터', actionLabel: '사진 업로드' },
};
