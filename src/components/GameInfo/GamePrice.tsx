import { FC } from "react";
import { Span } from "../../styledComponents/Span";
import { Flex } from "../../styledComponents/Flex";
import Price from "../../@types/price";

type GamePriceProps = {
  price: Price | undefined;
  priceRange: string | undefined;
};

export const GamePrice: FC<GamePriceProps> = ({ price, priceRange }) => {
  return (
    <Flex $direction="column">
      <Span $size="22px">
        💸 Price:{" "}
        {price?.finalPrice ? price?.finalPrice + "$" : "No information"}
      </Span>
      <Span $size="22px">
        📈 Price range: {priceRange !== null ? priceRange : "No information"}
      </Span>
    </Flex>
  );
};
