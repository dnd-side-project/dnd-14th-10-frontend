import HeartFilledIcon from '@/shared/ui/icons/HeartFilled.svg?react';

export default function EmptyWishlist() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-5'>
      <HeartFilledIcon className='size-[60px] text-[#EAE6E3]' />
      <span className='text-[22px] leading-[1.3] font-bold tracking-tight text-gray-950'>
        아직 좋아요 한 장소가 없어요
      </span>
    </div>
  );
}
