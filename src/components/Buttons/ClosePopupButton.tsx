import { FC } from "react";
import { Container } from "../../styledComponents/Container";
import { IoClose } from "react-icons/io5";

type ClosePopupButtonProps = {
  closePopup: () => void;
};

export const ClosePopupButton: FC<ClosePopupButtonProps> = ({ closePopup }) => {
  return (
    <Container
      $position="absolute"
      $top="20px"
      $right="20px"
      cursor="pointer"
      onClick={closePopup}
    >
      <IoClose size={24} />
    </Container>
  );
};
