import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BottomCtaProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

export function BottomCta({
  children,
  disabled = false,
  onClick,
  type = 'button',
  className,
}: BottomCtaProps) {
  return (
    <div className='bg-white px-5 py-3'>
      <Button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          'h-[52px] w-full rounded-lg text-body1',
          disabled
            ? 'bg-gray-100 font-medium text-gray-500 hover:bg-gray-100'
            : 'bg-primary-700 font-bold text-white hover:bg-primary-700/90',
          className,
        )}
      >
        {children}
      </Button>
    </div>
  );
}
