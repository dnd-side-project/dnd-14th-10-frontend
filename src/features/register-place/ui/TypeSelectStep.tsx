import type { PlaceType } from '@/features/register-place/model/use-registration-store';

interface PlaceTypeCardProps {
  type: PlaceType;
  label: string;
  icon: string;
  isSelected: boolean;
  onClick: () => void;
}

function PlaceTypeCard({ label, icon, isSelected, onClick }: PlaceTypeCardProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`flex h-[167px] w-[167px] flex-col items-center justify-center gap-2 rounded-xl transition-all ${
        isSelected ? 'bg-primary-100 ring-2 ring-primary-500' : 'bg-gray-100 hover:bg-gray-150'
      }`}
    >
      <span className='text-5xl'>{icon}</span>
      <span className='text-body2 font-medium text-gray-950'>{label}</span>
    </button>
  );
}

interface TypeSelectStepProps {
  selectedType: PlaceType | null;
  onSelect: (type: PlaceType) => void;
  onNext: () => void;
}

export function TypeSelectStep({ selectedType, onSelect, onNext }: TypeSelectStepProps) {
  const handleSelect = (type: PlaceType) => {
    onSelect(type);
    // 선택 후 바로 다음 단계로 이동
    setTimeout(() => onNext(), 150);
  };

  return (
    <div className='flex flex-col items-center gap-[60px] px-5 pt-[93px]'>
      <h1 className='text-center text-heading4 font-medium text-gray-950'>
        등록하려는 <span className='font-bold'>공간 유형</span>을 선택해주세요.
      </h1>

      <div className='flex items-center gap-4'>
        <PlaceTypeCard
          type='cafe'
          label='카페'
          icon='☕'
          isSelected={selectedType === 'cafe'}
          onClick={() => handleSelect('cafe')}
        />
        <PlaceTypeCard
          type='public'
          label='공공시설'
          icon='🏛️'
          isSelected={selectedType === 'public'}
          onClick={() => handleSelect('public')}
        />
      </div>
    </div>
  );
}
