import { FC } from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon } from './icons/LogoIcon';
import { ProfileIcon } from './icons/ProfileIcon';
import { Search } from './Search';

interface HeaderProps {
  isAuth: boolean;
}

export const Header: FC<HeaderProps> = ({ isAuth }) => {
  return (
    <header className='sticky bg-gray-50 text-gray-700 py-4 px-6 border-b-[1px] border-b-gray-500'>
      <div className='flex justify-between items-center'>
        <Link
          to='/'
          className='text-2xl font-semibold flex justify-around items-center gap-3'
        >
          <div className='rounded-full w-[30px] h-[30px] bg-white flex justify-center items-center border-[1px]'>
            <LogoIcon />
          </div>
          WHISPER64
        </Link>
        <div className='w-full sm:w-3/4 md:w-1/2 lg:w-2/3'>
          <Search />
        </div>

        <nav>
          {isAuth ? (
            <Link
              to={'/profile'}
              className='ml-6 hover:text-gray-300 flex gap-1'
            >
              <ProfileIcon
                size={20}
                color='white'
              />
              Profile
            </Link>
          ) : (
            <div className='flex'>
              <Link
                to={'/register'}
                className='ml-6 hover:text-gray-300 flex justify-center items-center'
              >
                Sign Up
              </Link>
              <Link
                to={'/login'}
                className='ml-6  bg-blue-500 w-20 h-10 flex justify-center items-center text-white rounded-md hover:text-gray-300 hover:bg-blue-600 transition-colors duration-400'
              >
                Log In
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
