import { FC } from "react";

import { Span } from "../../../styledComponents/Span";
import { Container } from "../../../styledComponents/Container";
import { FaMedal } from "react-icons/fa";

import eshopDetails from "../../../@types/eshopDetails";

type GameEshopDetailsProps = {
  eshopDetails: eshopDetails | undefined;
};

export const GameEshopDetails: FC<GameEshopDetailsProps> = ({
  eshopDetails,
}) => {
  return (
    <Container
      width="400px"
      height="75px"
      $borderTop="2px solid gray"
      display="flex"
      $align="center"
    >
      <Span $size="22px">
        <FaMedal /> Gold points:{" "}
        {eshopDetails?.goldPoints ? eshopDetails?.goldPoints : "Not available"}
      </Span>
    </Container>
  );
};
