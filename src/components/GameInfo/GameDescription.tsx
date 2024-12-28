import { FC, useState } from "react";
import { Span } from "../../styledComponents/Span";
import { Flex } from "../../styledComponents/Flex";
import { Button } from "../../styledComponents/Button";

import variables from "../../scss/styles.module.scss";

import { HiArrowNarrowDown, HiArrowNarrowUp } from "react-icons/hi";

type GameDescriptionProps = {
  gameDescription: string | undefined;
};

export const GameDescription: FC<GameDescriptionProps> = ({
  gameDescription,
}) => {
  const [readAll, setReadAll] = useState<boolean>(false);

  const getShortText = (text: string | undefined, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  return (
    <Flex width="50%" height="10%">
      <Span>
        {readAll ? gameDescription : getShortText(gameDescription, 100)}
      </Span>
      {gameDescription && gameDescription.length >= 100 ? (
        <Button
          display="flex"
          $justify="center"
          $align="center"
          $gap="5px"
          onClick={() => setReadAll(!readAll)}
          $backgroundColor={variables.orange}
          width="100px"
          height="30px"
          $borderRadius="25px"
          $margin="25px 0 0 0"
          cursor="pointer"
        >
          {readAll ? "Close" : "Read all"}
          {readAll ? <HiArrowNarrowUp /> : <HiArrowNarrowDown />}
        </Button>
      ) : (
        <></>
      )}
    </Flex>
  );
};
