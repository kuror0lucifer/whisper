import { FC } from "react";
import { Span } from "../../styledComponents/Span";

type GameReleasDateProps = {
  date: string;
};

export const GameReleasDate: FC<GameReleasDateProps> = ({ date }) => {
  return <Span $size="22px">📅 Releas Date: {date?.toString()}</Span>;
};
