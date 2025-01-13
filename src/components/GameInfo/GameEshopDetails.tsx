import { FC } from "react";
import { Span } from "../../styledComponents/Span";
import eshopDetails from "../../@types/eshopDetails";

type GameEshopDetailsProps = {
  eshopDetails: eshopDetails | undefined;
};

export const GameEshopDetails: FC<GameEshopDetailsProps> = ({
  eshopDetails,
}) => {
  return (
    <Span $size="22px">
      🪙 Gold points:
      {eshopDetails?.goldPoints ? eshopDetails?.goldPoints : "Not available"}
    </Span>
  );
};
