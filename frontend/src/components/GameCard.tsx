import { FC, useEffect, useRef, useState } from 'react';

interface GameCardProps {
  img: string;
  title: string;
  salePrice: number;
  regPrice: number;
  className?: string;
  onClick: () => void;
  //   discount: number;
}

export const GameCard: FC<GameCardProps> = ({
  img,
  title,
  salePrice,
  regPrice,
  className,
  onClick,
  //   discount,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`bg-white shadow-lg rounded-lg overflow-hidden w-85 h-85 hover:-translate-y-2.5 hover:shadow-2xl transition-all duration-300 cursor-pointer ${className} z-10 ${
        isVisible ? 'animate-appearance' : 'opacity-0'
      }`}
      onClick={onClick}
    >
      <img
        src={img}
        alt={title}
        className='w-full h-56 object-fill'
      />
      <div className='p-4'>
        <h3 className='text-xl font-semibold text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap'>
          {title}
        </h3>
        <div className='flex justify-baseline items-center mt-4 gap-2.5'>
          {salePrice ? (
            <>
              <span className='text-lg font-semibold text-gray-900 line-through'>
                {regPrice}$
              </span>
              <span className='text-lg font-semibold text-gray-900'>
                {salePrice}$
              </span>
            </>
          ) : (
            <span className='text-lg font-semibold text-gray-900'>
              {!regPrice ? 'Free' : `${regPrice}$`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
