import { useState } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import ChevronDownIcon from '@/shared/ui/icons/ChevronDown.svg?react';

import type { DetailFormValues } from './DetailInputStep';
import { SectionCard } from './SectionCard';

const GOOD_POINT_TAGS = [
  { id: 1, label: '청결해요' },
  { id: 2, label: '칸막이가 있어요' },
  { id: 3, label: '집중하기 좋아요' },
  { id: 4, label: '가성비가 좋아요' },
  { id: 5, label: '사장님이 친절해요' },
  { id: 6, label: '단체 작업하기 좋아요' },
  { id: 7, label: '좌석 간 간격이 넓어요' },
  { id: 15, label: '인테리어가 예뻐요' },
  { id: 16, label: '어른만의 공간이에요' },
  { id: 8, label: '작업공간이 넓어요' },
  { id: 9, label: '아늑해요' },
  { id: 10, label: '화장실이 깨끗해요' },
  { id: 11, label: '자리가 많아요' },
  { id: 12, label: '좌석이 편해요' },
  { id: 13, label: '비싼 만큼 가치있어요' },
  { id: 14, label: '오래 머무르기 좋아요' },
  { id: 17, label: '뷰가 예뻐요' },
  { id: 18, label: '조명이 밝아요' },
];

interface TagButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function TagButton({ label, isSelected, onClick }: TagButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`break-inside-avoid rounded-full px-[10px] py-[5px] text-sm font-medium transition-all ${
        isSelected ? 'bg-primary-700 text-white' : 'bg-gray-150 text-gray-500 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
}

// 섹션 전체 ~422px: 패딩(32) + 타이틀(28) + 설명(24) + mt-4(16) + 태그 + 버튼(32) ≈ 132px
const COLLAPSED_HEIGHT = 290;

export function GoodPointsSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    control,
    // formState: { errors },
  } = useFormContext<DetailFormValues>();

  return (
    <SectionCard>
      <div className='flex items-center gap-3'>
        <h2 className='text-[22px] font-bold text-gray-950'>어떤 점이 좋았나요?</h2>
        <span className='text-warning-default text-xs'>필수</span>
      </div>
      <p className='mt-2 text-xs text-gray-500'>이 공간의 좋았던 점을 2~5가지 골라주세요</p>

      <Controller
        name='tagIds'
        control={control}
        render={({ field }) => {
          const handleToggle = (tagId: number) => {
            const current = field.value || [];
            if (current.includes(tagId)) {
              field.onChange(current.filter((id) => id !== tagId));
            } else if (current.length < 5) {
              field.onChange([...current, tagId]);
            }
          };

          return (
            <div
              className='relative mt-4 overflow-hidden transition-[max-height] duration-300'
              style={{ maxHeight: isExpanded ? '600px' : `${COLLAPSED_HEIGHT}px` }}
            >
              <div className='columns-2 gap-3 space-y-3'>
                {GOOD_POINT_TAGS.map((tag) => (
                  <TagButton
                    key={tag.id}
                    label={tag.label}
                    isSelected={field.value?.includes(tag.id) ?? false}
                    onClick={() => handleToggle(tag.id)}
                  />
                ))}
              </div>

              {!isExpanded && (
                <div
                  className='pointer-events-none absolute right-0 bottom-0 left-0 h-[73px]'
                  style={{
                    background: 'linear-gradient(180deg, rgba(248, 249, 250, 0) 0%, #F8F9FA 100%)',
                  }}
                />
              )}
            </div>
          );
        }}
      />

      <button
        type='button'
        onClick={() => setIsExpanded((prev) => !prev)}
        className={`mt-2 flex w-full items-center justify-center ${isExpanded ? 'hidden' : ''}`}
      >
        <ChevronDownIcon className={'h-6 w-6 text-gray-600 transition-transform duration-300'} />
        <div className='h-[20px]' />
      </button>

    </SectionCard>
  );
}
