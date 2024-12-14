import { FC } from "react";
import { Image } from "../../styledComponents/Image";

type GameCardImgProps = {
  boxart: string | undefined;
};

export const GameCardImg: FC<GameCardImgProps> = ({ boxart }) => {
  return (
    <Image
      width="188px"
      height="188px"
      src={boxart ? boxart : "/placeholder.png"}
      $cover="cover"
      loading="lazy"
    />
  );
};
