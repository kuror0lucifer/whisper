import { FC } from 'react';

export const Spinner: FC = () => {
  return (
    <div className='w-16 h-16 border-4 border-t-4 border-gray-200 border-t-pink-500 rounded-full animate-spin'></div>
  );
};
