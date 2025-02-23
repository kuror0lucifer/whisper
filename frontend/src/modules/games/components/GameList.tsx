import { FC } from 'react';
import { GameCard } from '../../../components/GameCard';
import { baseImgURL } from '../../../constants/baseImgURL';
import { useSelector } from 'react-redux';
import { selectGames } from '../../../redux/games/selectors';
import { useNavigate } from 'react-router-dom';

export const GameList: FC = () => {
  const games = useSelector(selectGames);
  const navigate = useNavigate();

  return (
    <div className='w-full flex flex-wrap justify-center items-center gap-10 my-8 px-10'>
      {games?.map(game => (
        <GameCard
          onClick={() => navigate(`/game/${game.nsuid}`)}
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
