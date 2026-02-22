import type { PlaceCategory } from '@/features/register-place/model/register-place.types';
import cafeIcon from '@/shared/assets/images/cafe-3d.png';
import publicFacilityIcon from '@/shared/assets/images/public-facility-3d.png';

interface PlaceCategoryCardProps {
  category: PlaceCategory;
  label: string;
  icon: string;
  iconClassName: string;
  isSelected: boolean;
  onClick: () => void;
}

function PlaceCategoryCard({ label, icon, iconClassName, isSelected, onClick }: PlaceCategoryCardProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`group flex h-[167px] w-[167px] flex-col items-center justify-center gap-2 rounded-xl transition-all ${
        isSelected ? 'bg-primary-700 ring-2 ring-primary-700' : 'bg-gray-100 hover:bg-gray-150 active:bg-primary-700'
      }`}
    >
      <img src={icon} alt={label} className={iconClassName} />
      <span className={`text-body2 font-medium ${isSelected ? 'text-white' : 'text-gray-950 group-active:text-white'}`}>{label}</span>
    </button>
  );
}

interface TypeSelectStepProps {
  selectedCategory: PlaceCategory | null;
  onSelect: (category: PlaceCategory) => void;
  onNext: () => void;
}

export function TypeSelectStep({ selectedCategory, onSelect, onNext }: TypeSelectStepProps) {
  const handleSelect = (category: PlaceCategory) => {
    onSelect(category);
    // 선택 후 바로 다음 단계로 이동
    setTimeout(() => onNext(), 150);
  };

  return (
    <div className='flex flex-col items-center gap-[60px] px-5 pt-[93px]'>
      <h1 className='text-center text-heading4 font-medium text-gray-950'>
        등록하려는 <span className='font-bold'>공간 유형</span>을 선택해주세요.
      </h1>

      <div className='flex items-center gap-4'>
        <PlaceCategoryCard
          category='CAFE'
          label='카페'
          icon={cafeIcon}
          iconClassName='h-[48px] w-[50px]'
          isSelected={selectedCategory === 'CAFE'}
          onClick={() => handleSelect('CAFE')}
        />
        <PlaceCategoryCard
          category='PUBLIC'
          label='공공시설'
          icon={publicFacilityIcon}
          iconClassName='h-[48px] w-[40px]'
          isSelected={selectedCategory === 'PUBLIC'}
          onClick={() => handleSelect('PUBLIC')}
        />
      </div>
    </div>
  );
}
