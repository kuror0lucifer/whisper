import { memo } from "react";
import { Image } from "../../styledComponents/Image";

type GameCardImgProps = {
  headerImage: string | undefined;
  title: string;
};

export const GameCardImg = memo(({ headerImage, title }: GameCardImgProps) => {
  return (
    <Image
      width="100%"
      height="188px"
      src={headerImage ? headerImage : "/placeholder.png"}
      alt={title}
      $cover="cover"
      loading="lazy"
    />
  );
});
