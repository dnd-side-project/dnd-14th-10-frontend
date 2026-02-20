export default function FullPageSpinner() {
  return (
    <div className='flex min-h-dvh flex-col items-center justify-center bg-white'>
      <div className='border-t-primary-700 h-10 w-10 animate-spin rounded-full border-4 border-gray-200' />
      <p className='mt-4 text-gray-700'>로딩 중...</p>
    </div>
  );
}
