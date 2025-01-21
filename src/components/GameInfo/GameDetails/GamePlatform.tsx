import { FC } from "react";

import { Span } from "../../../styledComponents/Span";
import { Container } from "../../../styledComponents/Container";
import { IoGameController } from "react-icons/io5";

type GamePlatformProps = {
  platforms: string[] | undefined;
};

export const GamePlatform: FC<GamePlatformProps> = ({ platforms }) => {
  return (
    <Container
      width="400px"
      height="75px"
      $borderTop="2px solid gray"
      display="flex"
      $align="center"
    >
      <Span $size="22px">
        <IoGameController /> Platform: {platforms && platforms[0]}
      </Span>
    </Container>
  );
};
