import { useMutation, useQueryClient } from '@tanstack/react-query';

import { placeKeys } from '@/entities/place/model/place-query-keys';
import { userKeys } from '@/entities/user/model/query-keys';

import type { PlaceRegisterRequest } from './register-place.types';
import { registerPlace } from '../api/register-place.api';

export const useRegisterPlaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PlaceRegisterRequest) => registerPlace(data),
    onSuccess: () => {
      // MY 페이지의 장소 개수 업데이트를 위해 user 캐시 무효화
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
      // 등록 장소 히스토리 페이지의 장소 목록 업데이트를 위해 places 캐시 무효화
      queryClient.invalidateQueries({ queryKey: placeKeys.myPlaces() });
    },
  });
};
