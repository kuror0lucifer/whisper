import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQueriedGamesAmerica } from "nintendo-switch-eshop";
import GamesState from "./types";

const initialState: GamesState = {
  games: [],
  query: "",
  status: "idle",
};

export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async (query: string) => {
    const response = await getQueriedGamesAmerica(query);
    return response;
  }
);

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = "idle";
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setQuery } = gamesSlice.actions;
export default gamesSlice.reducer;
