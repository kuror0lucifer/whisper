import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GamesState from './types.type';
import { fetchGamesFromSearch } from '../../api/fetchSearchGames';
import { Game } from '../../types/game.type';
import { RootState } from '../store';

const initialState: GamesState = {
  games: [],
  query: '',
  totalPages: 1,
  status: 'idle',
  currentPage: 0,
};

export const fetchGames = createAsyncThunk<
  { games: Game[]; totalPages: number },
  { page: number; itemsPerPage: number }
>('games/fetchGames', async ({ page, itemsPerPage }, { getState }) => {
  const state = getState() as RootState;
  const searchValue = state.games.query;
  const [games, totalPages] = await fetchGamesFromSearch(
    searchValue,
    page,
    itemsPerPage
  );
  return { games, totalPages };
});

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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGames.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = 'idle';
        state.games = action.payload.games;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchGames.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { setQuery, setGames, setStatus, setCurrentPage } =
  gamesSlice.actions;
export default gamesSlice.reducer;
