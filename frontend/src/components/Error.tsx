import { FC } from 'react';
import { ErrorIcon } from './icons/ErrorIcon';

interface ErrorProps {
  text: string;
}

export const Error: FC<ErrorProps> = ({ text }) => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-5'>
      <ErrorIcon
        size={100}
        color='red'
      />
      <h2 className='font-bold text-3xl'>{text}</h2>
    </div>
  );
};
