import { FC } from "react";

import { IoMdPerson } from "react-icons/io";
import { Container } from "../../styledComponents/Container";

type ProfileButtonProps = {
  clickProfileButton: () => void;
};

export const ProfileButton: FC<ProfileButtonProps> = ({
  clickProfileButton,
}) => {
  return (
    <Container
      width="50px"
      height="50px"
      cursor="pointer"
      display="flex"
      $justify="center"
      $align="center"
      onClick={clickProfileButton}
    >
      <IoMdPerson size={24} />
    </Container>
  );
};
