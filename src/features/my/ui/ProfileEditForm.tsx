import { calculateAge } from '@/features/my/model/mock-data';

interface ProfileEditFormProps {
  name: string;
  birthday: string;
  residence: string;
  gender: 'male' | 'female' | null;
  onEditName?: () => void;
  onEditBirthday?: () => void;
  onEditResidence?: () => void;
}

export default function ProfileEditForm({
  name,
  birthday,
  residence,
  gender,
  onEditName,
  onEditBirthday,
  onEditResidence,
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
            <label className='flex items-center gap-2'>
              <input
                type='radio'
                name='gender'
                checked={gender === 'male'}
                readOnly
                className='accent-primary-700 size-3 cursor-default'
              />
              <span className='text-body1 tracking-tight text-gray-950'>남자</span>
            </label>
            <label className='flex items-center gap-2'>
              <input
                type='radio'
                name='gender'
                checked={gender === 'female'}
                readOnly
                className='accent-primary-700 size-3 cursor-default'
              />
              <span className='text-body1 tracking-tight text-gray-950'>여자</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
