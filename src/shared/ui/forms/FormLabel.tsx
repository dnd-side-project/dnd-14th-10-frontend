import { cn } from '@/lib/utils';

interface FormLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function FormLabel({ children, className }: FormLabelProps) {
  return <label className={cn('text-lg font-bold text-gray-950', className)}>{children}</label>;
}
