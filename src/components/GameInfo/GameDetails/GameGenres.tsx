import { FC } from "react";
import { Container } from "../../../styledComponents/Container";
import { Span } from "../../../styledComponents/Span";
import { LuSwords } from "react-icons/lu";

type GameGenresProps = {
  genres: string[] | undefined;
};

export const GameGenres: FC<GameGenresProps> = ({ genres }) => {
  return (
    <Container
      width="400px"
      height="75px"
      $borderBottom="2px solid gray"
      display="flex"
      $align="center"
    >
      <Span $size="22px">
        <LuSwords /> Genres: {genres?.join(", ")}
      </Span>
    </Container>
  );
};
