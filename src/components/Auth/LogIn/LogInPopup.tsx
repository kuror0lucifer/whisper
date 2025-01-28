import { FC } from "react";
import ReactDOM from "react-dom";

import { Container } from "../../../styledComponents/Container";
import { Flex } from "../../../styledComponents/Flex";
import { TitleH } from "../../../styledComponents/TitleH";
import { LogInInputs } from "./LogInInputs";
import { PopupWrapper } from "../../../styledComponents/PopupWrapper";
import { ClosePopupButton } from "../../Buttons/ClosePopupButton";

type LogInPopupProps = {
  closePopup: () => void;
};

export const LogInPopup: FC<LogInPopupProps> = ({ closePopup }) => {
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
          <TitleH as="h2">Log In</TitleH>
          <LogInInputs />
        </Flex>
      </Container>
    </PopupWrapper>,
    portalRoot
  );
};
