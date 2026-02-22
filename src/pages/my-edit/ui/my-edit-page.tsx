import { useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  useUpdateProfileImageMutation,
  useGetPresignedUrlMutation,
} from '@/entities/user/model/use-user-mutations';
import { useUserQuery } from '@/entities/user/model/use-user-query';
import ProfileEditForm from '@/features/my/ui/ProfileEditForm';
import ProfileImageSection from '@/features/my/ui/ProfileImageSection';
import { REGION_CODES } from '@/features/onboarding/model/onboarding.types';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

const findCityDistrictByRegionCode = (
  regionCode?: number,
): { city: string | null; district: string | null } => {
  if (!regionCode) return { city: null, district: null };

  for (const [city, districts] of Object.entries(REGION_CODES)) {
    for (const [district, code] of Object.entries(districts)) {
      if (code === regionCode) {
        return { city, district };
      }
    }
  }
  return { city: null, district: null };
};

const getRegionDisplayName = (regionCode?: number): string => {
  const { city, district } = findCityDistrictByRegionCode(regionCode);
  if (city && district) {
    return `${city} ${district}`;
  }
  return '';
};

const fromApiGender = (gender: 'MALE' | 'FEMALE' | undefined): 'male' | 'female' | null => {
  if (gender === 'MALE') return 'male';
  if (gender === 'FEMALE') return 'female';
  return null;
};

export default function MyEditPage() {
  const { data: user, isLoading } = useUserQuery();
  const updateProfileImageMutation = useUpdateProfileImageMutation();
  const getPresignedUrlMutation = useGetPresignedUrlMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await getPresignedUrlMutation.mutateAsync([file.name]);
      const presignedData = result.data.urls[0];

      const uploadResponse = await fetch(presignedData.url, {
        method: 'PUT',
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }

      await updateProfileImageMutation.mutateAsync(presignedData.objectKey);
    } catch (error) {
      console.error('프로필 이미지 업로드 실패:', error);
    }
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

  const handleWithdraw = () => {
    navigate('/withdrawal');
  };

  if (isLoading) {
    return (
      <div className='flex min-h-screen flex-col bg-white'>
        <NavigationBar title='내 정보 수정' onBack={handleBack} />
        <div className='flex flex-1 items-center justify-center'>
          <div className='border-t-primary-500 h-8 w-8 animate-spin rounded-full border-4 border-gray-200' />
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <NavigationBar title='내 정보 수정' onBack={handleBack} />

      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
      />

      <div className='flex flex-col gap-5 px-5 pt-6 pb-10'>
        <div className='flex flex-col gap-8 rounded-xl bg-gray-50 px-4 py-8'>
          <ProfileImageSection
            imageUrl={user?.profileImg || undefined}
            onEditClick={handleEditImage}
          />
          <ProfileEditForm
            name={user?.nickname || ''}
            birthday={user?.birth || ''}
            residence={getRegionDisplayName(user?.regionCode)}
            gender={fromApiGender(user?.gender)}
            onEditName={handleEditName}
            onEditBirthday={handleEditBirthday}
            onEditResidence={handleEditResidence}
          />
        </div>

        <button
          type='button'
          onClick={handleWithdraw}
          className='text-caption1 text-right tracking-tight text-gray-500'
        >
          회원탈퇴
        </button>
      </div>
    </div>
  );
}
