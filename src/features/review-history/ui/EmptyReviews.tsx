import ReviewIcon from '@/shared/ui/icons/ReviewIcon.svg';

export default function EmptyReviews() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-6'>
      <div className='flex h-[120px] w-[136px] items-center justify-center'>
        <img src={ReviewIcon} alt='리뷰' className='h-[120px] w-auto object-contain' />
      </div>
      <p className='text-center text-[22px] leading-[1.3] font-medium tracking-tight text-black'>
        아직 등록한 리뷰가 없네요!
      </p>
    </div>
  );
}
