import { FC } from 'react';
import { LogoutButton } from './LogoutButton';
import { TgConnectionButton } from './TgConnectionButton';
import { useSelector } from 'react-redux';
import { selectUserEmail } from '../../../redux/user/selectors';
import { ChangeNameInput } from './ChangeNameInput';

export const ProfilePage: FC = () => {
  const userEmail = useSelector(selectUserEmail);

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-3 bg-gray-300'>
      <div className='w-1/3 h-fit py-10 flex flex-col items-center gap-8 rounded-md bg-white shadow-2xl shadow-gray-600'>
        <h2 className='text-2xl '>Hello, {userEmail}!</h2>
        <TgConnectionButton />
        <ChangeNameInput />
        <LogoutButton />
      </div>
    </div>
  );
};
