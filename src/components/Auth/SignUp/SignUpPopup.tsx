import { FC } from "react";
import ReactDOM from "react-dom";

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
      <Flex
        $position="relative"
        $justify="flex-start"
        $align="center"
        $direction="column"
        $gap="45px"
        width="380px"
        $padding="15px"
        height="400px"
        $bgColor="orange"
        $borderRadius="25px"
        onClick={(event) => event.stopPropagation()}
      >
        <ClosePopupButton closePopup={closePopup} />
        <TitleH as="h2">Sign Up</TitleH>
        <SignUpInputs />
      </Flex>
    </PopupWrapper>,
    portalRoot
  );
};
