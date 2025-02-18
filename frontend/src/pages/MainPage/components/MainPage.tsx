import { FC } from 'react';
import { Header } from '../../../components/Header';
import { GameList } from '../../../modules/games/components/GameList';

export const MainPage: FC = () => {
  return (
    <>
      <Header isAuth={false} />
      <GameList />
    </>
  );
};
