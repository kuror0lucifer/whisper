import { FC } from "react";
import { Span } from "../../styledComponents/Span";
import { Flex } from "../../styledComponents/Flex";

type GameCardPrice = {
  price: Price;
  availability: string[] | string;
};

interface Price {
  regPrice: number;
  finalPrice: number;
  salePrice: number | null;
}

export const GameCardPrice: FC<GameCardPrice> = ({ price, availability }) => {
  const isGameFree = availability.includes("Available now")
    ? "Free"
    : availability;

  const hasValidPrice =
    price && (price.regPrice || price.finalPrice || price.salePrice !== null);

  return (
    <Flex $direction="column" $justify="center" $align="flex-start">
      {hasValidPrice ? (
        price.salePrice !== null ? (
          <>
            <Span
              color="grey"
              $size="16px"
              $decoration="line-through"
              $marginBottom="4px"
            >
              {price.regPrice} $
            </Span>
            <Span color="black" $size="18px">
              {price.finalPrice} $
            </Span>
          </>
        ) : (
          <Span color="black" $size="18px">{`${price.finalPrice} $`}</Span>
        )
      ) : (
        isGameFree
      )}
    </Flex>
  );
};
