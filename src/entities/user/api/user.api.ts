import { apiClient } from '@/shared/api/client';

// GET /api/users/{user-id} (정보 조회)
export const getUserInfo = (userId: string) => {
  return apiClient.get(`/users/${userId}`);
};

// PATCH /api/users/me (정보 수정)
export const updateMyInfo = (data: unknown) => {
  return apiClient.patch('/users/me', data);
};

// GET /api/users/me/badges (배지 조회)
export const getMyBadges = () => {
  return apiClient.get('/users/me/badges');
};

// GET /api/users/me/wishlist (위시리스트 조회)
export const getMyWishlist = () => {
  return apiClient.get('/users/me/wishlist');
};

// GET /api/users/me/histories (최근 본 장소)
export const getMyHistories = () => {
  return apiClient.get('/users/me/histories');
};
