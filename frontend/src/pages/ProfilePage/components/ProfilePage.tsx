import { FC, useEffect, useState } from 'react';
import { Aside } from './Aside';

import { useAuth } from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileSettingsContent } from '../pages/SettingsPage/components/ProfileSettingsContent';
import { Wishlist } from '../pages/WishlistPage/components/Wishlist';
import { Subscriptions } from '../pages/SubsPage/components/Subscriptions';
import { ActiveTabType } from '../types/activeTab.type';

export const ProfilePage: FC = () => {
  const { isAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveTabFromUrl = (): ActiveTabType => {
    const path = location.pathname.split('/')[2];
    return path === 'wishlist' ||
      path === 'subscriptions' ||
      path === 'settings'
      ? path
      : 'home';
  };

  const [activeTab, setActiveTab] =
    useState<ActiveTabType>(getActiveTabFromUrl);

  useEffect(() => {
    if (!isAuth) {
      navigate('/all-discounts');
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    const currentTab = getActiveTabFromUrl();
    if (activeTab !== currentTab) {
      setActiveTab(currentTab);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== `/profile/${activeTab}`) {
      navigate(`/profile/${activeTab}`, { replace: true });
    }
  }, [activeTab, navigate]);

  return (
    <div className='w-full min-h-screen max-h-fit flex items-start justify-baseline gap-3 bg-linear-to-br from-gray-100 to-blue-200'>
      <Aside
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main className='w-full min-h-screen ml-[20%]'>
        {activeTab === 'settings' && <ProfileSettingsContent />}
        {activeTab === 'wishlist' && <Wishlist />}
        {activeTab === 'subscriptions' && <Subscriptions />}
      </main>
    </div>
  );
};
