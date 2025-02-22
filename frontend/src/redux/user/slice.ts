import { createSlice } from '@reduxjs/toolkit';
import UserState from './types.type';

const initialState: UserState = {
  userId: null,
  email: null,
  userName: '',
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
    setUserInfo: (state, action) => {
      const { userName, email, userId } = action.payload;
      state.userName = userName;
      state.email = email;
      state.userId = userId;
    },
  },
});

export const { setUserId, setUserEmail, setUserName, setUserInfo } =
  userSlice.actions;
export default userSlice.reducer;
