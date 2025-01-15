import { FC } from "react";
import { Span } from "../../styledComponents/Span";
import Price from "../../@types/price";

type GamePriceProps = {
  price: Price | undefined;
};

export const GamePrice: FC<GamePriceProps> = ({ price }) => {
  return (
    <Span $size="22px">
      💸 Price: {price?.finalPrice ? price?.finalPrice + "$" : "No information"}
    </Span>
  );
};
