import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Price } from '../../../types/price.type';

interface PriceButtonProps {
  link: string;
  price: Price;
}

export const PriceButton: FC<PriceButtonProps> = ({ link, price }) => {
  return (
    price && (
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
        {price.salePrice ? (
          <div className='w-full flex justify-center items-center gap-3'>
            <span className='line-through decoration-red-500 decoration-2 text-xl'>
              $ {price.regPrice}
            </span>
            <span className='text-xl'>→ $ {price.salePrice}</span>
          </div>
        ) : (
          <span className='text-xl'>
            {price.regPrice === 0 ? 'Free' : `$ ${price.regPrice}`}
          </span>
        )}
      </Link>
    )
  );
};
