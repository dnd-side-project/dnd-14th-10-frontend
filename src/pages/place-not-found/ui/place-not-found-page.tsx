import { useNavigate } from 'react-router-dom';

import CloseIcon from '@/shared/ui/icons/Close.svg?react';
import WarningTriangleIcon from '@/shared/ui/icons/WarningTriangle.png';

export default function PlaceNotFoundPage() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const handleGoToWishlist = () => {
    navigate('/wishlist');
  };

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <header className='border-gray-150 flex h-[48px] items-center border-b px-5 py-3'>
        <button type='button' onClick={handleClose}>
          <CloseIcon className='size-6 text-gray-950' />
        </button>
      </header>

      <div className='flex flex-1 flex-col items-center justify-center gap-6 px-5'>
        <img src={WarningTriangleIcon} alt='경고' className='h-[80px] w-[93px]' />
        <span className='text-center text-[22px] leading-[1.3] font-medium tracking-tight text-black'>
          페이지를 찾을 수 없습니다
        </span>
        <button
          type='button'
          onClick={handleGoToWishlist}
          className='text-primary-600 mt-4 rounded-[100px] bg-[#EAE6E3] px-5 py-[11px] text-[15px] leading-normal font-medium tracking-[-0.237px]'
        >
          위시리스트로 돌아가기
        </button>
      </div>
    </div>
  );
}
