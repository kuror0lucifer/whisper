import { FC, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../../../UI/Input';
import { Button } from '../../../UI/Button';
import { useNavigate } from 'react-router-dom';
import { IForm } from '../types/IForm';
import { registerUser } from '../api/registerRequests';
import { useAuth } from '../../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { setUserInfo } from '../../../redux/user/slice';

export const RegisterPage: FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const methods = useForm<IForm>();
  const { handleSubmit } = methods;
  const navigate = useNavigate();
  const { isAuth, login } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isAuth) navigate('/all-discounts');
  }, [isAuth, navigate]);

  const onSubmit: SubmitHandler<IForm> = async data => {
    try {
      const { email, password, confirmPassword } = data;
      const res = await registerUser(email, password, confirmPassword);
      const { id, userEmail } = res.data.data.user;
      dispatch(setUserInfo({ userId: id, email: userEmail, userName: '' }));
      login();
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Registration error');
      }
    }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gray-200 '>
      <div className='w-1/3 h-fit py-10 flex justify-center items-center flex-col gap-8 rounded-2xl shadow-2xl shadow-gray-600 bg-white animate-fade-in-scale'>
        <h2 className='text-2xl text-[#40364e]'>REGISTRATION</h2>
        <FormProvider {...methods}>
          <form
            className='w-2/3 flex justify-center items-center flex-col gap-2'
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              name='email'
              type='text'
              placeholder='Enter your email'
              className='w-full p-5 focus:ring-1 focus:ring-gray-400 transition-all duration-400'
            />
            <Input
              name='password'
              type='password'
              placeholder='Enter your password'
              className='w-full p-5 focus:ring-1 focus:ring-gray-400 transition-all duration-400'
            />
            <Input
              name='confirmPassword'
              type='password'
              placeholder='Confirm your password'
              className='w-full p-5 focus:ring-1 focus:ring-gray-400 transition-all duration-400'
            />

            {errorMessage && (
              <span className='text-red-500 text-lg mb-2 animate-fade-in-scale'>
                {errorMessage}
              </span>
            )}

            <Button
              type='submit'
              className='w-full h-10 text-white text-lg transition-colors duration-400 rounded-md bg-[#bba5b1] hover:bg-[#70698e]'
            >
              Confirm
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
