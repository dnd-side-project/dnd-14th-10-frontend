import CloseIcon from '@/shared/ui/icons/Close.svg?react';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

interface CompletePageProps {
  title: string;
  imageSrc?: string;
  fallbackImage?: string;
  name: string;
  description?: string;
  buttonLabel: string;
  onButtonClick: () => void;
  onClose: () => void;
}

export function CompletePage({
  title,
  imageSrc,
  fallbackImage,
  name,
  description,
  buttonLabel,
  onButtonClick,
  onClose,
}: CompletePageProps) {
  return (
    <div className='h-dvh overflow-hidden bg-white'>
      <NavigationBar
        onBack={onClose}
        left={
          <button onClick={onClose}>
            <CloseIcon className='h-[24px] w-[24px]' />
          </button>
        }
      />
      <div className='flex h-[calc(100vh-48px)] flex-col items-center justify-center bg-white'>
        <div className='flex flex-col items-center gap-[60px]'>
          <div className='text-center text-2xl leading-tight font-bold whitespace-pre-line text-black'>
            {title}
          </div>
          {imageSrc ? (
            <div className='flex flex-col items-center gap-6'>
              <img
                className='h-60 w-60 rounded-xl border border-gray-300'
                src={imageSrc}
                alt={name}
              />
              <div className='flex flex-col items-center justify-center gap-2'>
                <div className='text-center text-lg leading-normal font-medium text-gray-950'>
                  {name}
                </div>
                {description && (
                  <div className='text-center text-lg leading-normal font-normal text-gray-500'>
                    {description}
                  </div>
                )}
              </div>
            </div>
          ) : (
            fallbackImage && <img src={fallbackImage} alt='완료' className='w-[140px]' />
          )}
        </div>
        <button
          type='button'
          onClick={onButtonClick}
          className='bg-primary-50 text-primary-600 mt-[32px] rounded-full px-5 py-[11px] text-[15px] font-medium'
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
