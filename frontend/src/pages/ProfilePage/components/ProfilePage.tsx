import { FC, useState } from 'react';
import { Aside } from './Aside';
import { ProfileSettingsContent } from './ProfileSettingsContent';

export const ProfilePage: FC = () => {
  const [activeTab, setActiveTab] = useState<
    'SETTINGS' | 'WISHLIST' | 'FRIENDS'
  >('SETTINGS');

  return (
    <div className='w-full h-screen flex items-start justify-baseline gap-3'>
      <Aside activeTab={activeTab} />
      <ProfileSettingsContent />
    </div>
  );
};
