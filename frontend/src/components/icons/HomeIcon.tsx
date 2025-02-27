import React, { FC } from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { IconProps } from '../types/iconProps.type';

export const HomeIcon: FC<IconProps> = ({ size, color }) => {
  return (
    <IoHomeOutline
      size={size}
      color={color}
    />
  );
};
