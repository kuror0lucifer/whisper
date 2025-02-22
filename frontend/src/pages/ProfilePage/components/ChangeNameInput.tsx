import { FC, useEffect, useState } from 'react';
import { Input } from '../../../UI/Input';
import { Button } from '../../../UI/Button';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { changeName } from '../api/ChangeName';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../../redux/user/selectors';
import { setUserName } from '../../../redux/user/slice';

interface IForm {
  id: number;
  userName: string;
}

export const ChangeNameInput: FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<IForm>();
  const { handleSubmit } = methods;
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  useEffect(() => {}, []);

  const onSubmit: SubmitHandler<IForm> = async data => {
    try {
      if (userId && data.userName) {
        const { userName } = data;
        await changeName(userId, userName);
        dispatch(setUserName(userName));
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
      setErrorMessage('An error occurred');
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className='w-full h-fit flex flex-row justify-center items-center gap-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          name='userName'
          placeholder='You can change your name'
          type='text'
          className='w-full mt-4'
        />
        <Button
          type='submit'
          className='w-10 h-10 border-2 bg-gray-50 rounded-md border-pink-200 hover:border-pink-300 transition-colors duration-300'
        />
      </form>
      {errorMessage && <span className='text-red-500'>{errorMessage}</span>}
    </FormProvider>
  );
};
