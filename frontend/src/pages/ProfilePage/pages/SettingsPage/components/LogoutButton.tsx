import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../../../redux/store';
import { useAuth } from '../../../../../hooks/useAuth';
import { setUserInfo } from '../../../../../redux/user/slice';
import { Button } from '../../../../../UI/Button';

export const LogoutButton: FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const onClickLogout = () => {
    logout();
    dispatch(setUserInfo({ id: null, email: null, userName: '' }));

    navigate('/all-discounts');
  };

  return (
    <Button
      type='button'
      onClick={onClickLogout}
      className='bg-red-500 hover:bg-red-700 text-white py-2 w-20 rounded-md transition-colors duration-300'
    >
      Log Out
    </Button>
  );
};
