import { FC } from "react";
import { Span } from "../../styledComponents/Span";
import eshopDetails from "../../@types/eshopDetails";
import { format } from "date-fns";

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

  return <Span $size="22px">⌛ Sale end: {formattedDate}</Span>;
};
