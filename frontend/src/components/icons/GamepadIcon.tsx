import { FC } from 'react';
import { IoGameControllerOutline } from 'react-icons/io5';
import { IconProps } from '../types/iconProps.type';

export const GamepadIcon: FC<IconProps> = ({ size, color }) => {
  return (
    <IoGameControllerOutline
      size={size}
      color={color}
    />
  );
};
