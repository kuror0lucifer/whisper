import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { setUserId } from '../../../redux/user/slice';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../UI/Button';

export const LogoutButton: FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const onClickLogout = () => {
    logout();
    dispatch(setUserId(null));
    navigate('/');
  };

  return (
    <Button
      type='button'
      onClick={onClickLogout}
      className='bg-red-500 hover:bg-red-700 text-white py-2 w-20 rounded-md transition-colors duration-300'
    >
      Log out
    </Button>
  );
};
