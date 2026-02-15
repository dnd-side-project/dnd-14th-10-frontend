import ProfilePlaceholderIcon from '@/shared/ui/icons/ProfilePlaceholder.svg?react';

interface ProfileImageSectionProps {
  imageUrl?: string;
  onEditClick?: () => void;
}

export default function ProfileImageSection({ imageUrl, onEditClick }: ProfileImageSectionProps) {
  return (
    <div className='flex flex-col items-center gap-3'>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt='프로필 이미지'
          className='size-[100px] rounded-full object-cover'
        />
      ) : (
        <ProfilePlaceholderIcon className='size-[100px]' />
      )}
      <button
        type='button'
        onClick={onEditClick}
        className='bg-primary-700 text-caption1 rounded-full px-3 py-1.5 font-medium text-gray-50'
      >
        이미지 수정하기
      </button>
    </div>
  );
}
