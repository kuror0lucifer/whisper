import { FC } from 'react';

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value?: React.ReactNode;
  children?: React.ReactNode;
}

export const InfoRow: FC<InfoRowProps> = ({ icon, label, value, children }) => {
  if (!value && !children) return null;

  return (
    <div className='w-full h-10 flex justify-between items-center border-t-2 border-pink-300 py-7 last:border-b-2'>
      <div className='flex items-center gap-3'>
        {icon}
        <span>{label}</span>
      </div>
      {value && <span>{value}</span>}
      {children}
    </div>
  );
};
