import MapPinIcon from '@/shared/ui/icons/MapPin.svg?react';

interface EmptyPlaceSectionProps {
  message: string;
}

export default function EmptyPlaceSection({ message }: EmptyPlaceSectionProps) {
  return (
    <div className='flex h-[180px] w-full flex-col items-center justify-center gap-3 rounded-2xl bg-[#F5F3F1]'>
      <MapPinIcon className='size-10 text-[#C4BDB6]' />
      <p className='text-body2 text-center font-medium tracking-tight text-[#9E9690]'>{message}</p>
    </div>
  );
}
