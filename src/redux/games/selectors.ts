import { RootState } from "../store";

export const selectGames = (state: RootState) => state.games.games;

export const selectQuery = (state: RootState) => state.games.query;

export const selectStatus = (state: RootState) => state.games.status;
