import { type ChangeEvent, useRef } from 'react';

import AddCircleIcon from '@/shared/ui/icons/AddCircle.svg?react';
import CloseCircleIcon from '@/shared/ui/icons/CloseCircle.svg?react';
import ImageUploadIcon from '@/shared/ui/icons/ImageUpload.svg?react';

interface ImageUploadFieldProps {
  images: File[];
  previews: string[];
  onAdd: (files: File[]) => void;
  onRemove: (index: number) => void;
  maxImages?: number;
  /** 제공하면 이미지가 없을 때 전체 너비 첫 번째 버튼으로 표시. 없으면 추가 버튼을 항상 표시. */
  initialButtonLabel?: string;
  error?: string;
}

export function ImageUploadField({
  images,
  previews,
  onAdd,
  onRemove,
  maxImages = 6,
  initialButtonLabel,
  error,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    if (images.length + newFiles.length > maxImages) {
      alert(`사진은 최대 ${maxImages}장까지 등록할 수 있습니다.`);
      e.target.value = '';
      return;
    }

    onAdd(newFiles);
    e.target.value = '';
  };

  const showScrollList = previews.length > 0 || !initialButtonLabel;
  const showAddButton =
    images.length < maxImages && (initialButtonLabel ? images.length > 0 : true);

  return (
    <div className='space-y-2'>
      <input
        type='file'
        multiple
        accept='image/*'
        ref={inputRef}
        onChange={handleFileChange}
        className='hidden'
      />

      {images.length === 0 && initialButtonLabel && (
        <button
          type='button'
          className='bg-primary-10 flex w-full items-center justify-center gap-2 rounded-lg px-5 py-5'
          onClick={() => inputRef.current?.click()}
        >
          <ImageUploadIcon className='text-primary-700 h-5 w-5' />
          <span className='text-primary-700 text-base font-bold'>{initialButtonLabel}</span>
        </button>
      )}

      {showScrollList && (
        <div className='flex min-w-0 gap-3 overflow-x-auto'>
          {previews.map((preview, index) => (
            <div key={preview} className='relative h-[100px] w-[100px] flex-shrink-0'>
              <img
                src={preview}
                alt={`preview ${index}`}
                className='h-full w-full rounded-xl object-cover'
              />
              <button
                type='button'
                onClick={() => onRemove(index)}
                className='absolute top-1 right-1'
              >
                <CloseCircleIcon className='h-[30px] w-[30px]' />
              </button>
            </div>
          ))}

          {showAddButton && (
            <button
              type='button'
              onClick={() => inputRef.current?.click()}
              className='bg-gray-150 flex h-[100px] w-[100px] flex-shrink-0 items-center justify-center rounded-xl'
            >
              <AddCircleIcon width={30} height={30} className='text-primary-700' />
            </button>
          )}
        </div>
      )}

      <p className='mt-[16px] text-[12px] leading-[15.6px] font-normal text-gray-500'>
        사진은 최대 {maxImages}장까지 업로드 가능해요.
      </p>

      {error && <p className='text-sm text-red-500'>{error}</p>}
    </div>
  );
}
