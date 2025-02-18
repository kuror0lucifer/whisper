import { FC, useEffect } from 'react';
import { fetchGames } from '../api/fetchGames';
import { useQuery } from '@tanstack/react-query';
import { GameCard } from '../../../components/GameCard';
import { Game } from '../../../types/game.type';
import { baseImgURL } from '../../../constants/baseImgURL';
import { useDispatch, useSelector } from 'react-redux';
import { setGames, setStatus } from '../../../redux/games/slice';

import { selectGames } from '../../../redux/games/selectors';

export const GameList: FC = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useQuery<Game[], Error>({
    queryKey: ['games'],
    queryFn: () => fetchGames('20', '0'),
  });

  useEffect(() => {
    if (data) {
      dispatch(setGames(data));
      dispatch(setStatus('idle'));
    }
  }, [data, dispatch]);

  const games = useSelector(selectGames);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  if (!data || games.length === 0) {
    return <div>No games found.</div>;
  }

  return (
    <div className='w-full max-w-screen-3xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10 mt-8 px-10'>
      {games?.map(game => (
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
