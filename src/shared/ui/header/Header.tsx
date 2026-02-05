import type { ReactNode } from 'react';

import ArrowLeftIcon from '@/shared/ui/icons/ArrowLeft.svg?react';

interface HeaderProps {
  left?: ReactNode;
  title?: ReactNode;
  right?: ReactNode;
  onBack?: () => void;
}

export function Header({ left, title, right, onBack }: HeaderProps) {
  const leftContent = left ?? (onBack ? (
    <button onClick={onBack}>
      <ArrowLeftIcon className='h-[24px] w-[24px] text-gray-950' />
    </button>
  ) : null);

  return (
    <header className='sticky top-0 z-101 flex h-12 items-center justify-between border-b border-gray-200 bg-white px-5'>
      <div className='flex min-w-0 flex-1 items-center gap-[16px]'>
        {leftContent}
        {title && <div className='truncate text-heading3 font-bold text-gray-950'>{title}</div>}
      </div>
      {right && <div className='flex flex-shrink-0 items-center gap-4'>{right}</div>}
    </header>
  );
}
