import { FC, useEffect, useState } from "react";
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
  const [tgCheck, setTgCheck] = useState<boolean>(false);

  useEffect(() => {
    const handleTgCheck = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/telegram-id/tg-check",
          { email }
        );

        if (response.data.status === "success") {
          setTgCheck(true);
        } else {
          setTgCheck(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    handleTgCheck();
  }, [email]);

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
        $justify="flex-start"
        $align="center"
        $direction="column"
        width="380px"
        $padding="20px"
        height="400px"
        $bgColor="white"
        $borderRadius="25px"
        onClick={(event) => event.stopPropagation()}
      >
        <Flex
          $justify="flex-start"
          $align="center"
          $direction="column"
          $gap="15px"
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
            onClick={tgCheck ? null : () => handleLinkTelegram(userId)}
          >
            {tgCheck ? "Telegram linked" : "Link Telegram"}
          </Button>
          <Button
            $backgroundColor="red"
            color="white"
            $borderRadius="25px"
            width="150px"
            height="50px"
            cursor="pointer"
          >
            Settings
          </Button>
        </Flex>
        <Button
          $backgroundColor="red"
          color="white"
          $borderRadius="25px"
          width="150px"
          height="50px"
          cursor="pointer"
          $margin="auto 0 0 0"
          onClick={handleSubmit}
        >
          Log Out
        </Button>
      </Flex>
    </PopupWrapper>,
    portalRoot
  );
};
