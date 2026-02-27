import { getBadgeIcon, lockedBadgeIcon, categoryNames } from '@/entities/badge/lib/badge-icon-map';
import { useBadgeProgressQuery } from '@/entities/badge/model/use-badge-progress-query';
import type { BadgeCategory } from '@/features/badge/model/types';
import BadgeCategorySection from '@/features/badge/ui/BadgeCategorySection';
import type { CategoryProgress } from '@/shared/types/badge';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

const getBadgeLabel = (threshold: number): string => {
  if (threshold === 1) return '첫 작성';
  return `${threshold}개`;
};

const transformToBadgeCategory = (progress: CategoryProgress): BadgeCategory => {
  const categoryInfo = categoryNames[progress.activityType];

  return {
    id: progress.activityType,
    name: categoryInfo.name,
    actionLabel: categoryInfo.actionLabel,
    currentCount: progress.currentCount,
    badges: progress.badges.map((badge) => ({
      id: badge.code,
      label: getBadgeLabel(badge.threshold),
      requirement: badge.threshold,
      isEarned: badge.achieved,
      earnedIcon: getBadgeIcon(progress.activityType, badge.threshold),
      lockedIcon: lockedBadgeIcon,
    })),
  };
};

export default function BadgePage() {
  const { data: badgeProgress, isLoading } = useBadgeProgressQuery();

  if (isLoading) {
    return (
      <div className='flex min-h-screen flex-col bg-white'>
        <NavigationBar title='배지' backPath='/my' />
        <div className='flex flex-1 items-center justify-center'>
          <div className='border-t-primary-500 h-8 w-8 animate-spin rounded-full border-4 border-gray-200' />
        </div>
      </div>
    );
  }

  const badgeCategories = badgeProgress?.categories.map(transformToBadgeCategory) ?? [];

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <NavigationBar title='배지' backPath='/my' />

      <div className='flex flex-col gap-8 px-5 pt-6'>
        {badgeCategories.map((category) => (
          <BadgeCategorySection key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
