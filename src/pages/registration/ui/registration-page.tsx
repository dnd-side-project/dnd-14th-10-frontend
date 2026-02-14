import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import type { PlaceCategory } from '@/features/register-place/model/register-place.types';
import { useRegisterPlaceMutation } from '@/features/register-place/model/use-register-place-mutation';
import { useRegistrationStore } from '@/features/register-place/model/use-registration-store';
import { CompleteStep } from '@/features/register-place/ui/CompleteStep';
import type { DetailFormValues } from '@/features/register-place/ui/DetailInputStep';
import { DetailInputStep } from '@/features/register-place/ui/DetailInputStep';
import { LocationSearchStep } from '@/features/register-place/ui/LocationSearchStep';
import { TypeSelectStep } from '@/features/register-place/ui/TypeSelectStep';
import { useFunnel } from '@/shared/lib/funnel/use-funnel';
import { Header } from '@/shared/ui/header/Header';

import CloseIcon from '@/shared/ui/icons/Close.svg?react';

const STEPS = ['type', 'location', 'detail', 'complete'] as const;
type Step = (typeof STEPS)[number];

const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  CAFE: '카페',
  PUBLIC: '공공시설',
};

function getHeaderTitle(step: Step, category: PlaceCategory | null): string {
  if (step === 'type' || !category) {
    return '등록';
  }
  return `${CATEGORY_LABELS[category]} 등록`;
}

function RegistrationPage() {
  const navigate = useNavigate();
  const { step, setStep, goBack, canGoBack } = useFunnel({
    steps: STEPS,
    initialStep: 'type',
  });

  const { formData, setCategory, setLocation, setDetail } = useRegistrationStore();
  const [registeredPlaceId, setRegisteredPlaceId] = useState<number | null>(null);

  const { mutate: registerPlace, isPending } = useRegisterPlaceMutation();

  const handleBack = () => {
    if (canGoBack) {
      goBack();
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = (detail: DetailFormValues) => {
    if (!formData.category || !formData.location) return;

    const floorInfoNumber = detail.floorInfo ? parseInt(detail.floorInfo, 10) : undefined;
    const placeName = formData.location.placeName || '';

    setDetail({
      name: placeName,
      outletScore: detail.outletScore,
      spaceSize: detail.spaceSize,
      crowdStatus: detail.crowdStatus,
      mood: detail.mood,
      floorInfo: floorInfoNumber,
      openTime: detail.openTime,
      closeTime: detail.closeTime,
      restroomInfo: detail.restroomInfo,
      tagIds: detail.tagIds,
      images: [],
    });

    registerPlace(
      {
        name: placeName,
        category: formData.category,
        latitude: formData.location.latitude,
        longitude: formData.location.longitude,
        regionCode: formData.location.regionCode ?? 1,
        addressDetail: formData.location.roadAddress || formData.location.address,
        outletScore: detail.outletScore,
        spaceSize: detail.spaceSize,
        crowdStatus: detail.crowdStatus,
        mood: detail.mood,
        images: [], // TODO: 이미지 업로드 구현
        floorInfo: floorInfoNumber,
        openTime: detail.openTime,
        closeTime: detail.closeTime,
        restroomInfo: detail.restroomInfo,
        tagIds: detail.tagIds,
      },
      {
        onSuccess: (response) => {
          setRegisteredPlaceId(response.data?.id ?? null);
          setStep('complete', { replace: true });
        },
        onError: (error) => {
          console.error('등록 실패:', error);
          alert('장소 등록에 실패했습니다. 다시 시도해주세요.');
        },
      },
    );
  };

  const handleCompleteClose = () => {
    navigate(`/place/${registeredPlaceId}`, { replace: true });
  };

  if (step === 'complete' && registeredPlaceId && formData.category) {
    return (
      <div className='h-dvh overflow-hidden bg-white'>
        <Header
          onBack={handleCompleteClose}
          title={getHeaderTitle(step, formData.category)}
          left={<CloseIcon onClick={handleCompleteClose} />}
        />

        <CompleteStep
          placeName={formData.location?.placeName || formData.detail.name}
          placeId={registeredPlaceId.toString()}
          placeCategory={CATEGORY_LABELS[formData.category]}
        />
      </div>
    );
  }

  return (
    <div className='h-dvh overflow-hidden bg-white'>
      <Header onBack={handleBack} title={getHeaderTitle(step, formData.category)} />

      {step === 'type' && (
        <TypeSelectStep
          selectedCategory={formData.category}
          onSelect={setCategory}
          onNext={() => setStep('location')}
        />
      )}

      {step === 'location' && (
        <LocationSearchStep
          selectedLocation={formData.location}
          onSelect={setLocation}
          onNext={() => setStep('detail')}
        />
      )}

      {step === 'detail' && (
        <>
          {console.log(
            'detail step - category:',
            formData.category,
            'location:',
            formData.location,
          )}
          {formData.category && formData.location ? (
            <DetailInputStep
              location={formData.location}
              onSubmit={handleSubmit}
              isSubmitting={isPending}
            />
          ) : (
            <div className='p-5 text-center text-gray-500'>
              데이터 로딩 중... (category: {formData.category ? 'O' : 'X'}, location:{' '}
              {formData.location ? 'O' : 'X'})
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RegistrationPage;
