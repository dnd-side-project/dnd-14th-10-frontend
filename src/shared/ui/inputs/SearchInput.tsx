import { cn } from '@/lib/utils';

import SearchIcon from '@/shared/ui/icons/Search.svg?react';

interface SearchInputProps {
  placeholder?: string;
  onClick?: () => void;
  className?: string;
}

export default function SearchInput({
  placeholder = '작업 공간을 찾아보아요',
  onClick,
  className,
}: SearchInputProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'flex h-[52px] w-full items-center justify-center gap-4 rounded-full bg-white px-6',
        className,
      )}
    >
      <SearchIcon className='text-primary-700 size-7' />
      <span className='text-primary-700 text-[16px] leading-[130%] font-medium tracking-[-0.002px]'>
        {placeholder}
      </span>
    </button>
  );
}
