import { FC } from "react";

import { Span } from "../../../styledComponents/Span";
import { Container } from "../../../styledComponents/Container";
import { FaPerson } from "react-icons/fa6";

type GamePlayersCountProps = {
  players: string | undefined;
};

export const GamePlayersCount: FC<GamePlayersCountProps> = ({ players }) => {
  return (
    <Container
      width="400px"
      height="75px"
      $borderTop="2px solid gray"
      $borderBottom="2px solid gray"
      display="flex"
      $align="center"
    >
      <Span $size="22px">
        <FaPerson /> Players count: {players}
      </Span>
    </Container>
  );
};
