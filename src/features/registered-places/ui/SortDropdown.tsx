import ChevronDownIcon from '@/shared/ui/icons/ChevronDown.svg?react';

interface SortDropdownProps {
  value: string;
  onClick?: () => void;
}

export default function SortDropdown({ value, onClick }: SortDropdownProps) {
  return (
    <button type='button' onClick={onClick} className='flex items-center gap-1'>
      <span className='text-caption1 tracking-tight text-black'>{value}</span>
      <ChevronDownIcon className='size-3 text-black' />
    </button>
  );
}
