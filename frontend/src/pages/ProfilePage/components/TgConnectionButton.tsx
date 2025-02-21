import { FC, useState } from 'react';
import { Button } from '../../../UI/Button';
import { tgConnection } from '../api/apiTgConnection';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../redux/user/selectors';

export const TgConnectionButton: FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const userId = useSelector(selectUserId);

  const onClickConnect = async () => {
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
  };
  return (
    <>
      <Button
        type='button'
        onClick={onClickConnect}
        className='bg-red-500 hover:bg-red-700 text-white p-2 mb-4 w-fit rounded-md transition-colors duration-300'
      >
        Connect telegram
      </Button>
      {errorMessage && <span className='text-red-500'>{errorMessage}</span>}
    </>
  );
};
