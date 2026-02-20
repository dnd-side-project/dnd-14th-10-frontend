import { useAuthStore } from '@/features/auth/model/use-auth-store';
import { apiClient } from '@/shared/api/client';
import { isApiError } from '@/shared/api/error.utils';

interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

export const setupInterceptors = () => {
  // Request Interceptor: Authorization 헤더 추가
  apiClient.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  // Response Interceptor: 401 에러 처리 및 토큰 갱신
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      // 개발 환경에서 상세 에러 로깅
      if (import.meta.env.DEV && isApiError(error)) {
        console.error('[API Error]', {
          url: (error as { config?: { url?: string } }).config?.url,
          status: error.response?.status,
          code: error.response?.data.code,
          message: error.response?.data.message,
          errors: error.response?.data.errors,
        });
      }

      const originalRequest = error.config;

      // 401 에러이고 재시도하지 않은 요청인 경우
      if (error.response?.status === 401 && !originalRequest._retry) {
        // refresh 요청 자체가 401이면 인증 상태만 초기화 (리다이렉트는 ProtectedRoute에서 처리)
        if (originalRequest.url?.includes('/auth/refresh')) {
          useAuthStore.getState().clearAuth();
          return Promise.reject(error);
        }

        // 이미 토큰 갱신 중이면 큐에 대기
        if (isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const response = await apiClient.post<{ accessToken: string }>('/auth/refresh');
          const newToken = response.data.accessToken;

          useAuthStore.getState().setAuth(newToken);
          processQueue(null, newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          useAuthStore.getState().clearAuth();
          // 리다이렉트는 ProtectedRoute에서 처리 (선언적 방식)
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
};
