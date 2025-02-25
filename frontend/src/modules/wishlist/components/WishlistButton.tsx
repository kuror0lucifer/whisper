import { FC, useEffect, useState } from 'react';
import { Button } from '../../../UI/Button';
import { HeartIcon } from '../../../components/icons/HeartIcon';
import { addToFavourites, checkGame } from '../api/addToFavourites';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../redux/user/selectors';
import { useParams } from 'react-router-dom';
import { CheckMarkIcon } from '../../../components/icons/CheckMarkIcon';

export const WishlistButton: FC = () => {
  const [gameStatus, setGameStatus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const userId = useSelector(selectUserId);
  const { nsuid } = useParams();
  const abortController = new AbortController();

  useEffect(() => {
    const checkGameStatus = async () => {
      if (userId && nsuid) {
        try {
          const res = await checkGame(userId, nsuid, {
            signal: abortController.signal,
          });

          if (res.data.success) {
            setGameStatus(true);
          }
        } catch (err) {
          if (!abortController.signal.aborted && err instanceof Error) {
            setErrorMessage(err.message);
          }
        }
      }
    };

    checkGameStatus();
  }, [userId, nsuid, abortController.signal]);

  const handleAddToFavourites = async () => {
    try {
      if (userId && nsuid) {
        await addToFavourites(userId, nsuid);
        setGameStatus(true);
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <div className='w-fit h-fit flex justify-center items-center gap-5'>
      <Button
        type='button'
        className='w-15 h-15 flex justify-center items-center border-2 border-pink-300 rounded-md hover:border-3 hover:border-pink-400 hover:bg-gray-300/50 transition-color duration-300'
        onClick={handleAddToFavourites}
      >
        {gameStatus ? <CheckMarkIcon size={20} /> : <HeartIcon size={20} />}
      </Button>
      {errorMessage && (
        <span className='text-red-500 animate-fade-in-scale'>
          {errorMessage}
        </span>
      )}
    </div>
  );
};
