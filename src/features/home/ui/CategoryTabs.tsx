import { cn } from '@/lib/utils';

import cafeIconUrl from '@/shared/ui/icons/CategoryCafe.svg';
import publicIconUrl from '@/shared/ui/icons/CategoryPublic.svg';

export type Category = 'cafe' | 'public';

interface CategoryTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className='relative flex flex-col items-center pt-6 pb-4'>
      <div className='flex items-end justify-center gap-[90px]'>
        <button
          type='button'
          onClick={() => onCategoryChange('cafe')}
          className='flex w-[75px] flex-col items-center gap-1'
        >
          <div className='flex h-12 w-[50px] items-center justify-center'>
            <img src={cafeIconUrl} alt='카페' className='h-12 w-auto object-contain' />
          </div>
          <span
            className={cn(
              'text-[14px] leading-[130%] font-medium tracking-[-0.001px]',
              activeCategory === 'cafe' ? 'text-gray-950' : 'text-gray-500',
            )}
          >
            카페
          </span>
        </button>

        <button
          type='button'
          onClick={() => onCategoryChange('public')}
          className='flex w-[75px] flex-col items-center gap-1'
        >
          <div className='flex h-12 w-[40px] items-center justify-center'>
            <img src={publicIconUrl} alt='공공시설' className='h-12 w-auto object-contain' />
          </div>
          <span
            className={cn(
              'text-[14px] leading-[130%] font-medium tracking-[-0.001px]',
              activeCategory === 'public' ? 'text-gray-950' : 'text-gray-500',
            )}
          >
            공공시설
          </span>
        </button>
      </div>

      <div
        className={cn(
          'bg-primary-700 absolute bottom-0 h-1 w-[175px] rounded-full transition-all duration-200',
          activeCategory === 'cafe'
            ? 'left-1/2 -translate-x-[calc(50%+37.5px+45px)]'
            : 'left-1/2 -translate-x-[calc(50%-37.5px-45px)]',
        )}
      />
    </div>
  );
}
