import { FC } from 'react';
import { IconProps } from '../types/iconProps.type';

export const ClearInputIcon: FC<IconProps> = () => {
  return (
    <svg
      width='30px'
      height='30px'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g
        id='SVGRepo_bgCarrier'
        strokeWidth='0'
      ></g>
      <g
        id='SVGRepo_tracerCarrier'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></g>
      <g id='SVGRepo_iconCarrier'>
        <path
          d='M8 8L16 16'
          stroke='#000000'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></path>
        <path
          d='M16 8L8 16'
          stroke='#000000'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></path>
      </g>
    </svg>
  );
};
