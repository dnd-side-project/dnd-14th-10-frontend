import { useNavigate } from 'react-router-dom';

import type { Place } from '@/entities/place/model/place.types';
import { CompletePage } from '@/shared/ui/complete-page/CompletePage';

import { useRegistrationStore } from '../model/use-registration-store';

interface CompleteStepProps {
  placeId: Place['id'];
  placeName: string;
  placeCategory: string;
}

export function CompleteStep({ placeId, placeName, placeCategory }: CompleteStepProps) {
  const thumbnail = useRegistrationStore((state) => state.completeData.thumbnail);
  const reset = useRegistrationStore((state) => state.reset);
  const navigate = useNavigate();

  return (
    <CompletePage
      title='장소가 등록되었습니다!'
      imageSrc={thumbnail ?? ''}
      name={placeName}
      description={placeCategory}
      buttonLabel='등록된 페이지로 이동하기'
      onButtonClick={() => {
        reset();
        navigate(`/place/${placeId}`, { replace: true });
      }}
      onClose={() => {
        reset();
        navigate('/', { replace: true });
      }}
    />
  );
}
