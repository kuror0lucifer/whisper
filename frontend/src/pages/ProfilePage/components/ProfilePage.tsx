import { FC } from 'react';
import { LogoutButton } from './LogoutButton';
import { TgConnectionButton } from './TgConnectionButton';

export const ProfilePage: FC = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-gray-300'>
      <TgConnectionButton />
      <LogoutButton />
    </div>
  );
};
