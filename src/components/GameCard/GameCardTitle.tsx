import { FC } from "react";
import { Container } from "../../styledComponents/Container";
import { Paragraph } from "../../styledComponents/Paragraph";

type GameCardTitleProps = {
  title: string;
};

export const GameCardTitle: FC<GameCardTitleProps> = ({ title }) => {
  return (
    <Container width="150px" height="fit-content">
      <Paragraph color="black" $wrap="break-word" $fontSize="14px">
        {title}
      </Paragraph>
    </Container>
  );
};
