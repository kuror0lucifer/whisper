import { FC, useState } from 'react';
import { LogoutButton } from './LogoutButton';
import { TgConnectionButton } from './TgConnectionButton';
import { useSelector } from 'react-redux';
import { selectUserEmail, selectUserName } from '../../../redux/user/selectors';
import { ChangeNameInput } from './ChangeNameInput';
import { Aside } from './Aside';

export const ProfilePage: FC = () => {
  const [activeTab, setActiveTab] = useState<
    'SETTINGS' | 'WISHLIST' | 'FRIENDS'
  >('SETTINGS');
  const userEmail = useSelector(selectUserEmail);
  const userName = useSelector(selectUserName);

  return (
    <div className='w-full h-screen flex items-start justify-baseline gap-3'>
      <Aside activeTab={activeTab} />
      <div className=''>
        <h2 className='text-2xl '>Hello, {userName ? userName : userEmail}!</h2>
        <TgConnectionButton />
        <ChangeNameInput />
        <LogoutButton />
      </div>
    </div>
  );
};
