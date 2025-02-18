import { Game } from '../../types/game.type';

interface GamesState {
  games: Game[];
  query: string;
  totalPages: number;
  status: 'idle' | 'loading' | 'failed';
  currentPage: number;
}

export default GamesState;
