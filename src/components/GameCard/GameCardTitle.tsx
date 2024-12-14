import { FC } from "react";
import { Container } from "../../styledComponents/Container";
import { Paragraph } from "../../styledComponents/Paragraph";

type GameCardTitleProps = {
  title: string;
};

export const GameCardTitle: FC<GameCardTitleProps> = ({ title }) => {
  return (
    <Container width="190px" height="40px">
      <Paragraph color="black" $wrap="break-word">
        {title}
      </Paragraph>
    </Container>
  );
};
