const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || '';

export const getImageUrl = (objectKey: string | null | undefined): string => {
  if (!objectKey) {
    return '';
  }
  if (objectKey.startsWith('http://') || objectKey.startsWith('https://')) {
    return objectKey;
  }
  return `${IMAGE_BASE_URL}/${objectKey}`;
};
