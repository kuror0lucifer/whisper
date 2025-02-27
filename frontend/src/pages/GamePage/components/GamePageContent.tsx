import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameData } from '../../../redux/game/selectors';
import { baseImgURL } from '../../../constants/baseImgURL';
import { useParams } from 'react-router-dom';
import { fetchCurrentGame } from '../api/fetchCurrentGame';
import { resetGameData, setGameData } from '../../../redux/game/slice';
import { Spinner } from '../../../UI/Spinner';
import { Error } from '../../../components/Error';
import { AxiosError } from 'axios';
import { WishlistButton } from '../../../modules/wishlist/components/WishlistButton';
import { PriceButton } from './PriceButton';
import { PlayModes } from './PlayModes';
import { GameInfo } from './GameInfo';
import { cleanTitle } from '../../../modules/games/utils/cleanTitle';

export const GamePageContent: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { nsuid } = useParams();
  const dispatch = useDispatch();
  const gameData = useSelector(selectGameData);

  const currentGame = useCallback(async () => {
    try {
      if (nsuid) {
        const res = await fetchCurrentGame(String(nsuid));
        if (res) dispatch(setGameData(res[0]));
        setIsLoading(true);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Failed to load game data');
      }
    }
  }, [dispatch, nsuid]);

  useEffect(() => {
    dispatch(resetGameData());
    currentGame();
  }, [currentGame, dispatch]);

  if (!isLoading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  if (gameData.game.title === '') {
    return <Error text='This game was not found' />;
  }

  return (
    <div className='w-full min-h-screen p-10 flex flex-col gap-4 bg-linear-to-b from-gray-100 to-blue-200'>
      {errorMessage && <span>{errorMessage}</span>}
      <h2 className='font-bold text-3xl animate-appearance'>
        {cleanTitle(gameData.game.title)}
      </h2>
      <div className='w-full flex justify-between items-start gap-5 overflow-hidden animate-appearance'>
        <img
          src={baseImgURL + gameData.game.productImage}
          alt={gameData.game.title}
          className='min-w-150 max-w-1/2 h-auto object-cover rounded-xl'
        />

        <div className='w-1/2 flex flex-col gap-5 animate-appearance'>
          <p className='text-xl'>
            {gameData.game.description || 'No description yet'}
          </p>
          <div className='w-fit h-fit flex gap-5'>
            <WishlistButton />
            <PriceButton
              link={gameData.game.url}
              price={gameData.game.price}
            />
          </div>
        </div>
      </div>
      <div className='w-full h-auto flex justify-between items-start gap-5 animate-appearance'>
        <GameInfo
          eshopDetails={gameData.game.eshopDetails}
          releaseDate={gameData.game.releaseDate}
          genres={gameData.game.genres}
          playerCount={gameData.game.playerCount}
        />
        <PlayModes playModes={gameData.game.playModes} />
      </div>
    </div>
  );
};
