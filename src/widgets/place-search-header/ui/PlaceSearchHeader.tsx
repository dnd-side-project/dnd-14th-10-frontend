import ArrowLeftIcon from '@/shared/ui/icons/ArrowLeft.svg?react';
import FilterIcon from '@/shared/ui/icons/Filter.svg?react';

interface FilterInfo {
  query?: string;
  districts?: string;
  atmospheres?: string;
  sizes?: string;
}

function getFilterLines({ query, districts, atmospheres, sizes }: FilterInfo): {
  primary: string;
  secondary: string;
} {
  const groups: string[] = [];

  if (query) groups.push(`'${query}' 근처 공간`);
  if (districts) groups.push(districts);
  if (atmospheres) groups.push(atmospheres);
  if (sizes) groups.push(sizes);

  if (groups.length === 0) {
    return { primary: '검색 결과', secondary: '' };
  }

  const primary = groups[0];
  const secondary = groups.slice(1).join(' / ');

  return { primary, secondary };
}

interface PlaceSearchHeaderProps {
  query?: string;
  districts?: string;
  atmospheres?: string;
  sizes?: string;
  onBack?: () => void;
  onFilter?: () => void;
}

export function PlaceSearchHeader({
  query,
  districts,
  atmospheres,
  sizes,
  onBack,
  onFilter,
}: PlaceSearchHeaderProps) {
  const { primary, secondary } = getFilterLines({ query, districts, atmospheres, sizes });

  return (
    <div className='flex items-center gap-2 rounded-full bg-white px-4 py-3'>
      <button
        type='button'
        onClick={onBack}
        className='flex size-6 shrink-0 items-center justify-center text-gray-950'
        aria-label='뒤로가기'
      >
        <ArrowLeftIcon className='size-6' />
      </button>

      <div className='flex min-w-0 flex-1 flex-col items-center'>
        <span className='text-body1 w-full truncate text-center font-medium tracking-tight text-gray-950'>
          {primary}
        </span>
        {secondary && (
          <span
            className='w-full truncate text-center text-gray-950'
            style={{ fontSize: 10, fontWeight: 400, lineHeight: '13px' }}
          >
            {secondary}
          </span>
        )}
      </div>

      <button
        type='button'
        onClick={onFilter}
        className='flex size-6 shrink-0 items-center justify-center text-gray-950'
        aria-label='필터'
      >
        <FilterIcon className='size-6' />
      </button>
    </div>
  );
}
