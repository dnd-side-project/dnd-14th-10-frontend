import { useNavigate } from 'react-router-dom';

import GojkLogo from '@/shared/ui/icons/GojkLogo.svg?react';
import HeartFilledIcon from '@/shared/ui/icons/HeartFilled.svg?react';
import PersonIcon from '@/shared/ui/icons/Person.svg?react';
import PlusIcon from '@/shared/ui/icons/Plus.svg?react';

export default function HomeHeader() {
  const navigate = useNavigate();

  const handleRegistrationClick = () => {
    navigate('/registration');
  };

  const handleWishlistClick = () => {
    navigate('/wishlist');
  };

  const handleMyPageClick = () => {
    navigate('/my');
  };

  return (
    <header className='flex h-[52px] items-center justify-between px-5 py-2'>
      <div className='h-9 w-[100px]'>
        <GojkLogo className='h-full w-full' />
      </div>

      <div className='flex items-center gap-4'>
        <button
          type='button'
          onClick={handleRegistrationClick}
          className='flex w-7 flex-col items-center'
        >
          <PlusIcon className='text-primary-700 size-6' />
          <span className='text-caption3 text-primary-700 tracking-tight'>등록</span>
        </button>

        <button
          type='button'
          onClick={handleWishlistClick}
          className='flex w-7 flex-col items-center'
        >
          <HeartFilledIcon className='text-primary-700 size-6' />
          <span className='text-caption3 text-primary-700 tracking-tight'>위시</span>
        </button>

        <button
          type='button'
          onClick={handleMyPageClick}
          className='flex w-7 flex-col items-center'
        >
          <PersonIcon className='text-primary-700 size-6' />
          <span className='text-caption3 text-primary-700 tracking-tight'>MY</span>
        </button>
      </div>
    </header>
  );
}
