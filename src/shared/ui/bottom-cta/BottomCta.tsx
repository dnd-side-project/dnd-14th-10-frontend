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
    <div
      className='fixed inset-x-0 bottom-0 mx-auto w-full max-w-[var(--width-app)] bg-white px-5 pt-3 outline outline-2 outline-white'
      style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
    >
      <Button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          'text-body1 h-[52px] w-full rounded-lg',
          disabled
            ? 'bg-gray-100 font-medium text-gray-500 hover:bg-gray-100'
            : 'bg-primary-700 hover:bg-primary-700/90 font-bold text-white',
          className,
        )}
      >
        {children}
      </Button>
    </div>
  );
}
