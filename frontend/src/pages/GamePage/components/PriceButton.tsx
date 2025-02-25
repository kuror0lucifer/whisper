import { FC } from 'react';
import { Link } from 'react-router-dom';

interface PriceButtonProps {
  link: string;
  price: number;
}

export const PriceButton: FC<PriceButtonProps> = ({ link, price }) => {
  return (
    <Link
      to={`https://www.nintendo.com/${link}`}
      className='w-50 h-15 flex flex-col justify-center items-center border-2 border-pink-300 rounded-md hover:border-3 hover:border-pink-400 hover:bg-gray-300/50 transition-color duration-300'
    >
      <div className='w-40 h-fit flex items-center justify-end'>
        <img
          src='/logoEshop.svg'
          alt='eshop logo'
          className='w-full h-5 object-cover align'
        />
      </div>
      <span className='text-xl'>$ {price}</span>
    </Link>
  );
};
