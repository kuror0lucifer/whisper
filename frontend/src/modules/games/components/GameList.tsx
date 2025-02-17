import { FC } from 'react';
import { fetchGames } from '../api/fetchGames';
import { useQuery } from '@tanstack/react-query';
import { GameCard } from '../../../components/GameCard';
import { Game } from '../types/game.type';
import { baseImgURL } from '../../../constants/baseImgURL';

export const GameList: FC = () => {
  const { data, error, isLoading } = useQuery<Game[], Error>({
    queryKey: ['games'],
    queryFn: () => fetchGames('10', '1'),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  if (!data || data.length === 0) {
    return <div>No games found.</div>;
  }

  return (
    <div className='w-full flex flex-wrap justify-between gap-5 mt-20 px-10'>
      {data?.map(game => (
        <GameCard
          key={game.nsuid}
          img={baseImgURL + game.productImage}
          price={
            game.price.salePrice ? game.price.salePrice : game.price.regPrice
          }
          title={game.title}
        />
      ))}
    </div>
  );
};
