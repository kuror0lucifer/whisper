import { FC } from 'react';
import { Error } from './Error';

export const NoSearchResult: FC = () => {
  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center'>
      <Error text='No result' />
    </div>
  );
};
