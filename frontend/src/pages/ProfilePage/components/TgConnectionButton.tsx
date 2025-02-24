import { FC, useCallback, useEffect, useState } from 'react';
import { Button } from '../../../UI/Button';
import { tgConnection } from '../api/TgConnection';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../redux/user/selectors';
import { tgCheckConnection } from '../api/TgCheck';

export const TgConnectionButton: FC = () => {
  const [tgStatus, setTgStatus] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { userId, email } = useSelector(selectUserData);

  const onClickConnect = useCallback(async () => {
    try {
      if (userId) {
        await tgConnection(userId);
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An error occurred');
      }
    }
  }, [userId]);

  const isTelegramLinked = useCallback(async () => {
    try {
      if (email) {
        const res = await tgCheckConnection(email);
        setTgStatus(res.success);
      }
    } catch (err) {
      setTgStatus(false);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
      setErrorMessage('Unknown error while check tg status');
    }
  }, [email]);

  useEffect(() => {
    if (email) {
      isTelegramLinked();
    }
  }, [email, isTelegramLinked]);

  return (
    <>
      <Button
        type='button'
        onClick={onClickConnect}
        className={` text-white p-2 my-4 w-fit rounded-md transition-colors duration-300 ${
          tgStatus ? 'bg-red-300' : 'bg-red-500 hover:bg-red-700'
        }`}
        disabled={!!tgStatus}
      >
        {tgStatus ? 'Telegram linked' : 'Connect telegram'}
      </Button>
      {errorMessage && <span className='text-red-500'>{errorMessage}</span>}
    </>
  );
};
