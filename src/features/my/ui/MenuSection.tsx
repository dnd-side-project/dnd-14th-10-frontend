interface MenuItem {
  label: string;
  value?: string;
  onClick?: () => void;
}

interface MenuSectionProps {
  items: MenuItem[];
}

export default function MenuSection({ items }: MenuSectionProps) {
  return (
    <div className='flex flex-col gap-4 p-5'>
      {items.map((item, index) => (
        <button
          key={index}
          type='button'
          onClick={item.onClick}
          className='flex w-full items-center justify-between py-4 text-left'
        >
          <span className='text-body1 font-medium tracking-tight text-gray-950'>{item.label}</span>
          {item.value && (
            <span className='text-body1 font-medium tracking-tight text-gray-500'>
              {item.value}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
