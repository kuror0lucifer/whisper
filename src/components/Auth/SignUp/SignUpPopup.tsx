import { FC } from "react";
import ReactDOM from "react-dom";

import { Container } from "../../../styledComponents/Container";
import { Flex } from "../../../styledComponents/Flex";
import { IoClose } from "react-icons/io5";
import { TitleH } from "../../../styledComponents/TitleH";
import { SignUpInputs } from "./SignUpInputs";

type SignUpPopupProps = {
  closePopup: () => void;
};

export const SignUpPopup: FC<SignUpPopupProps> = ({ closePopup }) => {
  const portalRoot = document.getElementById("portal-root");

  if (!portalRoot) {
    console.error("Portal not found");
    return null;
  }

  return ReactDOM.createPortal(
    <Container
      $position="fixed"
      $top="0"
      $right="0"
      width="100%"
      height="100%"
      $bgColor="rgba(0,0,0,0.5)"
      display="flex"
      $justify="center"
      $align="center"
      $zIndex={1000}
      onClick={closePopup}
    >
      <Container
        $position="relative"
        width="380px"
        $padding="15px"
        height="400px"
        $bgColor="orange"
        $borderRadius="25px"
      >
        <Flex
          width="100%"
          height="320px"
          $direction="column"
          $justify="center"
          $align="center"
          onClick={(event) => event.stopPropagation()}
        >
          <Container
            $position="absolute"
            $top="20px"
            $right="20px"
            cursor="pointer"
            onClick={closePopup}
          >
            <IoClose size={24} />
          </Container>
          <TitleH as="h2">Sign Up</TitleH>
          <SignUpInputs />
        </Flex>
      </Container>
    </Container>,
    portalRoot
  );
};
