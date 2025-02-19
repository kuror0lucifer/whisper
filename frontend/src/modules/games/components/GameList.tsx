import { FC } from 'react';

import { GameCard } from '../../../components/GameCard';
import { baseImgURL } from '../../../constants/baseImgURL';
import { useSelector } from 'react-redux';

import { selectGames } from '../../../redux/games/selectors';

export const GameList: FC = () => {
  const games = useSelector(selectGames);

  return (
    <div className='w-full max-w-screen-3xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10 mt-8 px-10 pb-10'>
      {games?.map(game => (
        <GameCard
          key={game.objectID}
          img={baseImgURL + game.productImage}
          salePrice={game.price?.salePrice}
          regPrice={game.price?.regPrice}
          title={game.title}
        />
      ))}
    </div>
  );
};
