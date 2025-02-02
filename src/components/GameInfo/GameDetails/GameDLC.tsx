import { FC } from "react";
import { Container } from "../../../styledComponents/Container";
import { Span } from "../../../styledComponents/Span";
import { HiMiniPuzzlePiece } from "react-icons/hi2";

type GameDLCProps = {
  hasDlc: boolean | undefined;
};

export const GameDLC: FC<GameDLCProps> = ({ hasDlc }) => {
  return (
    <Container
      width="400px"
      height="75px"
      $borderBottom="2px solid gray"
      display="flex"
      $align="center"
    >
      <Span $size="22px">
        <HiMiniPuzzlePiece /> Dlc: {hasDlc ? "Yes" : "No"}
      </Span>
    </Container>
  );
};
