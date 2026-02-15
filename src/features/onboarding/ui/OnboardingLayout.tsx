import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

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
    <div className='flex min-h-dvh flex-col bg-white pt-6 pb-10'>
      <NavigationBar onBack={onBack} />
      <main className='flex-1 px-5 pt-6 pb-10'>
        <h1 className='text-[32px] leading-tight font-bold text-gray-950'>{title}</h1>
        {children}
      </main>
      {footer}
    </div>
  );
}
