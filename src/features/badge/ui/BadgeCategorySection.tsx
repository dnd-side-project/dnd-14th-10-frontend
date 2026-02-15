import type { BadgeCategory } from '@/features/badge/model/mock-data';

import BadgeCard from '@/features/badge/ui/BadgeCard';

interface BadgeCategorySectionProps {
  category: BadgeCategory;
}

export default function BadgeCategorySection({ category }: BadgeCategorySectionProps) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='px-2 py-1'>
        <span className='text-[16px] leading-[1.3] font-bold tracking-tight text-gray-950'>
          {category.name} (현재 {category.currentCount}회)
        </span>
      </div>
      <div className='flex gap-4'>
        {category.badges.map((badge) => (
          <BadgeCard
            key={badge.id}
            actionLabel={category.actionLabel}
            requirementLabel={badge.label}
            iconUrl={badge.isEarned ? badge.earnedIcon : badge.lockedIcon}
            isEarned={badge.isEarned}
          />
        ))}
      </div>
    </div>
  );
}
