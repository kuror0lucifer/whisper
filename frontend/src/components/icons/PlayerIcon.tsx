import { FC } from 'react';
import { IconProps } from '../types/iconProps.type';
import { PiPersonArmsSpread } from 'react-icons/pi';

export const PlayerIcon: FC<IconProps> = ({ size, color }) => {
  return (
    <PiPersonArmsSpread
      size={size}
      color={color}
    />
  );
};
