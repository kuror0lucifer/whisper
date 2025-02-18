import { FC } from 'react';

interface GameCardProps {
  img: string;
  title: string;
  price: number;
  className?: string;
  //   discount: number;
}

export const GameCard: FC<GameCardProps> = ({
  img,
  title,
  price,
  className,
  //   discount,
}) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg overflow-hidden w-85 h-85 hover:-translate-y-2.5 hover:shadow-2xl transition-all duration-300 cursor-pointer ${className}`}
    >
      <img
        src={img}
        alt={title}
        className='w-full h-56 object-cover'
      />
      <div className='p-4'>
        <h3 className='text-xl font-semibold text-gray-800'>{title}</h3>
        <div className='flex justify-between items-center mt-4'>
          <span className='text-lg font-semibold text-gray-900'>{price} $</span>
        </div>
      </div>
    </div>
  );
};
