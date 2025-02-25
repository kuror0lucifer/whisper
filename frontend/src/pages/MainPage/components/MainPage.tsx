import { FC } from 'react';
import { Header } from '../../../components/Header';
import { GameList } from '../../../modules/games/components/GameList';
import { useAuth } from '../../../hooks/useAuth';

export const MainPage: FC = () => {
  const { isAuth } = useAuth();

  return (
    <div className='w-full min-h-screen pb-5 bg-linear-to-b from-gray-100 to-blue-200'>
      <Header isAuth={isAuth} />
      <GameList />
    </div>
  );
};
