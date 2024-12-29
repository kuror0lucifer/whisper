import { FC } from "react";
import { Span } from "../../styledComponents/Span";
import { Flex } from "../../styledComponents/Flex";
import Price from "../../@types/price";

type GamePriceProps = {
  price: Price | undefined;
};

export const GamePrice: FC<GamePriceProps> = ({ price }) => {
  return (
    <Flex $direction="column">
      <Span $size="22px">💸 Price: {price?.finalPrice} $</Span>
    </Flex>
  );
};
