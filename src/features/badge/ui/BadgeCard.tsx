interface BadgeCardProps {
  actionLabel: string;
  requirementLabel: string;
  iconUrl: string;
  isEarned: boolean;
}

export default function BadgeCard({
  actionLabel,
  requirementLabel,
  iconUrl,
  isEarned,
}: BadgeCardProps) {
  const textColor = isEarned ? 'text-gray-950' : 'text-gray-400';

  return (
    <div className='flex shrink-0 items-center rounded-[12px] bg-gray-50 px-3 pt-3 pb-5'>
      <div className='flex w-[80px] flex-col items-center gap-2.5'>
        <div className='flex h-[80px] items-center justify-center'>
          <img src={iconUrl} alt={requirementLabel} className='h-[80px] w-auto object-contain' />
        </div>
        <div className='flex w-full flex-col items-center gap-1'>
          <span className={`text-center text-[12px] leading-[1.3] tracking-tight ${textColor}`}>
            {actionLabel}
          </span>
          <span
            className={`text-center text-[12px] leading-[1.3] font-bold tracking-tight ${textColor}`}
          >
            {isEarned ? requirementLabel : '?개'}
          </span>
        </div>
      </div>
    </div>
  );
}
