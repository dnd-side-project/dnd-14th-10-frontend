const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const STORAGE_PATH = '/storage/gojak-bucket';

export const getImageUrl = (objectKey: string | null | undefined): string => {
  if (!objectKey) {
    return '';
  }
  if (objectKey.startsWith('http://') || objectKey.startsWith('https://')) {
    return objectKey;
  }
  return `${API_BASE_URL}${STORAGE_PATH}/${objectKey}`;
};

const STORAGE_PROXY_PREFIX = '/storage/gojak-bucket/';

export const extractImageKey = (imageUrl: string): string => {
  if (!imageUrl) return '';

  try {
    const url = new URL(imageUrl);
    const pathname = url.pathname;

    if (pathname.startsWith(STORAGE_PROXY_PREFIX)) {
      return pathname.slice(STORAGE_PROXY_PREFIX.length);
    }

    return pathname.slice(1);
  } catch {
    return imageUrl;
  }
};
