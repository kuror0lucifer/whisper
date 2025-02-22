import { FC } from 'react';
import { LogoutButton } from './LogoutButton';
import { TgConnectionButton } from './TgConnectionButton';
import { useSelector } from 'react-redux';
import { selectUserEmail, selectUserName } from '../../../redux/user/selectors';
import { ChangeNameInput } from './ChangeNameInput';

export const ProfileSettingsContent: FC = () => {
  const userEmail = useSelector(selectUserEmail);
  const userName = useSelector(selectUserName);

  return (
    <div className='w-full h-screen p-10'>
      <div className='w-2/5 flex flex-col justify-baseline items-start gap-2'>
        <h2 className='text-2xl '>Hello, {userName || userEmail}!</h2>
        <TgConnectionButton />
        <ChangeNameInput />
        <LogoutButton />
      </div>
    </div>
  );
};
