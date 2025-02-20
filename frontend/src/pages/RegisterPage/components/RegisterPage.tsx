import { FC, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../../../UI/Input';
import { Button } from '../../../UI/Button';
import { useNavigate } from 'react-router-dom';
import { IForm } from '../types/IForm';
import { registerUser } from '../api/registerRequests';

export const RegisterPage: FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  const methods = useForm<IForm>();
  const { handleSubmit } = methods;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate('/');
  }, [isAuth, navigate]);

  const onSubmit: SubmitHandler<IForm> = async data => {
    const { email, password, confirmPassword } = data;
    const error = await registerUser(email, password, confirmPassword);

    if (error) {
      setErrorMessage(
        typeof error === 'string' ? error : JSON.stringify(error)
      );
      return;
    }

    setIsAuth(true);
  };

  return (
    <div className='w-full h-screen flex justify-center items-center flex-col gap-3'>
      <h2 className='font-bold text-2xl'>Registration</h2>
      <FormProvider {...methods}>
        <form
          className='w-1/3 flex justify-center items-center flex-col gap-2'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            name='email'
            type='text'
            placeholder='Enter your email'
          />
          <Input
            name='password'
            type='password'
            placeholder='Enter your password'
          />
          <Input
            name='confirmPassword'
            type='password'
            placeholder='Confirm your password'
          />

          {errorMessage && <span className='text-red-500'>{errorMessage}</span>}

          <Button
            type='submit'
            className='w-20 h-10 bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-200'
          >
            Registration
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
