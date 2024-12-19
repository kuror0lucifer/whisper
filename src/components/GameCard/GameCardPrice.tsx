import { FC } from "react";
import { Span } from "../../styledComponents/Span";

type GameCardPrice = {
  price: string | number;
  availability: string[] | string;
};

export const GameCardPrice: FC<GameCardPrice> = ({ price, availability }) => {
  const isGameFree = availability.includes("Available now")
    ? "Бесплатно"
    : availability;

  return (
    <Span color="black" $size="18px">
      {price ? price + " $" : isGameFree}
    </Span>
  );
};
