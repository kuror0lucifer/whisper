import { FC } from "react";
import { Span } from "../../styledComponents/Span";

type GamePlatformProps = {
  platforms: string[] | undefined;
};

export const GamePlatform: FC<GamePlatformProps> = ({ platforms }) => {
  return <Span $size="22px">🎮 Platform: {platforms && platforms[0]}</Span>;
};
