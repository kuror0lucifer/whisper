import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameData } from '../../../redux/game/selectors';
import { baseImgURL } from '../../../constants/baseImgURL';
import { useParams } from 'react-router-dom';
import { fetchCurrentGame } from '../api/fetchCurrentGame';
import { resetGameData, setGameData } from '../../../redux/game/slice';
import { Spinner } from '../../../UI/Spinner';
import { Error } from '../../../components/Error';

export const GamePageContent: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { nsuid } = useParams();
  const dispatch = useDispatch();
  const gameData = useSelector(selectGameData);

  const currentGame = useCallback(async () => {
    try {
      if (nsuid) {
        const res = await fetchCurrentGame(nsuid);
        if (res) dispatch(setGameData(res[0]));
        setIsLoading(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
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
    return <Error />;
  }

  return (
    <div className='w-full h-screen p-10 flex flex-col gap-4'>
      {errorMessage && <span>{errorMessage}</span>}
      <h2 className='font-bold text-2xl'>{gameData.game.title}</h2>
      <div className='w-full flex justify-between items-start gap-5'>
        <img
          src={baseImgURL + gameData.game.productImage}
          alt=''
          className='w-150 h-auto object-cover'
        />
        <div className='w-1/2 flex flex-col'>
          <p className='text-xl'>
            {gameData.game.description || 'No description yet'}
          </p>
        </div>
      </div>
    </div>
  );
};
