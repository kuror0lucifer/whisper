import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { IForm } from '../types/IForm.type';
import { loginUser } from '../api/loginRequest';
import { Button } from '../../../UI/Button';
import { FC, useEffect, useState } from 'react';
import { Input } from '../../../UI/Input';
import { useNavigate } from 'react-router-dom';

export const LoginPage: FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const methods = useForm<IForm>();
  const { handleSubmit } = methods;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate('/');
  }, [isAuth, navigate]);

  const onSubmit: SubmitHandler<IForm> = async data => {
    const { email, password } = data;
    const error = await loginUser(email, password);

    if (error) {
      setErrorMessage(
        typeof error === 'string' ? error : JSON.stringify(error)
      );
    }
    setIsAuth(true);
  };

  return (
    <div className='w-full h-screen flex justify-center items-center flex-col gap-3'>
      <h2 className='font-bold text-2xl'>Log In</h2>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-1/3 flex justify-center items-center flex-col gap-2'
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
          {errorMessage && <span className='text-red-500'>{errorMessage}</span>}

          <Button
            type='submit'
            className='w-20 h-10 bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-200'
          >
            Log In
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
