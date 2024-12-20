import { FC } from "react";
import { Container } from "../../styledComponents/Container";
import variables from "../../scss/styles.module.scss";
import { Flex } from "../../styledComponents/Flex";

import { IoBagOutline } from "react-icons/io5";
import { Span } from "../../styledComponents/Span";

export const Header: FC = () => {
  return (
    <Container
      width="80%"
      height="50px"
      $bgColor={variables.orange}
      $borderRadius="0 0 25px 25px"
      $margin="0 auto"
      $padding="0 20px"
    >
      <Flex
        $align="center"
        $justify="flex-start"
        height="100%"
        width="20%"
        $gap="10px"
      >
        <Container
          display="flex"
          $justify="center"
          $align="center"
          $borderRadius="50%"
          width="35px"
          height="35px"
          $bgColor="white"
        >
          <IoBagOutline color={variables.orange} />
        </Container>
        <Span $size="18px" $weight="400">
          WHISPER
        </Span>
      </Flex>
    </Container>
  );
};
