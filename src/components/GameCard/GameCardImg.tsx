import { FC } from "react";
import { Image } from "../../styledComponents/Image";

type GameCardImgProps = {
  headerImage: string | undefined;
};

export const GameCardImg: FC<GameCardImgProps> = ({ headerImage }) => {
  return (
    <Image
      width="100%"
      height="188px"
      src={headerImage ? headerImage : "/placeholder.png"}
      $cover="cover"
      loading="lazy"
    />
  );
};
