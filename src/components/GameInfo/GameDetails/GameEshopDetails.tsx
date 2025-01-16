import { FC } from "react";
import { Span } from "../../../styledComponents/Span";
import eshopDetails from "../../../@types/eshopDetails";
import { Container } from "../../../styledComponents/Container";
import { FaMedal } from "react-icons/fa";

type GameEshopDetailsProps = {
  eshopDetails: eshopDetails | undefined;
};

export const GameEshopDetails: FC<GameEshopDetailsProps> = ({
  eshopDetails,
}) => {
  return (
    <Container
      width="60%"
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
