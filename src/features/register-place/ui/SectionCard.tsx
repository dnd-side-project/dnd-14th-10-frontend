interface SectionCardProps {
  children: React.ReactNode;
}

export function SectionCard({ children }: SectionCardProps) {
  return <div className='rounded-lg bg-gray-50 px-[16px] py-[20px]'>{children}</div>;
}
