import { FC, useEffect, useState } from 'react';
import { Aside } from './Aside';
import { ProfileSettingsContent } from './ProfileSettingsContent';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: FC = () => {
  const [activeTab, setActiveTab] = useState<
    'SETTINGS' | 'WISHLIST' | 'FRIENDS'
  >('SETTINGS');
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <div className='w-full h-screen flex items-start justify-baseline gap-3'>
      <Aside activeTab={activeTab} />
      <ProfileSettingsContent />
    </div>
  );
};
