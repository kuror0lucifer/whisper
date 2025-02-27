import { FC, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { selectUserId } from '../../../../../redux/user/selectors';
import { changeName } from '../api/ChangeName';
import { setUserName } from '../../../../../redux/user/slice';
import { Button } from '../../../../../UI/Button';
import { Input } from '../../../../../UI/Input';

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
        className='w-full h-fit flex flex-col justify-baseline items-start'
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className='text-xl'>Change name</label>
        <div className='w-full flex flex-row justify-center items-center gap-2'>
          <Input
            name='userName'
            placeholder='You can change your name'
            type='text'
            className='w-full mt-4'
          />
          <Button
            type='submit'
            className='w-10 h-10 border-2 bg-gray-50 rounded-md border-pink-200 hover:border-pink-300 transition-colors duration-300'
          >
            OK
          </Button>
        </div>
      </form>
      {errorMessage && <span className='text-red-500'>{errorMessage}</span>}
    </FormProvider>
  );
};
