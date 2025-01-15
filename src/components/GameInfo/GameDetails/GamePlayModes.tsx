import { FC } from "react";
import { Span } from "../../../styledComponents/Span";

type GamePlayModesProps = {
  playModes: string[] | undefined;
};

export const GamePlayModes: FC<GamePlayModesProps> = ({ playModes }) => {
  console.log(playModes);

  return (
    <Span $size="22px">
      🖥 Play modes:{" "}
      {playModes && playModes !== null ? playModes?.join(", ") : "Mobile"}
    </Span>
  );
};
