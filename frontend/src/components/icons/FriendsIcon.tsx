import { FC } from 'react';
import { IconProps } from '../types/iconProps.type';
import { LiaUserFriendsSolid } from 'react-icons/lia';

export const FriendsIcon: FC<IconProps> = ({ size, color }) => {
  return (
    <LiaUserFriendsSolid
      size={size}
      color={color}
    />
  );
};
