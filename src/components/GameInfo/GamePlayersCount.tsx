import { FC } from "react";
import { Span } from "../../styledComponents/Span";

type GamePlayersCountProps = {
  players: string | undefined;
};

export const GamePlayersCount: FC<GamePlayersCountProps> = ({ players }) => {
  return <Span $size="22px">🎮 Players count: {players}</Span>;
};
