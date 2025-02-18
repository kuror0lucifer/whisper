import { createSlice } from '@reduxjs/toolkit';
import GamesState from './types.type';

const initialState: GamesState = {
  games: [],
  query: '',
  status: 'idle',
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setGames: (state, action) => {
      state.games = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setQuery, setGames, setStatus } = gamesSlice.actions;
export default gamesSlice.reducer;
