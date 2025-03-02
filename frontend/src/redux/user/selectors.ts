import { createSelector } from 'reselect';
import { RootState } from '../store';

export const selectUserId = (state: RootState) => state.user.userId;

export const selectUserEmail = (state: RootState) => state.user.email;

export const selectUserName = (state: RootState) => state.user.userName;

export const selectUserAvatar = (state: RootState) => state.user.avatar;

export const selectUserDescription = (state: RootState) =>
  state.user.description;

export const selectUserData = createSelector(
  (state: RootState) => state.user,
  user => ({
    userId: user.userId,
    email: user.email,
    name: user.userName,
    description: user.description,
  })
);
