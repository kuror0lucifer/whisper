import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  selectUserEmail,
  selectUserName,
} from '../../../../../redux/user/selectors';
import { TgConnectionButton } from './TgConnectionButton';
import { ChangeNameInput } from './ChangeNameInput';
import { LogoutButton } from './LogoutButton';
import { Avatar } from './Avatar';
import { ChangeDescription } from './ChangeDescription';

export const ProfileSettingsContent: FC = () => {
  const userEmail = useSelector(selectUserEmail);
  const userName = useSelector(selectUserName);

  return (
    <div className='w-full min-h-screen p-10 animate-fade-in-scale flex flex-col items-center'>
      <div className='w-full bg-white flex flex-col justify-baseline items-center gap-4 rounded-2xl p-6'>
        <h2 className='text-2xl '>Hello, {userName || userEmail}!</h2>
        <Avatar />
        <ChangeDescription />
        <ChangeNameInput />
        <TgConnectionButton />
        <LogoutButton />
      </div>
    </div>
  );
};
