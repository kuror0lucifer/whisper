import { FC } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { IconProps } from '../types/iconProps.type';

export const SettingsIcon: FC<IconProps> = ({ size }) => {
  return <IoSettingsOutline size={size} />;
};
