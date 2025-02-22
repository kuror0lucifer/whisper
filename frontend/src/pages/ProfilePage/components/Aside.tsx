import { FC } from 'react';
import { SettingsIcon } from '../../../components/icons/SettingsIcon';
import { HeartIcon } from '../../../components/icons/HeartIcon';
import { FriendsIcon } from '../../../components/icons/FriendsIcon';

interface AsideProps {
  activeTab: 'SETTINGS' | 'WISHLIST' | 'FRIENDS';
}

export const Aside: FC<AsideProps> = ({ activeTab }) => {
  return (
    <aside className='w-1/5 h-screen bg-gray-400/50 border-r p-10 flex flex-col gap-10'>
      <div
        className={`w-full h-fit p-5 flex justify-center items-center gap-3 rounded-2xl hover:bg-gray-100 cursor-pointer transition-colors duration-200 ${
          activeTab === 'SETTINGS' ? 'bg-gray-100' : ''
        }`}
      >
        <SettingsIcon size={30} />
        <span className='text-2xl font-bold'>SETTINGS</span>
      </div>
      <div
        className={`w-full h-fit p-5 flex justify-center items-center gap-3 rounded-2xl hover:bg-gray-100 cursor-pointer transition-colors duration-200 ${
          activeTab === 'WISHLIST' ? 'bg-gray-100' : ''
        }`}
      >
        <HeartIcon size={30} />
        <span className='text-2xl font-bold'>WISHLIST</span>
      </div>
      <div
        className={`w-full h-fit p-5 flex justify-center items-center gap-3 rounded-2xl hover:bg-gray-100 cursor-pointer transition-colors duration-200 ${
          activeTab === 'FRIENDS' ? 'bg-gray-100' : ''
        }`}
      >
        <FriendsIcon size={30} />
        <span className='text-2xl font-bold'>FRIENDS</span>
      </div>
    </aside>
  );
};
