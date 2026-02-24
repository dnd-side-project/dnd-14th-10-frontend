import { useMutation } from '@tanstack/react-query';

import type { PlaceImageRequest } from './register-place.types';
import { getPresignedUrls, uploadImageToPresignedUrl } from '../api/register-place.api';

interface UploadImagesResult {
  images: PlaceImageRequest[];
}

export const useUploadImagesMutation = () => {
  return useMutation({
    mutationFn: async (files: File[]): Promise<UploadImagesResult> => {
      const filenames = files.map((file) => file.name);
      const { data } = await getPresignedUrls({ filenames });

      await Promise.all(
        data.urls.map((item, index) => uploadImageToPresignedUrl(item.url, files[index])),
      );

      const images: PlaceImageRequest[] = data.urls.map((item, index) => ({
        imageKey: item.objectKey,
        sequence: index,
        isRepresentative: index === 0,
      }));

      return { images };
    },
  });
};
