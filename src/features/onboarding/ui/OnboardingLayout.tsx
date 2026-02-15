import ArrowLeftIcon from '@/shared/ui/icons/ArrowLeft.svg?react';

interface OnboardingLayoutProps {
  title: React.ReactNode;
  onBack: () => void;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export default function OnboardingLayout({
  title,
  onBack,
  children,
  footer,
}: OnboardingLayoutProps) {
  return (
    <div className='flex min-h-dvh flex-col bg-white'>
      <header className='border-gray-150 flex h-12 items-center border-b px-5'>
        <button type='button' onClick={onBack} className='-ml-2 p-2'>
          <ArrowLeftIcon className='h-6 w-6 text-gray-950' />
        </button>
      </header>
      <main className='flex-1 px-5 pt-6'>
        <h1 className='text-[32px] leading-tight font-bold text-gray-950'>{title}</h1>
        {children}
      </main>
      {footer}
    </div>
  );
}
