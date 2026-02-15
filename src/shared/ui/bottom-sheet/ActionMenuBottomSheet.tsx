import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';

export interface ActionMenuItem {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

interface ActionMenuBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: ActionMenuItem[];
}

export default function ActionMenuBottomSheet({
  isOpen,
  onClose,
  title,
  items,
}: ActionMenuBottomSheetProps) {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className='rounded-t-[30px]' hideHandle>
        <DrawerTitle className='sr-only'>{title}</DrawerTitle>
        <div className='mx-auto mt-[10px] h-[5px] w-[43px] rounded-[30px] bg-[#d2d4d5]' />
        <div className='mt-[15px] flex flex-col px-5 pb-5'>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const textColor =
              item.variant === 'danger' ? 'text-[#FE4E15]' : 'text-black';

            return (
              <button
                key={index}
                type='button'
                onClick={item.onClick}
                className={`flex items-center justify-center px-2 py-5 ${
                  !isLast ? 'border-b border-gray-150' : ''
                }`}
              >
                <span
                  className={`text-body2 leading-[1.3] font-medium tracking-tight ${textColor}`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
