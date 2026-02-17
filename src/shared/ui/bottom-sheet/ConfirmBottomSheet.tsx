import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';

interface ConfirmBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText: string;
  onConfirm: () => void;
  confirmVariant?: 'danger' | 'default';
}

export default function ConfirmBottomSheet({
  isOpen,
  onClose,
  title,
  message,
  confirmText,
  onConfirm,
  confirmVariant = 'danger',
}: ConfirmBottomSheetProps) {
  const confirmTextColor = confirmVariant === 'danger' ? 'text-[#FE4E15]' : 'text-primary-700';

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent
        variant='popup'
        className='mb-5 data-[vaul-drawer-direction=bottom]:border-0'
        hideHandle
      >
        <DrawerTitle className='sr-only'>{title}</DrawerTitle>
        <div className='mx-auto mt-[10px] h-[5px] w-[43px] rounded-[30px] bg-[#d2d4d5]' />
        <div className='mt-[15px] flex flex-col px-5'>
          <div className='flex items-center justify-center px-2 py-5'>
            <span className='text-body2 leading-[1.3] font-medium tracking-tight text-black'>
              {message}
            </span>
          </div>
          <button
            type='button'
            onClick={onConfirm}
            className='flex items-center justify-center px-2 py-5'
          >
            <span
              className={`text-body2 leading-[1.3] font-medium tracking-tight ${confirmTextColor}`}
            >
              {confirmText}
            </span>
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
