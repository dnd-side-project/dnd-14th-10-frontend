import { type ChangeEvent, Suspense, useEffect, useMemo, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import type { PlaceDetail } from '@/entities/place/model/place.types';
import { usePlaceDetailQuery } from '@/entities/place/model/use-place-detail-query';

import type { PlaceImageRequest } from '@/features/register-place/model/register-place.types';
import { useUpdatePlaceMutation } from '@/features/register-place/model/use-update-place-mutation';
import { useUploadImagesMutation } from '@/features/register-place/model/use-upload-images-mutation';
import { AdditionalInfoSection } from '@/features/register-place/ui/AdditionalInfoSection';
import { BusinessHoursSection } from '@/features/register-place/ui/BusinessHoursSection';
import { GoodPointsSection } from '@/features/register-place/ui/GoodPointsSection';
import { WorkspaceReviewSection } from '@/features/register-place/ui/WorkspaceReviewSection';

import { extractImageKey } from '@/shared/lib/image-utils';
import { BottomCta } from '@/shared/ui/bottom-cta/BottomCta';
import AddCircleIcon from '@/shared/ui/icons/AddCircle.svg?react';
import ImageUploadIcon from '@/shared/ui/icons/ImageUpload.svg?react';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

const placeEditSchema = z.object({
  outletScore: z.enum(['FEW', 'AVERAGE', 'MANY']),
  spaceSize: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
  crowdStatus: z.enum(['RELAX', 'NORMAL', 'FULL']),
  mood: z.enum(['NOISY', 'CHATTING', 'CALM', 'SILENT']),
  tagIds: z.array(z.number()).min(2, '2개 이상 선택해주세요').max(5, '5개까지 선택 가능합니다'),
  openTime: z.string().optional(),
  closeTime: z.string().optional(),
  floorInfo: z.string().optional(),
  restroomInfo: z.string().optional(),
});

type PlaceEditFormValues = z.infer<typeof placeEditSchema>;

function PlaceEditContent() {
  const { placeId } = useParams<{ placeId: string }>();

  if (!placeId) {
    return (
      <div className='flex h-dvh items-center justify-center bg-white'>
        <span className='text-gray-500'>장소를 찾을 수 없습니다.</span>
      </div>
    );
  }

  return <PlaceEditFormWrapper placeId={placeId} />;
}

function PlaceEditFormWrapper({ placeId }: { placeId: string }) {
  const { data: placeDetail } = usePlaceDetailQuery(placeId);

  return <PlaceEditForm placeDetail={placeDetail} />;
}

function PlaceEditForm({ placeDetail }: { placeDetail: PlaceDetail }) {
  const navigate = useNavigate();
  const { mutate: updatePlace, isPending: isUpdating } = useUpdatePlaceMutation();
  const { mutateAsync: uploadImages, isPending: isUploading } = useUploadImagesMutation();

  const [deletedImageSequences, setDeletedImageSequences] = useState<Set<number>>(new Set());
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const previousPreviewsRef = useRef<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const methods = useForm<PlaceEditFormValues>({
    resolver: zodResolver(placeEditSchema),
    mode: 'onChange',
    defaultValues: {
      outletScore: placeDetail.outletScore,
      spaceSize: placeDetail.spaceSize,
      crowdStatus: placeDetail.crowdStatus,
      mood: placeDetail.mood,
      tagIds: placeDetail.tagIds ?? [],
      openTime: placeDetail.openTime || '',
      closeTime: placeDetail.closeTime || '',
      floorInfo: placeDetail.floorInfo?.toString() || '',
      restroomInfo: placeDetail.restroomInfo || '',
    },
  });

  const {
    formState: { isValid },
  } = methods;

  const isPending = isUpdating || isUploading;

  const existingImages = useMemo(() => {
    return placeDetail.images
      .filter((img) => !deletedImageSequences.has(img.sequence))
      .map((img) => ({
        imageKey: extractImageKey(img.url),
        sequence: img.sequence,
        isRepresentative: img.representativeFlag,
        url: img.url,
      }));
  }, [placeDetail.images, deletedImageSequences]);

  const newPreviews = useMemo(() => {
    return newFiles.map((file) => URL.createObjectURL(file));
  }, [newFiles]);

  const totalImages = existingImages.length + newFiles.length;

  useEffect(() => {
    previousPreviewsRef.current.forEach((url) => URL.revokeObjectURL(url));
    previousPreviewsRef.current = newPreviews;
    return () => {
      previousPreviewsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newPreviews]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const addedFiles = Array.from(files);
    const remaining = 6 - totalImages;

    if (addedFiles.length > remaining) {
      alert(`사진은 최대 6장까지 등록 가능합니다. (현재 ${totalImages}장)`);
      e.target.value = '';
      return;
    }

    setNewFiles((prev) => [...prev, ...addedFiles]);
    e.target.value = '';
  };

  const handleRemoveExistingImage = (sequence: number) => {
    setDeletedImageSequences((prev) => new Set(prev).add(sequence));
  };

  const handleRemoveNewImage = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (data: PlaceEditFormValues) => {
    let uploadedImages: PlaceImageRequest[] = [];

    if (newFiles.length > 0) {
      try {
        const result = await uploadImages(newFiles);
        uploadedImages = result.images;
      } catch {
        alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        return;
      }
    }

    const existingImageRequests: PlaceImageRequest[] = existingImages.map((img, index) => ({
      imageKey: img.imageKey,
      sequence: index,
      isRepresentative: index === 0,
    }));

    const newImageRequests: PlaceImageRequest[] = uploadedImages.map((img, index) => ({
      imageKey: img.imageKey,
      sequence: existingImages.length + index,
      isRepresentative: existingImages.length === 0 && index === 0,
    }));

    const allImages = [...existingImageRequests, ...newImageRequests];

    if (allImages.length === 0) {
      alert('최소 1장의 이미지가 필요합니다.');
      return;
    }

    const floorInfoNumber = data.floorInfo ? parseInt(data.floorInfo, 10) : undefined;

    const formatTimeToHHmm = (time: string | undefined): string | undefined => {
      if (!time) return undefined;
      const parts = time.split(':');
      if (parts.length >= 2) {
        return `${parts[0]}:${parts[1]}`;
      }
      return time;
    };

    const requestData = {
      outletScore: data.outletScore,
      spaceSize: data.spaceSize,
      crowdStatus: data.crowdStatus,
      mood: data.mood,
      tagIds: data.tagIds,
      openTime: formatTimeToHHmm(data.openTime),
      closeTime: formatTimeToHHmm(data.closeTime),
      floorInfo: floorInfoNumber,
      restroomInfo: data.restroomInfo || undefined,
      images: allImages,
    };

    updatePlace(
      {
        placeId: String(placeDetail.id),
        data: requestData,
      },
      {
        onSuccess: () => {
          navigate(-1);
        },
        onError: () => {
          alert('장소 수정에 실패했습니다. 다시 시도해주세요.');
        },
      },
    );
  };

  return (
    <div className='h-dvh overflow-hidden bg-white'>
      <NavigationBar onBack={() => navigate(-1)} title='장소 수정' />
      <FormProvider {...methods}>
        <div className='h-[calc(100dvh-48px)] overflow-y-auto'>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <div className='space-y-[24px] px-5 pb-28'>
              {/* 장소 정보 */}
              <div className='flex items-center gap-3 pt-4'>
                <div className='flex flex-col gap-2'>
                  <span className='text-[22px] font-bold text-gray-950'>{placeDetail.name}</span>
                  <span className='text-sm text-gray-950'>{placeDetail.addressDetail}</span>
                </div>
              </div>

              {/* 영업 시간 */}
              <BusinessHoursSection />

              {/* 좋은 점 태그 */}
              <GoodPointsSection />

              {/* 작업 공간 평가 */}
              <WorkspaceReviewSection />

              {/* 추가 정보 */}
              <AdditionalInfoSection />

              {/* 사진 등록하기 버튼 */}
              {totalImages === 0 && (
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
                    {/* 기존 이미지 */}
                    {existingImages.map((img) => (
                      <div key={img.sequence} className='relative h-[100px] w-[100px] shrink-0'>
                        <img
                          src={img.url}
                          alt={`기존 이미지 ${img.sequence}`}
                          className='h-full w-full rounded-lg object-cover'
                        />
                        <button
                          type='button'
                          onClick={() => handleRemoveExistingImage(img.sequence)}
                          className='bg-opacity-50 absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-white'
                        >
                          <span className='text-xs font-bold'>X</span>
                        </button>
                      </div>
                    ))}

                    {/* 새 이미지 */}
                    {newPreviews.map((preview, index) => (
                      <div key={preview} className='relative h-[100px] w-[100px] shrink-0'>
                        <img
                          src={preview}
                          alt={`새 이미지 ${index}`}
                          className='h-full w-full rounded-lg object-cover'
                        />
                        <button
                          type='button'
                          onClick={() => handleRemoveNewImage(index)}
                          className='bg-opacity-50 absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-white'
                        >
                          <span className='text-xs font-bold'>X</span>
                        </button>
                      </div>
                    ))}

                    {/* 추가 버튼 */}
                    {totalImages > 0 && totalImages < 6 && (
                      <button
                        type='button'
                        onClick={() => inputRef.current?.click()}
                        className='bg-gray-150 flex h-[100px] w-[100px] shrink-0 flex-col items-center justify-center gap-1 rounded-lg text-gray-500'
                      >
                        <AddCircleIcon width={25} height={25} className='text-primary-700' />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <BottomCta type='submit' disabled={!isValid || isPending || totalImages === 0}>
              {isPending ? '수정 중...' : '장소 수정하기'}
            </BottomCta>
          </form>
        </div>
      </FormProvider>
    </div>
  );
}

export default function PlaceEditPage() {
  return (
    <Suspense
      fallback={
        <div className='flex h-dvh items-center justify-center bg-white'>
          <span className='text-gray-500'>로딩 중...</span>
        </div>
      }
    >
      <PlaceEditContent />
    </Suspense>
  );
}
