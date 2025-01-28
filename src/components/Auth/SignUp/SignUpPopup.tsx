import { FC } from "react";
import ReactDOM from "react-dom";

import { Container } from "../../../styledComponents/Container";
import { Flex } from "../../../styledComponents/Flex";
import { TitleH } from "../../../styledComponents/TitleH";
import { SignUpInputs } from "./SignUpInputs";
import { PopupWrapper } from "../../../styledComponents/PopupWrapper";
import { ClosePopupButton } from "../../Buttons/ClosePopupButton";

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
    <PopupWrapper onClick={closePopup}>
      <Container
        $position="relative"
        width="380px"
        $padding="15px"
        height="400px"
        $bgColor="orange"
        $borderRadius="25px"
        $boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
      >
        <Flex
          width="100%"
          height="320px"
          $direction="column"
          $justify="center"
          $align="center"
          onClick={(event) => event.stopPropagation()}
        >
          <ClosePopupButton closePopup={closePopup} />
          <TitleH as="h2">Sign Up</TitleH>
          <SignUpInputs />
        </Flex>
      </Container>
    </PopupWrapper>,
    portalRoot
  );
};
