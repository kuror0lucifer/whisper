import { FC } from 'react';
import { ErrorIcon } from './icons/ErrorIcon';

export const Error: FC = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-5'>
      <ErrorIcon
        size={100}
        color='red'
      />
      <h2 className='font-bold text-3xl'>This game was not found</h2>
    </div>
  );
};
