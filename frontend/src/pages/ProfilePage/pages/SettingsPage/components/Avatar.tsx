import { FC, useState } from 'react';
import { defaultAvatar } from '../../../../../constants/defaultAvatar';
import { changeAvatar } from '../api/ChangeAvatar';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserAvatar,
  selectUserId,
} from '../../../../../redux/user/selectors';
import { setUserAvatar, setUserInfo } from '../../../../../redux/user/slice';

export const Avatar: FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const userId = useSelector(selectUserId);
  const userAvatar = useSelector(selectUserAvatar);
  const correctUserAvatar = userAvatar
    ? 'http://localhost:3000' + userAvatar.slice(1)
    : defaultAvatar;
  const [avatar, setAvatar] = useState<string | null>(correctUserAvatar);
  const dispatch = useDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setAvatar(objectUrl);
      if (userId) {
        uploadAvatar(userId, file);
      }
    }
  };

  const uploadAvatar = async (userId: number, file: File) => {
    try {
      const res = await changeAvatar(userId, file);
      if (res.data.avatar) {
        setAvatar('http://localhost:3000' + res.data.avatar.slice(1));
        dispatch(setUserAvatar(res.data.avatar));
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <label
      htmlFor='avatar'
      className='relative w-50 h-50 rounded-full bg-white flex items-center justify-center overflow-hidden cursor-pointer'
    >
      <img
        src={avatar || defaultAvatar}
        alt='Avatar'
        className='w-full h-full object-cover'
      />
      <input
        type='file'
        id='avatar'
        name='avatar'
        accept='image/jpeg, image/png'
        className='hidden'
        onChange={handleFileChange}
      />
      <div className='absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 text-white text-sm opacity-0 transition-opacity hover:opacity-90 duration-200'>
        Загрузить аватар
      </div>
    </label>
  );
};
