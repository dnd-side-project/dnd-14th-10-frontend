import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import type { LocationData } from '@/features/register-place/model/use-registration-store';

import { BottomCta } from '@/shared/ui/bottom-cta/BottomCta';
import ImageUploadIcon from '@/shared/ui/icons/ImageUpload.svg?react';

import { AdditionalInfoSection } from './AdditionalInfoSection';
import { BusinessHoursSection } from './BusinessHoursSection';
import { GoodPointsSection } from './GoodPointsSection';
import { PlaceSummarySection } from './PlaceSummarySection';
import { WorkspaceReviewSection } from './WorkspaceReviewSection';

const detailSchema = z.object({
  outletScore: z.enum(['FEW', 'AVERAGE', 'MANY'], { message: '콘센트 환경을 선택해주세요' }),
  spaceSize: z.enum(['SMALL', 'MEDIUM', 'LARGE'], { message: '공간 크기를 선택해주세요' }),
  crowdStatus: z.enum(['RELAX', 'NORMAL', 'FULL'], { message: '혼잡도를 선택해주세요' }),
  mood: z.enum(['NOISY', 'CHATTING', 'CALM', 'SILENT'], { message: '분위기를 선택해주세요' }),
  tagIds: z.array(z.number()).min(2, '2개 이상 선택해주세요').max(5, '5개까지 선택 가능합니다'),
  floorInfo: z.string().optional(),
  openTime: z.string().optional(),
  closeTime: z.string().optional(),
  restroomInfo: z.string().optional(),
});

export type DetailFormValues = z.infer<typeof detailSchema>;

interface DetailInputStepProps {
  location: LocationData;
  onSubmit: (data: DetailFormValues) => void;
  isSubmitting?: boolean;
}

export function DetailInputStep({ location, onSubmit, isSubmitting }: DetailInputStepProps) {
  const methods = useForm<DetailFormValues>({
    resolver: zodResolver(detailSchema),
    mode: 'onChange',
    defaultValues: {
      tagIds: [],
    },
  });

  const { isValid } = methods.formState;

  return (
    <FormProvider {...methods}>
      <div className='h-[calc(100dvh-48px)] overflow-y-auto'>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='space-y-[24px] px-5 pb-28'>
            <PlaceSummarySection location={location} />
            <BusinessHoursSection />
            <GoodPointsSection />
            <WorkspaceReviewSection />
            <AdditionalInfoSection />

            {/* 사진 등록하기 버튼 */}
            <button
              type='button'
              className='bg-primary-10 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-5'
            >
              <ImageUploadIcon className='h-5 w-5 text-primary-100' />
              <span className='text-primary-100 text-base font-bold'>[필수] 사진 등록하기</span>
            </button>
          </div>

          <BottomCta type='submit' disabled={!isValid || isSubmitting}>
            {isSubmitting ? '등록 중...' : '장소 등록하기'}
          </BottomCta>
        </form>
      </div>
    </FormProvider>
  );
}
