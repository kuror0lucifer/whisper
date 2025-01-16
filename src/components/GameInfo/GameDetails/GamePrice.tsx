import { FC } from "react";
import { Span } from "../../../styledComponents/Span";
import Price from "../../../@types/price";
import { Container } from "../../../styledComponents/Container";
import { IoMdPricetag } from "react-icons/io";

type GamePriceProps = {
  price: Price | undefined;
  platforms: string[] | undefined;
};

export const GamePrice: FC<GamePriceProps> = ({ price, platforms }) => {
  const platformInfo =
    platforms?.[0] === "iOS / Android" ? "Free" : "No information";

  const priceInfo =
    price?.finalPrice === 0
      ? "Free"
      : price?.finalPrice
      ? `${price.finalPrice}$`
      : null;

  const finalPriceInfo =
    price && Object.keys(price).length < 2
      ? "Coming Soon"
      : priceInfo || platformInfo;
  return (
    <Container
      width="60%"
      height="75px"
      $borderTop="2px solid gray"
      display="flex"
      $align="center"
    >
      <Span $size="22px">
        <IoMdPricetag /> Price: {finalPriceInfo}
      </Span>
    </Container>
  );
};
