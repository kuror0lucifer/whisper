import { FC } from "react";
import { Span } from "../../../styledComponents/Span";
import eshopDetails from "../../../@types/eshopDetails";
import { format } from "date-fns";
import { Container } from "../../../styledComponents/Container";

import { IoTime } from "react-icons/io5";

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
      width="60%"
      height="75px"
      $borderTop="2px solid gray"
      display="flex"
      $align="center"
    >
      <Span $size="22px">
        <IoTime /> Sale end: {formattedDate}
      </Span>
    </Container>
  );
};
