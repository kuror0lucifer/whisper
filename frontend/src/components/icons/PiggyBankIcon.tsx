import { FC } from 'react';
import { IconProps } from '../types/iconProps.type';
import { TbPigMoney } from 'react-icons/tb';

export const PiggyBankIcon: FC<IconProps> = ({ size, color }) => {
  return (
    <TbPigMoney
      size={size}
      color={color}
    />
  );
};
