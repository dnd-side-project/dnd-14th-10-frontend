import { Controller, useFormContext } from 'react-hook-form';

import CrowdIcon from '@/shared/ui/icons/Crowd.svg?react';
import MoodIcon from '@/shared/ui/icons/Mood.svg?react';
import OutletIcon from '@/shared/ui/icons/OutletGradient.svg?react';
import SpaceSizeIcon from '@/shared/ui/icons/SpaceSize.svg?react';

import type { DetailFormValues } from './DetailInputStep';
import { SectionCard } from './SectionCard';

interface ChipButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function ChipButton({ label, isSelected, onClick }: ChipButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`rounded-full px-[15px] py-[5px] text-base font-medium transition-all ${
        isSelected ? 'bg-primary-700 text-white' : 'bg-gray-150 text-gray-500 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
}

export function WorkspaceReviewSection() {
  const { control } = useFormContext<DetailFormValues>();

  return (
    <SectionCard>
      <div className='flex items-center gap-3'>
        <h2 className='text-[22px] font-bold text-gray-950'>작업 공간은 어땠나요?</h2>
        <span className='text-warning-default text-xs'>필수</span>
      </div>

      <div className='mt-6 space-y-7'>
        {/* 분위기 */}
        <div className='space-y-3'>
          <div className='flex items-center gap-1'>
            <MoodIcon className='h-5 w-5 text-[#7F5D38]' />
            <span className='text-base font-medium text-gray-950'>분위기</span>
          </div>
          <Controller
            name='mood'
            control={control}
            render={({ field }) => (
              <div className='flex flex-wrap gap-3'>
                <ChipButton
                  label='소란스러움'
                  isSelected={field.value === 'NOISY'}
                  onClick={() => field.onChange('NOISY')}
                />
                <ChipButton
                  label='대화하는 분위기'
                  isSelected={field.value === 'CHATTING'}
                  onClick={() => field.onChange('CHATTING')}
                />
                <ChipButton
                  label='잔잔한 분위기'
                  isSelected={field.value === 'CALM'}
                  onClick={() => field.onChange('CALM')}
                />
                <ChipButton
                  label='고요해요'
                  isSelected={field.value === 'SILENT'}
                  onClick={() => field.onChange('SILENT')}
                />
              </div>
            )}
          />
        </div>

        {/* 공간 크기 */}
        <div className='space-y-3'>
          <div className='flex items-center gap-1'>
            <SpaceSizeIcon className='h-5 w-5' />
            <span className='text-base font-medium text-gray-950'>공간 크기</span>
          </div>
          <Controller
            name='spaceSize'
            control={control}
            render={({ field }) => (
              <div className='flex gap-3'>
                <ChipButton
                  label='대형'
                  isSelected={field.value === 'LARGE'}
                  onClick={() => field.onChange('LARGE')}
                />
                <ChipButton
                  label='중형'
                  isSelected={field.value === 'MEDIUM'}
                  onClick={() => field.onChange('MEDIUM')}
                />
                <ChipButton
                  label='소형'
                  isSelected={field.value === 'SMALL'}
                  onClick={() => field.onChange('SMALL')}
                />
              </div>
            )}
          />
        </div>

        {/* 콘센트 환경 */}
        <div className='space-y-3'>
          <div className='flex items-center gap-1'>
            <OutletIcon className='h-5 w-5' />
            <span className='text-base font-medium text-gray-950'>콘센트 환경</span>
          </div>
          <Controller
            name='outletScore'
            control={control}
            render={({ field }) => (
              <div className='flex gap-3'>
                <ChipButton
                  label='넉넉함'
                  isSelected={field.value === 'MANY'}
                  onClick={() => field.onChange('MANY')}
                />
                <ChipButton
                  label='적당함'
                  isSelected={field.value === 'AVERAGE'}
                  onClick={() => field.onChange('AVERAGE')}
                />
                <ChipButton
                  label='부족함'
                  isSelected={field.value === 'FEW'}
                  onClick={() => field.onChange('FEW')}
                />
              </div>
            )}
          />
        </div>

        {/* 혼잡도 */}
        <div className='space-y-3'>
          <div className='flex items-center gap-1'>
            <CrowdIcon className='h-5 w-5 text-[#7F5D38]' />
            <span className='text-base font-medium text-gray-950'>혼잡도</span>
          </div>
          <Controller
            name='crowdStatus'
            control={control}
            render={({ field }) => (
              <div className='flex gap-3'>
                <ChipButton
                  label='혼잡'
                  isSelected={field.value === 'FULL'}
                  onClick={() => field.onChange('FULL')}
                />
                <ChipButton
                  label='보통'
                  isSelected={field.value === 'NORMAL'}
                  onClick={() => field.onChange('NORMAL')}
                />
                <ChipButton
                  label='여유'
                  isSelected={field.value === 'RELAX'}
                  onClick={() => field.onChange('RELAX')}
                />
              </div>
            )}
          />
        </div>
      </div>
    </SectionCard>
  );
}
