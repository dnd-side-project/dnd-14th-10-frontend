import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  useRegistrationStore,
  type LocationData,
} from '@/features/register-place/model/use-registration-store';

import { BottomCta } from '@/shared/ui/bottom-cta/BottomCta';
import { ImageUploadField } from '@/shared/ui/image-upload/ImageUploadField';

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
  images: z
    .array(z.instanceof(File))
    .min(1, '사진을 1장 이상 등록해주세요.')
    .max(6, '사진은 최대 6장까지 등록 가능합니다.'),
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
      images: [],
    },
  });

  const {
    formState: { isValid, errors },
    setValue,
    watch,
  } = methods;

  const { setThumbnail } = useRegistrationStore();

  const images = watch('images') || [];
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const newPreviews = images.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
    setThumbnail(newPreviews[0]);

    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images, setThumbnail]);

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

            <ImageUploadField
              images={images}
              previews={previews}
              onAdd={(newFiles) =>
                setValue('images', [...images, ...newFiles], { shouldValidate: true })
              }
              onRemove={(index) =>
                setValue(
                  'images',
                  images.filter((_, i) => i !== index),
                  { shouldValidate: true },
                )
              }
              initialButtonLabel='[필수] 사진 등록하기'
              error={errors.images?.message}
            />
          </div>

          <BottomCta type='submit' disabled={!isValid || isSubmitting}>
            {isSubmitting ? '등록 중...' : '장소 등록하기'}
          </BottomCta>
        </form>
      </div>
    </FormProvider>
  );
}
