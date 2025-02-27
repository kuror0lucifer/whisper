import { createSlice } from '@reduxjs/toolkit';
import UserState from './types.type';

const initialState: UserState = {
  userId: null,
  email: null,
  userName: '',
  avatar: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setUserInfo: (state, action) => {
      const { userName, email, userId, avatar } = action.payload;
      state.userName = userName;
      state.email = email;
      state.userId = userId;
      state.avatar = avatar;
    },
  },
});

export const {
  setUserId,
  setUserEmail,
  setUserName,
  setUserAvatar,
  setUserInfo,
} = userSlice.actions;
export default userSlice.reducer;
