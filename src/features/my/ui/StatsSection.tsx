interface StatItem {
  icon: string;
  label: string;
  count: number;
}

interface StatsSectionProps {
  stats: StatItem[];
  onStatClick?: (label: string) => void;
}

export default function StatsSection({ stats, onStatClick }: StatsSectionProps) {
  return (
    <div className='flex items-center justify-between rounded-xl bg-gray-50 px-9 py-5'>
      {stats.map((stat, index) => (
        <button
          key={index}
          type='button'
          onClick={() => onStatClick?.(stat.label)}
          className='flex flex-col items-center gap-1.5'
        >
          <div className='flex size-[60px] items-center justify-center'>
            <img src={stat.icon} alt={stat.label} className='h-[60px] w-auto object-contain' />
          </div>
          <span className='text-body1 font-medium tracking-tight text-gray-950'>{stat.label}</span>
          <span className='text-body2 tracking-tight text-gray-500'>{stat.count}개</span>
        </button>
      ))}
    </div>
  );
}
