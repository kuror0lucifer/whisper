import { FC } from "react";
import { Span } from "../../styledComponents/Span";
import { format } from "date-fns";

type GameReleasDateProps = {
  date: string | undefined;
};

export const GameReleasDate: FC<GameReleasDateProps> = ({ date }) => {
  const releasDate = date ? new Date(date) : null;

  const formattedDate = releasDate
    ? format(releasDate, "dd MMMM yyyy")
    : "Not available";

  return <Span $size="22px">📅 Releas Date: {formattedDate}</Span>;
};
