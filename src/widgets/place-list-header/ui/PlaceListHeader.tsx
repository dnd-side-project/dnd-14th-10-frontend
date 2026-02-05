import ArrowLeftIcon from '@/shared/ui/icons/ArrowLeft.svg?react';
import FilterIcon from '@/shared/ui/icons/Filter.svg?react';

interface PlaceListHeaderProps {
  title: string;
  onBack?: () => void;
  onFilter?: () => void;
}

export function PlaceListHeader({ title, onBack, onFilter }: PlaceListHeaderProps) {
  return (
    <div className='flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3.5'>
      <button
        type='button'
        onClick={onBack}
        className='flex size-6 shrink-0 items-center justify-center text-gray-950'
        aria-label='뒤로가기'
      >
        <ArrowLeftIcon className='size-6' />
      </button>

      <span className='text-body1 flex-1 text-center font-medium tracking-tight text-gray-950'>
        {title}
      </span>

      <button
        type='button'
        onClick={onFilter}
        className='flex size-6 shrink-0 items-center justify-center text-gray-950'
        aria-label='필터'
      >
        <FilterIcon className='size-6' />
      </button>
    </div>
  );
}
