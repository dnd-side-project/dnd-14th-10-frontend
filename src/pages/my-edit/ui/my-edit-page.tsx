import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { mockUserDetailData } from '@/features/my/model/mock-data';
import ProfileEditForm from '@/features/my/ui/ProfileEditForm';
import ProfileImageSection from '@/features/my/ui/ProfileImageSection';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

export default function MyEditPage() {
  const [gender, setGender] = useState<'male' | 'female' | null>(mockUserDetailData.gender);
  const [hideGender, setHideGender] = useState(mockUserDetailData.hideGender);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditImage = () => {
    // TODO: 이미지 수정 기능 구현
  };

  const handleEditName = () => {
    navigate('/my/edit/nickname');
  };

  const handleEditBirthday = () => {
    navigate('/my/edit/birthday');
  };

  const handleEditResidence = () => {
    navigate('/my/edit/address');
  };

  const handleGenderChange = (newGender: 'male' | 'female' | null) => {
    setGender(newGender);
    setHideGender(false);
  };

  const handleHideGenderChange = (hide: boolean) => {
    setHideGender(hide);
    if (hide) {
      setGender(null);
    }
  };

  const handleWithdraw = () => {
    navigate('/withdrawal');
  };

  return (
    <div className='flex min-h-screen flex-col bg-white pt-6 pb-10'>
      <NavigationBar title='내 정보 수정' onBack={handleBack} />

      <div className='flex flex-col gap-5 px-5 pt-6 pb-10'>
        <div className='flex flex-col gap-8 rounded-xl bg-gray-50 px-4 py-8'>
          <ProfileImageSection
            imageUrl={mockUserDetailData.avatarUrl}
            onEditClick={handleEditImage}
          />
          <ProfileEditForm
            name={mockUserDetailData.name}
            birthday={mockUserDetailData.birthday}
            residence={mockUserDetailData.residence}
            gender={gender}
            hideGender={hideGender}
            onEditName={handleEditName}
            onEditBirthday={handleEditBirthday}
            onEditResidence={handleEditResidence}
            onGenderChange={handleGenderChange}
            onHideGenderChange={handleHideGenderChange}
          />
        </div>

        <div className='flex justify-end'>
          <button
            type='button'
            onClick={handleWithdraw}
            className='text-caption1 tracking-tight text-gray-500'
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
