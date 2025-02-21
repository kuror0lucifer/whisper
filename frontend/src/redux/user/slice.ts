import { createSlice } from '@reduxjs/toolkit';
import UserState from './types.type';

const initialState: UserState = {
  userId: null,
  email: null,
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
  },
});

export const { setUserId, setUserEmail } = userSlice.actions;
export default userSlice.reducer;
