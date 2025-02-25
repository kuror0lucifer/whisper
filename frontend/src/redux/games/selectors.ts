import { RootState } from '../store';

export const selectGames = (state: RootState) => state.games.games;

export const selectQuery = (state: RootState) => state.games.query;

export const selectStatus = (state: RootState) => state.games.status;

export const selectCurrentPage = (state: RootState) => state.games.currentPage;

export const selectTotalPage = (state: RootState) => state.games.totalPages;
