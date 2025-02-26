import { FC } from 'react';
import { IconProps } from '../types/iconProps.type';
import { FaRegCalendarAlt } from 'react-icons/fa';

export const CalendarIcon: FC<IconProps> = ({ size, color }) => {
  return (
    <FaRegCalendarAlt
      size={size}
      color={color}
    />
  );
};
