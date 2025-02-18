import { RootState } from '../store';
import { createSelector } from 'reselect';

export const selectGames = createSelector(
  (state: RootState) => state.games.games,
  games => games.filter(game => game.nsuid != null && game.nsuid !== 'MOBILE')
);

export const selectQuery = (state: RootState) => state.games.query;

export const selectStatus = (state: RootState) => state.games.status;
