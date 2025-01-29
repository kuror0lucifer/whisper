import { FC, useEffect, useState } from "react";

import { Container } from "../../styledComponents/Container";
import { Flex } from "../../styledComponents/Flex";
import { Span } from "../../styledComponents/Span";
import { HeaderLogo } from "./HeaderLogo";
import { SearchInput } from "./SearchInput";
import { Link } from "../../styledComponents/Link";
import { SignUpButton } from "../Buttons/SignUpButton";
import { LogInButton } from "../Buttons/LogInButton";
import { SignUpPopup } from "../Auth/SignUp/SignUpPopup";
import { LogInPopup } from "../Auth/LogIn/LogInPopup";
import { ProfileButton } from "../Profile/ProfileButton";
import { ProfilePopup } from "../Profile/ProfilePopup";

import variables from "../../scss/styles.module.scss";
import User from "../../@types/userData";

export const Header: FC = () => {
  const [activePopup, setActivePopup] = useState<
    "login" | "signup" | "profile" | null
  >(null);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      setUserData(user);
    }
  }, []);

  console.log(userData);

  const openLogInPopup = () => setActivePopup("login");
  const openSignUpPopup = () => setActivePopup("signup");
  const openProfilePopup = () => setActivePopup("profile");
  const closePopup = () => setActivePopup(null);

  return (
    <>
      <Container
        width="80%"
        height="50px"
        $bgColor={variables.orange}
        $borderRadius="0 0 25px 25px"
        $margin="0 auto"
      >
        <Flex
          $align="center"
          $justify="flex-start"
          height="100%"
          width="100%"
          $direction="row"
          $gap="10px"
        >
          <Link href="/" $decoration="none" color="black">
            <Flex
              $align="center"
              $justify="center"
              $gap="10px"
              $margin="0 0 0 10px"
            >
              <HeaderLogo />
              <Span $size="18px" $weight="400">
                WHISPER64
              </Span>
            </Flex>
          </Link>

          <SearchInput />
          <Flex
            $gap="10px"
            height="100%"
            $justify="center"
            $align="center"
            $margin="0 20px 0 0"
          >
            {userData !== null ? (
              <ProfileButton clickProfileButton={openProfilePopup} />
            ) : (
              <>
                <LogInButton clickLogIn={openLogInPopup} />
                <SignUpButton clickSignUp={openSignUpPopup} />
              </>
            )}
          </Flex>
        </Flex>
      </Container>
      {activePopup === "login" && <LogInPopup closePopup={closePopup} />}
      {activePopup === "signup" && <SignUpPopup closePopup={closePopup} />}
      {activePopup === "profile" && userData && (
        <ProfilePopup
          closePopup={closePopup}
          email={userData.email}
          setUserData={setUserData}
        />
      )}
    </>
  );
};
