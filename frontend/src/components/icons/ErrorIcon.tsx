import { FC } from 'react';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { IconProps } from '../types/iconProps.type';

export const ErrorIcon: FC<IconProps> = ({ size, color }) => {
  return (
    <BiSolidErrorAlt
      size={size}
      color={color}
    />
  );
};
