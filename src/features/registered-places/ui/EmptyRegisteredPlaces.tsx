import PlaceRegisterIcon from '@/shared/ui/icons/PlaceRegisterIcon.svg';

interface EmptyRegisteredPlacesProps {
  onRegisterClick: () => void;
}

export default function EmptyRegisteredPlaces({ onRegisterClick }: EmptyRegisteredPlacesProps) {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-10'>
      <div className='flex flex-col items-center gap-6'>
        <div className='flex h-[120px] w-[136px] items-center justify-center'>
          <img
            src={PlaceRegisterIcon}
            alt='장소 등록'
            className='h-[120px] w-auto object-contain'
          />
        </div>
        <p className='text-center text-[22px] leading-[1.3] font-medium tracking-tight text-black'>
          아직 등록한 장소가 없네요!
        </p>
      </div>
      <button
        type='button'
        onClick={onRegisterClick}
        className='rounded-full bg-[#EAE6E3] px-8 py-3'
      >
        <span className='text-[15px] leading-normal font-medium tracking-tight text-[#917454]'>
          작업실 등록하기
        </span>
      </button>
    </div>
  );
}
