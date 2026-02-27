export default function PlaceCardSkeleton() {
  return (
    <div className='flex w-[142px] shrink-0 flex-col gap-2.5'>
      <div className='h-[142px] w-[142px] animate-pulse rounded-[12px] bg-gray-200' />
      <div className='flex flex-col gap-1 px-1'>
        <div className='h-4 w-24 animate-pulse rounded bg-gray-200' />
        <div className='h-3 w-16 animate-pulse rounded bg-gray-200' />
      </div>
    </div>
  );
}
