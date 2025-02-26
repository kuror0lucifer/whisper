import { FC } from 'react';
import { Header } from '../../../components/Header';
import { useAuth } from '../../../hooks/useAuth';
import { GamePageContent } from './GamePageContent';

export const GamePage: FC = () => {
  const { isAuth } = useAuth();
  return (
    <div className='w-full h-screen'>
      <Header isAuth={isAuth} />
      <GamePageContent />
    </div>
  );
};
