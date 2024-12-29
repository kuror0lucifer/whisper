import { FC } from "react";
import { Header } from "../Header/Header";
import { Container } from "../../styledComponents/Container";
import { Flex } from "../../styledComponents/Flex";
import { TitleH } from "../../styledComponents/TitleH";
import { Image } from "../../styledComponents/Image";

export const Error: FC = () => {
  return (
    <>
      <Header />
      <Container $margin="100px auto" width="80%" height="fit-content">
        <Flex $justify="center" $align="center" $direction="column" $gap="20px">
          <Image src="https://assets.nintendo.com/image/upload/v1698433473/error.png" />
          <TitleH as="h2">No game information available</TitleH>
        </Flex>
      </Container>
    </>
  );
};
