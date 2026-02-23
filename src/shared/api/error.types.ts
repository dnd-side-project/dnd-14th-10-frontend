// 필드 에러
export interface FieldError {
  field: string;
  reason: string;
}

// API 에러 응답
export interface ApiErrorResponse {
  code: string;
  message: string;
  errors: FieldError[] | null;
}

// Axios 에러를 확장한 타입
export interface ApiError {
  response?: {
    data: ApiErrorResponse;
    status: number;
  };
  config?: {
    url?: string;
  };
  message: string;
}
