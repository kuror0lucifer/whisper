import { FC } from 'react';
import { IconProps } from '../types/iconProps.type';
import { IoIosHeartEmpty } from 'react-icons/io';

export const HeartIcon: FC<IconProps> = ({ size, color }) => {
  return (
    <IoIosHeartEmpty
      size={size}
      color={color}
    />
  );
};
