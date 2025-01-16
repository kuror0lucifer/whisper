import { FC } from "react";
import { Span } from "../../../styledComponents/Span";
import { Container } from "../../../styledComponents/Container";
import { FaTv } from "react-icons/fa";

type GamePlayModesProps = {
  playModes: string[] | undefined;
};

export const GamePlayModes: FC<GamePlayModesProps> = ({ playModes }) => {
  console.log(playModes);

  return (
    <Container
      width="60%"
      height="75px"
      $borderTop="2px solid gray"
      display="flex"
      $align="center"
    >
      <Span $size="22px">
        <FaTv /> Play modes:{" "}
        {playModes && playModes !== null ? playModes?.join(", ") : "Mobile"}
      </Span>
    </Container>
  );
};
