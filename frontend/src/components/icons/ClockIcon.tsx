import { FC } from 'react';
import { IconProps } from '../types/iconProps.type';
import { FaRegClock } from 'react-icons/fa';

export const ClockIcon: FC<IconProps> = ({ size, color }) => {
  return (
    <FaRegClock
      size={size}
      color={color}
    />
  );
};
