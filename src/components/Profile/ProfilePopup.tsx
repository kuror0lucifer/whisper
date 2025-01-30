import { FC } from "react";
import ReactDOM from "react-dom";

import { PopupWrapper } from "../../styledComponents/PopupWrapper";
import { Flex } from "../../styledComponents/Flex";
import { TitleH } from "../../styledComponents/TitleH";
import { Button } from "../../styledComponents/Button";
import { ClosePopupButton } from "../Buttons/ClosePopupButton";
import User from "../../@types/userData";
import axios from "axios";

type ProfilePopupProps = {
  email: string;
  userId: number;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  closePopup: () => void;
};

export const ProfilePopup: FC<ProfilePopupProps> = ({
  email,
  userId,
  setUserData,
  closePopup,
}) => {
  const portalRoot = document.getElementById("portal-root");

  if (!portalRoot) {
    console.error("Portal not found");
    return null;
  }

  const handleLinkTelegram = async (userId: number) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/tg-token/generate-token",
        {
          userId,
        }
      );

      const link = `https://t.me/whisper64Bot?start=${response.data.token}`;
      window.location.href = link;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    try {
      localStorage.removeItem("auth_token");
      setUserData(null);
    } catch (err) {
      console.error(err);
    }
  };

  return ReactDOM.createPortal(
    <PopupWrapper onClick={closePopup}>
      <Flex
        $position="relative"
        $justify="space-between"
        $align="center"
        $direction="column"
        width="380px"
        $padding="15px"
        height="400px"
        $bgColor="white"
        $borderRadius="25px"
        onClick={(event) => event.stopPropagation()}
      >
        <ClosePopupButton closePopup={closePopup} />
        <TitleH as="h4" $size="16px">
          Hello, {email}
        </TitleH>
        <Button
          $backgroundColor="red"
          color="white"
          $borderRadius="25px"
          width="150px"
          height="50px"
          cursor="pointer"
          onClick={() => handleLinkTelegram(userId)}
        >
          Link Telegram
        </Button>
        <Button
          $backgroundColor="red"
          color="white"
          $borderRadius="25px"
          width="150px"
          height="50px"
          cursor="pointer"
          onClick={handleSubmit}
        >
          Log Out
        </Button>
      </Flex>
    </PopupWrapper>,
    portalRoot
  );
};
