import { FC } from "react";
import { Span } from "../../styledComponents/Span";

type GameCardPrice = {
  price: string | number;
};

export const GameCardPrice: FC<GameCardPrice> = ({ price }) => {
  return (
    <Span color="black" $size="18px">
      {price ? price + " $" : "Бесплатно / Предзаказ"}
    </Span>
  );
};
