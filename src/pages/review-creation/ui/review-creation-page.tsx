import { type ChangeEvent, Suspense, useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { usePlaceDetailQuery } from '@/entities/place/model/use-place-detail-query';
import { useCreateReviewMutation } from '@/features/manage-review/model/use-create-review-mutation';
import { useUploadImagesMutation } from '@/features/register-place/model/use-upload-images-mutation';
import { GoodPointsSection } from '@/features/register-place/ui/GoodPointsSection';
import { SectionCard } from '@/features/register-place/ui/SectionCard';
import { WorkspaceReviewSection } from '@/features/register-place/ui/WorkspaceReviewSection';
import check3dImage from '@/shared/assets/images/check-3d.png';
import { BottomCta } from '@/shared/ui/bottom-cta/BottomCta';
import { CompletePage } from '@/shared/ui/complete-page/CompletePage';
import AddCircleIcon from '@/shared/ui/icons/AddCircle.svg?react';
import CloseCircleIcon from '@/shared/ui/icons/CloseCircle.svg?react';
import ReviewChatIcon from '@/shared/ui/icons/ReviewChat.svg?react';
import StarIcon from '@/shared/ui/icons/Star.svg?react';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

const reviewSchema = z.object({
  rating: z.number().min(1, '별점을 선택해주세요').max(5),
  tagIds: z.array(z.number()).min(2, '2개 이상 선택해주세요').max(5, '5개까지 선택 가능합니다'),
  mood: z.enum(['NOISY', 'CHATTING', 'CALM', 'SILENT'], { message: '분위기를 선택해주세요' }),
  spaceSize: z.enum(['SMALL', 'MEDIUM', 'LARGE'], { message: '공간 크기를 선택해주세요' }),
  outletScore: z.enum(['FEW', 'AVERAGE', 'MANY'], { message: '콘센트 환경을 선택해주세요' }),
  crowdStatus: z.enum(['RELAX', 'NORMAL', 'FULL'], { message: '혼잡도를 선택해주세요' }),
  content: z.string().max(1000, '1000자까지 입력 가능합니다').optional(),
  images: z.array(z.instanceof(File)).max(6, '사진은 최대 6장까지 등록 가능합니다').optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

function ReviewCreationContent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const placeId = id!;

  const { data: placeDetail } = usePlaceDetailQuery(placeId);
  const { mutate: createReview, isPending: isCreating } = useCreateReviewMutation();
  const { mutateAsync: uploadImages, isPending: isUploading } = useUploadImagesMutation();

  const [isComplete, setIsComplete] = useState(false);
  const [reviewOrder, setReviewOrder] = useState<number | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const methods = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    mode: 'onChange',
    defaultValues: {
      tagIds: [],
      images: [],
    },
  });

  const {
    formState: { isValid },
    setValue,
    watch,
    control,
    register,
  } = methods;

  const images = watch('images') || [];
  const content = watch('content') || '';
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const isPending = isUploading || isCreating;

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

  const handleRemoveImage = (index: number) => {
    const updatedFiles = images.filter((_, i) => i !== index);
    setValue('images', updatedFiles, { shouldValidate: true });
  };

  useEffect(() => {
    const newPreviews = images.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
    if (newPreviews[0]) {
      setThumbnail(newPreviews[0]);
    }

    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleSubmit = async (data: ReviewFormValues) => {
    try {
      let uploadedImages: { imageKey: string; sequence: number; isPrimary: boolean }[] = [];

      if (data.images && data.images.length > 0) {
        const result = await uploadImages(data.images);
        uploadedImages = result.images.map((img) => ({
          imageKey: img.imageKey,
          sequence: img.sequence,
          isPrimary: img.isRepresentative,
        }));
      }

      createReview(
        {
          placeId: Number(placeId),
          rating: data.rating,
          tagIds: data.tagIds,
          mood: data.mood,
          spaceSize: data.spaceSize,
          outletScore: data.outletScore,
          crowdStatus: data.crowdStatus,
          content: data.content || '',
          images: uploadedImages,
          visitedAt: new Date().toISOString(),
        },
        {
          onSuccess: (response) => {
            setReviewOrder(response.data?.reviewOrder ?? null);
            setIsComplete(true);
          },
          onError: (error) => {
            console.error('리뷰 등록 실패:', error);
            alert('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
          },
        },
      );
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (isComplete) {
    return (
      <CompletePage
        title={
          thumbnail
            ? `${reviewOrder}번째 리뷰가\n등록되었습니다!`
            : `${placeDetail.name}\n${reviewOrder}번째 리뷰가\n등록되었습니다!`
        }
        imageSrc={thumbnail ?? undefined}
        fallbackImage={thumbnail ? undefined : check3dImage}
        name={placeDetail.name}
        buttonLabel={'홈으로 돌아가기'}
        onButtonClick={() => navigate('/', { replace: true })}
        onClose={() => navigate('/', { replace: true })}
      />
    );
  }

  const placeImage = placeDetail.images?.[0];

  return (
    <div className='h-dvh overflow-hidden bg-white'>
      <NavigationBar onBack={() => navigate(-1)} title='리뷰 남기기' />

      <FormProvider {...methods}>
        <div className='h-[calc(100dvh-48px)] overflow-y-auto'>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <div className='space-y-6 px-5 pb-28'>
              {/* 장소 정보 */}
              <div className='flex items-center gap-3 pt-4'>
                {placeImage && (
                  <img
                    src={placeImage.url}
                    alt={placeDetail.name}
                    className='h-[60px] w-[60px] rounded-lg object-cover'
                  />
                )}
                <div className='flex flex-col gap-2'>
                  <span className='text-[22px] font-bold text-black'>{placeDetail.name}</span>
                  <span className='text-sm text-black'>{placeDetail.addressDetail}</span>
                </div>
              </div>

              {/* 별점 섹션 */}
              <SectionCard>
                <div className='flex items-center justify-center gap-3'>
                  <h2 className='text-[22px] font-bold text-black'>작업 공간은 어땠나요?</h2>
                  <span className='text-warning-default text-xs'>필수</span>
                </div>
                <Controller
                  name='rating'
                  control={control}
                  render={({ field }) => (
                    <div className='mt-2 flex items-center justify-center'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type='button'
                          onClick={() => field.onChange(star)}
                          className='p-0.5'
                        >
                          <StarIcon
                            className={`h-9 w-9 ${
                              star <= (field.value || 0) ? 'text-primary-700' : 'text-gray-200'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                />
              </SectionCard>

              {/* 태그 섹션 */}
              <GoodPointsSection />

              {/* 작업 공간 평가 */}
              <WorkspaceReviewSection />

              {/* 리뷰 텍스트 */}
              <div>
                <div className='flex items-center gap-1'>
                  <ReviewChatIcon className='h-[22px] w-[22px]' />
                  <h2 className='text-[22px] font-bold text-black'>리뷰를 남겨주세요</h2>
                </div>
                <div className='relative mt-3'>
                  <textarea
                    {...register('content')}
                    placeholder='여러분만의 작업공간에서의 경험을 자유롭게 공유해주세요.'
                    maxLength={1000}
                    className='h-[200px] w-full resize-none rounded-xl bg-gray-50 p-4 pb-8 text-base font-medium text-gray-950 placeholder:text-gray-500 focus:outline-none'
                  />
                  <p className='absolute right-4 bottom-3 text-[10px] text-gray-700'>
                    {content.length} / 1000
                  </p>
                </div>
              </div>

              {/* 이미지 업로드 */}
              <div className='space-y-2'>
                <input
                  type='file'
                  multiple
                  accept='image/*'
                  ref={inputRef}
                  onChange={handleFileChange}
                  className='hidden'
                />

                <div className='flex min-w-0 gap-2 overflow-x-auto'>
                  {previews.map((preview, index) => (
                    <div key={preview} className='relative h-[100px] w-[100px] flex-shrink-0'>
                      <img
                        src={preview}
                        alt={`preview ${index}`}
                        className='h-full w-full rounded-xl object-cover'
                      />
                      <button
                        type='button'
                        onClick={() => handleRemoveImage(index)}
                        className='absolute -top-2 -right-2'
                      >
                        <CloseCircleIcon className='h-[24px] w-[24px]' />
                      </button>
                    </div>
                  ))}

                  {images.length < 6 && (
                    <button
                      type='button'
                      onClick={() => inputRef.current?.click()}
                      className='bg-gray-150 flex h-[100px] w-[100px] flex-shrink-0 items-center justify-center rounded-xl'
                    >
                      <AddCircleIcon width={30} height={30} className='text-primary-700' />
                    </button>
                  )}
                </div>
                <p className='text-xs text-gray-500'>사진은 최대 6장까지 업로드 가능해요.</p>
              </div>
            </div>

            <BottomCta type='submit' disabled={!isValid || isPending}>
              {isPending ? '등록 중...' : '리뷰 등록하기'}
            </BottomCta>
          </form>
        </div>
      </FormProvider>
    </div>
  );
}

function ReviewCreationPage() {
  return (
    <Suspense fallback={<div className='flex h-dvh items-center justify-center'>로딩 중...</div>}>
      <ReviewCreationContent />
    </Suspense>
  );
}

export default ReviewCreationPage;
