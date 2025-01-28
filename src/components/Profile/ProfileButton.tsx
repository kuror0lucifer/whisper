import { FC } from "react";

import { IoMdPerson } from "react-icons/io";
import { Container } from "../../styledComponents/Container";

export const ProfileButton: FC = () => {
  return (
    <Container
      width="50px"
      height="50px"
      cursor="pointer"
      display="flex"
      $justify="center"
      $align="center"
    >
      <IoMdPerson size={24} />
    </Container>
  );
};
