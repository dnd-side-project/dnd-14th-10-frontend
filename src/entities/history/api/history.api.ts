import { apiClient } from '@/shared/api/client';
import type { PagedHistoryResponse } from '@/shared/types/history';

export interface GetMyHistoriesParams {
  page?: number;
  size?: number;
  sort?: string;
}

export const getMyHistories = (params: GetMyHistoriesParams = {}) => {
  const { page = 0, size = 10, sort = 'viewedAt,desc' } = params;
  return apiClient.get<PagedHistoryResponse>('/histories/me', {
    params: { page, size, sort },
  });
};
