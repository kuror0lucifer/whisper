import { RootState } from '../store';

export const selectUserId = (state: RootState) => state.user.userId;

export const selectUserEmail = (state: RootState) => state.user.email;
