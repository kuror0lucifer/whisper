import { QueriedGameUS } from "nintendo-switch-eshop";

interface GamesState {
  games: QueriedGameUS[];
  query: string;
  status: "idle" | "loading" | "failed";
}

export default GamesState;
