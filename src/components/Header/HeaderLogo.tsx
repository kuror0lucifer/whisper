import { FC } from "react";

import { Container } from "../../styledComponents/Container";
import { IoBagOutline } from "react-icons/io5";

import variables from "../../scss/styles.module.scss";

export const HeaderLogo: FC = () => {
  return (
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
  );
};
