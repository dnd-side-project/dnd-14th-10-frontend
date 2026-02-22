import GojkLogo from '@/shared/ui/icons/GojkLogo.svg';

export default function WithdrawalHeader() {
  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='flex h-[83px] w-[180px] items-center justify-center'>
        <img src={GojkLogo} alt='GOJK 로고' className='h-[50px] w-[141px]' />
      </div>
      <h1 className='text-heading2 font-bold tracking-tight text-black'>탈퇴하기</h1>
    </div>
  );
}
