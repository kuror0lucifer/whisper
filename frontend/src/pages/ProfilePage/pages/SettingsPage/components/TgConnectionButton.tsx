import { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../../../redux/user/selectors';
import { tgConnection } from '../api/TgConnection';
import { tgCheckConnection } from '../api/TgCheck';
import { Button } from '../../../../../UI/Button';

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
      <label className='text-xl'>Connect your telegram</label>
      <Button
        type='button'
        onClick={onClickConnect}
        className={` text-white p-2 mb-4 w-fit rounded-md transition-colors duration-300 ${
          tgStatus ? 'bg-pink-300' : 'bg-pink-500 hover:bg-pink-700'
        }`}
        disabled={!!tgStatus}
      >
        {tgStatus ? 'Telegram linked' : 'Connect telegram'}
      </Button>
      {errorMessage && <span className='text-red-500'>{errorMessage}</span>}
    </>
  );
};
