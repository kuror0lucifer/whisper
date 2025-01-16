import { FC } from "react";
import { Span } from "../../../styledComponents/Span";
import { format } from "date-fns";
import { Container } from "../../../styledComponents/Container";
import { IoCalendarNumberSharp } from "react-icons/io5";

type GameReleasDateProps = {
  date: string | undefined;
};

export const GameReleasDate: FC<GameReleasDateProps> = ({ date }) => {
  const releasDate = date ? new Date(date) : null;

  const formattedDate = releasDate
    ? format(releasDate, "dd MMMM yyyy")
    : "Not available";

  return (
    <Container
      width="400px"
      height="75px"
      $borderTop="2px solid gray"
      $borderBottom="2px solid gray"
      display="flex"
      $align="center"
    >
      <Span $size="22px">
        <IoCalendarNumberSharp /> Releas Date: {formattedDate}
      </Span>
    </Container>
  );
};
