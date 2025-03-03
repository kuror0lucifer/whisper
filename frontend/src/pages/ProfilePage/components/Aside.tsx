import { Dispatch, FC, SetStateAction } from 'react';
import { SettingsIcon } from '../../../components/icons/SettingsIcon';
import { HeartIcon } from '../../../components/icons/HeartIcon';
import { FriendsIcon } from '../../../components/icons/FriendsIcon';
import { ActiveTabType } from '../types/activeTab.type';
import { useNavigate } from 'react-router-dom';
import { HomeIcon } from '../../../components/icons/HomeIcon';

interface AsideProps {
  activeTab: ActiveTabType;
  setActiveTab: Dispatch<SetStateAction<ActiveTabType>>;
}

export const Aside: FC<AsideProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  return (
    <aside className='fixed top-0 left-0 w-1/5 h-screen bg-gray-400/50 border-r p-10 flex flex-col gap-10'>
      <div
        onClick={() => navigate('/all-discounts')}
        className={`w-full h-fit p-5 flex justify-center items-center gap-3 rounded-2xl hover:bg-gray-100 cursor-pointer transition-colors duration-200 ${
          activeTab === 'home' ? 'bg-gray-100' : ''
        }`}
      >
        <HomeIcon size={30} />
        <span className='text-2xl font-bold'>HOME</span>
      </div>
      <div
        onClick={() => setActiveTab('settings')}
        className={`w-full h-fit p-5 flex justify-center items-center gap-3 rounded-2xl hover:bg-gray-100 cursor-pointer transition-colors duration-200 ${
          activeTab === 'settings' ? 'bg-gray-100' : ''
        }`}
      >
        <SettingsIcon size={30} />
        <span className='text-2xl font-bold'>SETTINGS</span>
      </div>
      <div
        onClick={() => setActiveTab('wishlist')}
        className={`w-full h-fit p-5 flex justify-center items-center gap-3 rounded-2xl hover:bg-gray-100 cursor-pointer transition-colors duration-200 ${
          activeTab === 'wishlist' ? 'bg-gray-100' : ''
        }`}
      >
        <HeartIcon size={30} />
        <span className='text-2xl font-bold'>WISHLIST</span>
      </div>
      <div
        onClick={() => setActiveTab('subscriptions')}
        className={`w-full h-fit p-5 flex justify-center items-center gap-3 rounded-2xl hover:bg-gray-100 cursor-pointer transition-colors duration-200 ${
          activeTab === 'subscriptions' ? 'bg-gray-100' : ''
        }`}
      >
        <FriendsIcon size={30} />
        <span className='text-2xl font-bold'>FRIENDS</span>
      </div>
    </aside>
  );
};
