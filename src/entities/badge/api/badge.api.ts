import { apiClient } from '@/shared/api/client';
import type { BadgeProgressResponse } from '@/shared/types/badge';

export const getBadgeProgress = () => {
  return apiClient.get<BadgeProgressResponse>('/badges/progress');
};
