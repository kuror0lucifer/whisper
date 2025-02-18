import { Game } from '../../types/game.type';

interface GamesState {
  games: Game[];
  query: string;
  status: 'idle' | 'loading' | 'failed';
}

export default GamesState;
