import { calculateAge } from '@/features/my/model/mock-data';

interface ProfileEditFormProps {
  name: string;
  birthday: string;
  residence: string;
  gender: 'male' | 'female' | null;
  hideGender: boolean;
  onEditName?: () => void;
  onEditBirthday?: () => void;
  onEditResidence?: () => void;
  onGenderChange?: (gender: 'male' | 'female' | null) => void;
  onHideGenderChange?: (hide: boolean) => void;
}

export default function ProfileEditForm({
  name,
  birthday,
  residence,
  gender,
  hideGender,
  onEditName,
  onEditBirthday,
  onEditResidence,
  onGenderChange,
  onHideGenderChange,
}: ProfileEditFormProps) {
  return (
    <div className='flex flex-col gap-10'>
      {/* 이름 */}
      <div className='flex items-center'>
        <span className='text-body1 w-[76px] font-bold tracking-tight text-gray-950'>이름</span>
        <div className='flex flex-1 items-center justify-between'>
          <span className='text-caption1 tracking-tight text-gray-950'>{name}</span>
          <button
            type='button'
            onClick={onEditName}
            className='bg-primary-700 text-caption1 rounded-lg px-3 py-1 font-medium text-gray-50'
          >
            수정
          </button>
        </div>
      </div>

      {/* 나이 */}
      <div className='flex items-center'>
        <span className='text-body1 w-[76px] font-bold tracking-tight text-gray-950'>나이</span>
        <div className='flex flex-1 items-center justify-between'>
          <span className='text-caption1 tracking-tight text-gray-950'>
            {calculateAge(birthday)}
          </span>
          <button
            type='button'
            onClick={onEditBirthday}
            className='bg-primary-700 text-caption1 rounded-lg px-3 py-1 font-medium text-gray-50'
          >
            수정
          </button>
        </div>
      </div>

      {/* 거주지 */}
      <div className='flex items-center'>
        <span className='text-body1 w-[76px] font-bold tracking-tight text-gray-950'>거주지</span>
        <div className='flex flex-1 items-center justify-between'>
          <span className='text-caption1 tracking-tight text-gray-950'>{residence}</span>
          <button
            type='button'
            onClick={onEditResidence}
            className='bg-primary-700 text-caption1 rounded-lg px-3 py-1 font-medium text-gray-50'
          >
            수정
          </button>
        </div>
      </div>

      {/* 성별 */}
      <div className='flex items-start'>
        <span className='text-body1 w-[76px] font-bold tracking-tight text-gray-950'>성별</span>
        <div className='flex flex-1 flex-col gap-2'>
          <div className='flex items-center gap-9'>
            <label className='flex cursor-pointer items-center gap-2'>
              <input
                type='radio'
                name='gender'
                checked={gender === 'male' && !hideGender}
                onChange={() => onGenderChange?.('male')}
                disabled={hideGender}
                className='accent-primary-700 size-3'
              />
              <span className='text-body1 tracking-tight text-gray-950'>남자</span>
            </label>
            <label className='flex cursor-pointer items-center gap-2'>
              <input
                type='radio'
                name='gender'
                checked={gender === 'female' && !hideGender}
                onChange={() => onGenderChange?.('female')}
                disabled={hideGender}
                className='accent-primary-700 size-3'
              />
              <span className='text-body1 tracking-tight text-gray-950'>여자</span>
            </label>
          </div>
          <div className='h-px w-full bg-gray-300' />
          <label className='flex cursor-pointer items-center gap-3'>
            <input
              type='checkbox'
              checked={hideGender}
              onChange={(e) => onHideGenderChange?.(e.target.checked)}
              className='accent-primary-700 size-3'
            />
            <span className='text-body1 tracking-tight text-gray-950'>성별 정보 저장하지 않기</span>
          </label>
        </div>
      </div>
    </div>
  );
}
