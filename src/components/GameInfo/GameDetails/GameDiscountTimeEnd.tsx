import { FC } from "react";
import { format } from "date-fns";

import { Span } from "../../../styledComponents/Span";
import { Container } from "../../../styledComponents/Container";
import { IoTime } from "react-icons/io5";

import eshopDetails from "../../../@types/eshopDetails";

type GameDiscountTimeProps = {
  eshopDetails: eshopDetails | undefined;
};

export const GameDiscountTime: FC<GameDiscountTimeProps> = ({
  eshopDetails,
}) => {
  const discountEndDate = eshopDetails?.discountPriceEnd
    ? new Date(eshopDetails.discountPriceEnd)
    : null;

  const formattedDate = discountEndDate
    ? format(discountEndDate, "dd MMMM yyyy, HH:mm:ss")
    : "Not on sale";

  return (
    <Container
      width="400px"
      height="75px"
      $borderTop="2px solid gray"
      display="flex"
      $align="center"
    >
      <Span $size="22px">
        <IoTime /> Sale ends: {formattedDate}
      </Span>
    </Container>
  );
};
