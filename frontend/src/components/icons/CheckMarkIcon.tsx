import { FC } from 'react';
import { IconProps } from '../types/iconProps.type';
import { IoCheckmark } from 'react-icons/io5';

export const CheckMarkIcon: FC<IconProps> = ({ size, color }) => {
  return (
    <IoCheckmark
      size={size}
      color={color}
    />
  );
};
