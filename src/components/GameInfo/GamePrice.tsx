import { FC } from "react";
import { Span } from "../../styledComponents/Span";
import { Flex } from "../../styledComponents/Flex";

type GamePriceProps = {
  price: Price | undefined;
};

export default interface Price {
  regPrice: number;
  finalPrice: number;
  salePrice: number | null;
}

export const GamePrice: FC<GamePriceProps> = ({ price }) => {
  return (
    <Flex $direction="column">
      <Span>Regular price: {price?.regPrice} $</Span>
      <Span>Final price: {price?.finalPrice} $</Span>
    </Flex>
  );
};
