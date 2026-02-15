import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';

interface LogoutBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutBottomSheet({ isOpen, onClose, onConfirm }: LogoutBottomSheetProps) {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className='rounded-t-[30px]' hideHandle>
        <DrawerTitle className='sr-only'>로그아웃 확인</DrawerTitle>
        <div className='mx-auto mt-[10px] h-[5px] w-[43px] rounded-[30px] bg-[#d2d4d5]' />
        <div className='mt-[20px] flex flex-col px-5 pb-5'>
          <div className='flex items-center justify-center px-2 py-5'>
            <span className='text-body1 font-medium tracking-tight text-black'>
              로그아웃 하시겠습니까?
            </span>
          </div>
          <button
            type='button'
            onClick={onConfirm}
            className='flex items-center justify-center px-2 py-5'
          >
            <span className='text-body1 text-warning-default font-medium tracking-tight'>
              로그아웃
            </span>
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
