import { FC } from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon } from './icons/LogoIcon';
import { ProfileIcon } from './icons/ProfileIcon';

interface HeaderProps {
  isAuth: boolean;
}

export const Header: FC<HeaderProps> = ({ isAuth }) => {
  return (
    <header className='sticky bg-amber-700 text-white py-4 px-6 border-b-2 border-b-gray-500'>
      <div className='flex justify-between items-center'>
        <Link
          to='/'
          className='text-2xl font-semibold flex justify-around items-center gap-3'
        >
          <div className='rounded-full w-[30px] h-[30px] bg-white flex justify-center items-center'>
            <LogoIcon />
          </div>
          WHISPER64
        </Link>
        <nav>
          {isAuth ? (
            <Link
              to={'/profile'}
              className='ml-6 hover:text-gray-300 flex gap-1'
            >
              <ProfileIcon size={20} />
              Profile
            </Link>
          ) : (
            <div className='flex'>
              <Link
                to={'/register'}
                className='ml-6 hover:text-gray-300'
              >
                Sign Up
              </Link>
              <Link
                to={'/login'}
                className='ml-6  bg-blue-500 w-20 h-6 text-center rounded-md hover:text-gray-300 hover:bg-blue-600 transition-colors duration-200'
              >
                Login
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
