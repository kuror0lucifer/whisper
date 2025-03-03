import { FC, useState } from 'react';
import { TextArea } from '../../../../../components/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserDescription,
  selectUserId,
} from '../../../../../redux/user/selectors';
import { setUserDescription } from '../../../../../redux/user/slice';
import { changeDescription } from '../api/ChangeDescription';

export const ChangeDescription: FC = () => {
  const userId = useSelector(selectUserId);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const userDescription = useSelector(selectUserDescription);
  const [description, setDescription] = useState(userDescription);

  const dispatch = useDispatch();

  const handleChangeDescription = async () => {
    try {
      if (userId) {
        const res = await changeDescription(userId, description);
        dispatch(setUserDescription(res.data.description));
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <>
      <TextArea
        label='Description'
        textAreaContent={description}
        onChange={value => setDescription(value)}
        onBlur={handleChangeDescription}
      />
      {errorMessage && <span className='text-red-500'>{errorMessage}</span>}
    </>
  );
};
