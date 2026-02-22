import ProfilePlaceholderIcon from '@/shared/ui/icons/ProfilePlaceholder.svg?react';

interface ProfileSectionProps {
  name: string;
  avatarUrl?: string;
  onEditClick?: () => void;
}

export default function ProfileSection({ name, avatarUrl, onEditClick }: ProfileSectionProps) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-4'>
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className='size-16 rounded-full object-cover' />
        ) : (
          <ProfilePlaceholderIcon className='size-16' />
        )}
        <span className='text-heading3 font-bold tracking-tight text-gray-950'>{name}</span>
      </div>
      <button
        type='button'
        onClick={onEditClick}
        className='bg-primary-700 text-caption1 rounded-full px-3 py-1.5 font-medium text-white'
      >
        내 정보 수정
      </button>
    </div>
  );
}
