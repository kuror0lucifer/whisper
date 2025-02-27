import { FC, useEffect, useState } from 'react';
import { fetchFavouriteGames } from '../api/GetFavouritesGames';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../../../redux/user/selectors';
import { Game } from '../../../../../types/game.type';
import { GameCard } from '../../../../../components/GameCard';
import { baseImgURL } from '../../../../../constants/baseImgURL';
import { Error } from '../../../../../components/Error';
import { Spinner } from '../../../../../UI/Spinner';

export const Wishlist: FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gameData, setGameData] = useState<Game[]>([]);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        if (userId) {
          const res = await fetchFavouriteGames(userId);
          setGameData(res.hits);
          setIsLoading(false);
        }
      } catch (err) {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        }
      }
    };
    fetchGames();
  }, [userId]);

  if (isLoading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  if (!gameData.length) {
    return <Error text='No result' />;
  }

  return (
    <div className='w-full h-fit py-5 px-5 flex justify-baseline items-start gap-5 flex-wrap'>
      {gameData.map(game => (
        <GameCard
          key={game.objectID}
          img={baseImgURL + game.productImage}
          title={game.title}
          regPrice={game.price.regPrice}
          salePrice={game.price.salePrice}
          nsuid={game.nsuid}
        />
      ))}
      {errorMessage && <span className='text-red-500'>{errorMessage}</span>}
    </div>
  );
};
