import { cn } from '@/lib/utils';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export default function PrimaryButton({
  children,
  onClick,
  disabled,
  className,
}: PrimaryButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'h-[52px] w-full rounded-lg text-[16px] font-bold transition-colors',
        disabled ? 'bg-gray-100 text-gray-500' : 'bg-primary-700 text-white',
        className,
      )}
    >
      {children}
    </button>
  );
}
