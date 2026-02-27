import { useSearchStore } from '@/features/home/model/search-store';
import CheckIcon from '@/shared/ui/icons/Check.svg?react';

const SIZE_OPTIONS = ['소형', '중형', '대형'];

interface SizeSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function SizeSection({ isExpanded, onToggle }: SizeSectionProps) {
  const { sizes, setSize } = useSearchStore();

  if (!isExpanded) {
    return (
      <button
        type='button'
        onClick={onToggle}
        className='flex w-full flex-col items-center gap-2 rounded-lg bg-gray-100 py-5'
      >
        <span className='text-[16px] font-medium leading-[130%] text-gray-950'>공간 크기</span>
        {sizes.length > 0 && (
          <span className='text-center text-[16px] font-normal leading-[130%] text-gray-500'>
            {sizes.join(', ')}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className='rounded-lg bg-gray-100'>
      <button
        type='button'
        onClick={onToggle}
        className='flex h-11 w-full items-center justify-center border-b border-gray-200'
      >
        <span className='text-[16px] font-medium text-gray-950'>공간 크기</span>
      </button>
      <div className='flex justify-around px-4 py-6'>
        {SIZE_OPTIONS.map((item) => {
          const isSelected = sizes.includes(item);
          return (
            <button
              key={item}
              type='button'
              onClick={() => setSize(item)}
              className='flex items-center gap-2'
            >
              <CheckIcon className={`h-5 w-5 ${isSelected ? 'text-primary-700' : 'text-gray-300'}`} />
              <span
                className={`text-[14px] leading-[130%] ${
                  isSelected ? 'text-primary-700 font-medium' : 'font-normal text-gray-500'
                }`}
              >
                {item}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}