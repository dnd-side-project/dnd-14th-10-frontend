import { type ChangeEvent, useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import type { LocationData } from '@/features/register-place/model/use-registration-store';

import { BottomCta } from '@/shared/ui/bottom-cta/BottomCta';

import AddCircleIcon from '@/shared/ui/icons/AddCircle.svg?react';
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

  const images = watch('images') || [];
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const totalFiles = images.length + newFiles.length;

    if (totalFiles > 6) {
      alert('사진은 최대 6장까지 등록할 수 있습니다.');
      e.target.value = '';
      return;
    }

    const updatedFiles = [...images, ...newFiles];
    setValue('images', updatedFiles, { shouldValidate: true });
    e.target.value = '';
  };

  // const handleRemoveImage = (index: number) => {
  //   const updatedFiles = images.filter((_, i) => i !== index);
  //   setValue('images', updatedFiles, { shouldValidate: true });
  // };

  useEffect(() => {
    const newPreviews = images.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

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
            {images.length === 0 && (
              <button
                type='button'
                className='bg-primary-10 flex w-full items-center justify-center gap-2 rounded-lg px-5 py-5'
                onClick={() => inputRef.current?.click()}
              >
                <ImageUploadIcon className='text-primary-700 h-5 w-5' />
                <span className='text-primary-700 text-base font-bold'>[필수] 사진 등록하기</span>
              </button>
            )}

            <div className='space-y-2'>
              <div className='flex items-center gap-3'>
                <input
                  type='file'
                  multiple
                  accept='image/*'
                  ref={inputRef}
                  onChange={handleFileChange}
                  className='hidden'
                />

                <div className='flex min-w-0 flex-1 gap-3 overflow-x-auto'>
                  {previews.map((preview, index) => (
                    <div key={preview} className='relative h-[100px] w-[100px] flex-shrink-0'>
                      <img
                        src={preview}
                        alt={`preview ${index}`}
                        className='h-full w-full rounded-lg object-cover'
                      />
                      {/* <button
                        type='button'
                        onClick={() => handleRemoveImage(index)}
                        className='bg-opacity-50 absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-white'
                      >
                        <span className='text-xs font-bold'>X</span>
                      </button> */}
                    </div>
                  ))}

                  {images.length > 0 && (
                    <button
                      type='button'
                      onClick={() => inputRef.current?.click()}
                      className='bg-gray-150 flex h-[100px] w-[100px] flex-shrink-0 flex-col items-center justify-center gap-1 rounded-lg text-gray-500'
                    >
                      <AddCircleIcon width={25} height={25} className='text-primary-700' />
                    </button>
                  )}
                </div>
              </div>
              {errors.images && <p className='text-sm text-red-500'>{errors.images.message}</p>}
            </div>
          </div>

          <BottomCta type='submit' disabled={!isValid || isSubmitting}>
            {isSubmitting ? '등록 중...' : '장소 등록하기'}
          </BottomCta>
        </form>
      </div>
    </FormProvider>
  );
}
