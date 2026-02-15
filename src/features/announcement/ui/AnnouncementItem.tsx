import AnnouncementIcon from '@/shared/ui/icons/AnnouncementIcon.svg?react';
import ChevronRightIcon from '@/shared/ui/icons/ChevronRight.svg?react';

interface AnnouncementItemProps {
  title: string;
  summary: string;
  date: string;
  onClick: () => void;
}

export default function AnnouncementItem({ title, summary, date, onClick }: AnnouncementItemProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='flex w-full items-center justify-between py-5'
    >
      <div className='flex items-start gap-4'>
        <AnnouncementIcon className='size-6 shrink-0' />
        <div className='flex flex-col gap-4'>
          <p className='text-heading4 text-left leading-[1.3] font-medium tracking-tight text-gray-950'>
            {title}
          </p>
          <div className='flex flex-col gap-1'>
            <p className='text-body2 text-left leading-[1.3] tracking-tight text-gray-950'>
              {summary}
            </p>
            <p className='text-body2 text-left leading-[1.3] tracking-tight text-gray-500'>
              {date}
            </p>
          </div>
        </div>
      </div>
      <ChevronRightIcon className='size-7 shrink-0' />
    </button>
  );
}
