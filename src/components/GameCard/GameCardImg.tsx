import { memo } from "react";
import { Image } from "../../styledComponents/Image";
import { Wrapper } from "../../styledComponents/Wrapper";
import { Container } from "../../styledComponents/Container";
import { TitleH } from "../../styledComponents/TitleH";
import Price from "../../@types/price";

type GameCardImgProps = {
  headerImage: string | undefined;
  title: string;
  price: Price;
};

export const GameCardImg = memo(
  ({ headerImage, title, price }: GameCardImgProps) => {
    return (
      <Wrapper $position="relative" width="100%" height="188px">
        {price?.salePrice ? (
          <Container
            $position="absolute"
            display="flex"
            $align="center"
            $justify="center"
            width="50px"
            height="30px"
            $bgColor="orange"
            $bottom="0"
            $right="0"
            $margin="0 auto"
          >
            <TitleH as="h5" $size="12px">
              - {price.percentOff ? price.percentOff.toFixed(0) : ""} %
            </TitleH>
          </Container>
        ) : (
          <></>
        )}
        <Image
          width="100%"
          height="188px"
          src={headerImage ? headerImage : "/placeholder.png"}
          alt={title}
          $cover="cover"
          loading="lazy"
        />
      </Wrapper>
    );
  }
);
