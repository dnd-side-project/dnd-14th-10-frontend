import { useFunnel } from '@use-funnel/react-router-dom';
import { useNavigate } from 'react-router-dom';

import type { PlaceCategory } from '@/features/register-place/model/register-place.types';
import { useRegisterPlaceMutation } from '@/features/register-place/model/use-register-place-mutation';
import { useRegistrationStore } from '@/features/register-place/model/use-registration-store';
import { useUploadImagesMutation } from '@/features/register-place/model/use-upload-images-mutation';
import { CompleteStep } from '@/features/register-place/ui/CompleteStep';
import type { DetailFormValues } from '@/features/register-place/ui/DetailInputStep';
import { DetailInputStep } from '@/features/register-place/ui/DetailInputStep';
import { LocationSearchStep } from '@/features/register-place/ui/LocationSearchStep';
import { TypeSelectStep } from '@/features/register-place/ui/TypeSelectStep';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

type RegistrationSteps = {
  type: { placeId?: number };
  location: { placeId?: number };
  detail: { placeId?: number };
  complete: { placeId: number };
};

const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  CAFE: '카페',
  PUBLIC: '공공시설',
};

function getHeaderTitle(step: string, category: PlaceCategory | null): string {
  if (step === 'type' || !category) {
    return '등록';
  }
  return `${CATEGORY_LABELS[category]} 등록`;
}

function RegistrationPage() {
  const navigate = useNavigate();

  const funnel = useFunnel<RegistrationSteps>({
    id: 'registration',
    initial: {
      step: 'type',
      context: {},
    },
  });

  const { formData, setCategory, setLocation, setDetail } = useRegistrationStore();

  const { mutate: registerPlace, isPending: isRegistering } = useRegisterPlaceMutation();
  const { mutateAsync: uploadImages, isPending: isUploading } = useUploadImagesMutation();

  const isPending = isUploading || isRegistering;

  const handleSubmit = (detail: DetailFormValues, history: typeof funnel.history) => {
    if (!formData.category || !formData.location) return;

    const floorInfoNumber = detail.floorInfo ? parseInt(detail.floorInfo, 10) : undefined;
    const openTime = detail.openTime || undefined;
    const closeTime = detail.closeTime || undefined;
    const restroomInfo = detail.restroomInfo || undefined;
    const placeName = formData.location.placeName || '';

    const doRegister = async () => {
      try {
        const { images } = await uploadImages(detail.images);

        setDetail({
          name: placeName,
          outletScore: detail.outletScore,
          spaceSize: detail.spaceSize,
          crowdStatus: detail.crowdStatus,
          mood: detail.mood,
          floorInfo: floorInfoNumber,
          openTime,
          closeTime,
          restroomInfo,
          tagIds: detail.tagIds,
          images,
        });

        registerPlace(
          {
            name: placeName,
            category: formData.category!,
            latitude: formData.location!.latitude,
            longitude: formData.location!.longitude,
            regionCode: formData.location!.regionCode,
            addressDetail: formData.location!.roadAddress || formData.location!.address,
            outletScore: detail.outletScore,
            spaceSize: detail.spaceSize,
            crowdStatus: detail.crowdStatus,
            mood: detail.mood,
            images,
            floorInfo: floorInfoNumber,
            openTime,
            closeTime,
            restroomInfo,
            tagIds: detail.tagIds,
          },
          {
            onSuccess: (response) => {
              const placeId = response.data.placeId;
              history.replace('complete', { placeId });
            },
            onError: (error) => {
              console.error('등록 실패:', error);
              alert('장소 등록에 실패했습니다. 다시 시도해주세요.');
            },
          },
        );
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      }
    };

    doRegister();
  };

  return (
    <funnel.Render
      type={({ history }) => (
        <div className='h-dvh overflow-hidden bg-white'>
          <NavigationBar
            onBack={() => navigate(-1)}
            title={getHeaderTitle('type', formData.category)}
          />
          <TypeSelectStep
            selectedCategory={formData.category}
            onSelect={setCategory}
            onNext={() => history.push('location', {})}
          />
        </div>
      )}
      location={({ history }) => (
        <div className='h-dvh overflow-hidden bg-white'>
          <NavigationBar
            onBack={() => history.back()}
            title={getHeaderTitle('location', formData.category)}
          />
          <LocationSearchStep
            selectedLocation={formData.location}
            onSelect={setLocation}
            onNext={() => history.push('detail', {})}
          />
        </div>
      )}
      detail={({ history }) => (
        <div className='h-dvh overflow-hidden bg-white'>
          <NavigationBar
            onBack={() => history.back()}
            title={getHeaderTitle('detail', formData.category)}
          />
          {formData.category && formData.location ? (
            <DetailInputStep
              location={formData.location}
              onSubmit={(detail) => handleSubmit(detail, history)}
              isSubmitting={isPending}
            />
          ) : (
            <div className='p-5 text-center text-gray-500'>
              데이터 로딩 중... (category: {formData.category ? 'O' : 'X'}, location:{' '}
              {formData.location ? 'O' : 'X'})
            </div>
          )}
        </div>
      )}
      complete={({ context }) => (
        <CompleteStep
          placeName={formData.location?.placeName || formData.detail.name}
          placeId={context.placeId}
          placeCategory={formData.category ? CATEGORY_LABELS[formData.category] : ''}
        />
      )}
    />
  );
}

export default RegistrationPage;
