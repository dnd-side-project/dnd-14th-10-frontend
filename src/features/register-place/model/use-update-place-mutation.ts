import { useMutation, useQueryClient } from '@tanstack/react-query';

import { placeKeys } from '@/entities/place/model/place-query-keys';

import type { PlaceRegisterRequest } from './register-place.types';
import { updatePlace } from '../api/register-place.api';

export const useUpdatePlaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ placeId, data }: { placeId: string; data: Partial<PlaceRegisterRequest> }) =>
      updatePlace(placeId, data),
    onSuccess: () => {
      console.log('[장소 수정 성공] 캐시 무효화 실행');
      // 수정된 장소의 상세 정보 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: placeKeys.all,
        refetchType: 'all',
      });
      // 내 장소 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: placeKeys.myPlaces(),
        refetchType: 'all',
      });
    },
  });
};
